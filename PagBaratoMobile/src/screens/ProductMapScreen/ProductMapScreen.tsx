import React, {useState, useEffect} from 'react';
import {
  Platform,
  PermissionsAndroid,
  Dimensions,
  StyleSheet,
} from 'react-native';

import MapView from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';

import PriceMapMarker from '../../components/PriceMapMarker/PriceMapMarker';
import {getItem, setItem, StorageItems} from '../../services/storage';
import {color} from '../../config/theme.json';

import api from '../../services/api';
import * as S from './ProductMapScreen.style';
import {ThumbsType} from '../../enum/priceRate';

Feather.loadFont();

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const getMapZoomLevel = (distanceRange: number) => {
  let zoomLevel = 17;
  if (distanceRange === 1) zoomLevel = 16;
  if (distanceRange === 2) zoomLevel = 15;
  if (distanceRange >= 3 && distanceRange <= 5) zoomLevel = 12;
  if (distanceRange >= 6 && distanceRange <= 9) zoomLevel = 8;
  if (distanceRange >= 10 && distanceRange <= 13) zoomLevel = 6;
  if (distanceRange >= 13 && distanceRange <= 15) zoomLevel = 3;
  if (distanceRange >= 16) zoomLevel = 0;
  return zoomLevel;
};

export function ProductMapScreen({route}) {
  const {
    params: {productId, currentLocation, distance},
  } = route;

  const [productData, setProductData] = useState<any>(null);
  const [lowestPrice, setLowestPrice] = useState<any>(null);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [ratedPricesList, setRatedPricesList] = useState<Array<any>>([]);
  const [fetchRatedPricesList, setFetchRatedPricesList] =
    useState<boolean>(true);

  const location = currentLocation;
  const prices = productData?.prices;
  const currentRange = Math.floor(distance);

  const getLowestPrice = (prices: Array<any>) => {
    let min = prices[0];

    for (let i = 1; i < prices.length; i++) {
      let price = prices[i];
      min = price.value < min.value ? price : min;
    }

    return min;
  };

  const ratePrice = async (thumbs?: ThumbsType) => {
    try {
      if (!thumbs) {
        setSelectedMarker(null);
        return;
      }

      const newRatedPricesList = [...ratedPricesList];
      const token = await getItem(StorageItems.ACCESS_TOKEN);

      await api.post(
        `/api/price/${selectedMarker.priceId}/rate`,
        {thumbs},
        {headers: {Authorization: `Bearer ${token}`}},
      );

      const index = ratedPricesList.findIndex(
        x => x.priceId === selectedMarker.priceId,
      );

      if (index >= 0) {
        newRatedPricesList[index].thumbs = thumbs;
      } else {
        newRatedPricesList.push({
          thumbs,
          priceId: selectedMarker.priceId,
        });
      }

      setRatedPricesList(newRatedPricesList);

      await setItem(
        StorageItems.RATED_PRICES_LIST,
        JSON.stringify(newRatedPricesList),
      );

      Toast.show({
        type: 'success',
        text1: 'Avaliação computada com sucesso!',
        text2: 'Agradecemos por sua contribuição :)',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const alreadyRated = (thumbs: ThumbsType) => {
    return !!ratedPricesList.find(
      x => x.priceId === selectedMarker.priceId && x.thumbs === thumbs,
    );
  };

  const fetchProductPrices = async () => {
    try {
      const token = await getItem(StorageItems.ACCESS_TOKEN);

      const {data: response} = await api.get(
        `/api/product/${productId}?usersLatitude=${location.currentLatitude}
            &usersLongitude=${location.currentLongitude}
            &rangeRadius=${currentRange}`,
        {headers: {Authorization: `Bearer ${token}`}},
      );

      if (!response) return;

      if (response.data?.prices) {
        const lowestPrice = getLowestPrice(response.data?.prices);
        setLowestPrice(lowestPrice);
      }

      setProductData(response.data);
    } catch (err) {
      console.error(err.response);
    }
  };

  useEffect(() => {
    if (location.currentLongitude && location.currentLongitude) {
      fetchProductPrices();
    }
  }, [location]);

  useEffect(() => {
    if (fetchRatedPricesList) {
      getItem(StorageItems.RATED_PRICES_LIST)
        .then(ratedPrices => {
          setFetchRatedPricesList(false);
          setRatedPricesList(JSON.parse(ratedPrices) || []);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [fetchRatedPricesList]);

  return (
    <S.WrapperContainer>
      {productData && lowestPrice && prices ? (
        <MapView
          onMapReady={() => {
            Platform.OS === 'android'
              ? PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                )
              : '';
          }}
          style={styles.map}
          region={{
            latitude: lowestPrice.establishment.latitude,
            longitude: lowestPrice.establishment.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          zoomEnabled={true}
          minZoomLevel={getMapZoomLevel(currentRange)}
          showsUserLocation={true}
          loadingEnabled={true}
          loadingIndicatorColor={color.primary}>
          {prices &&
            prices.length &&
            prices.map(price => {
              return (
                <PriceMapMarker
                  isLowestPrice={price.value === lowestPrice.value}
                  setSelectedMarker={setSelectedMarker}
                  trustingFactor={price.trustingFactor}
                  establishment={price.establishment}
                  price={price}
                  key={price.id}
                />
              );
            })}
        </MapView>
      ) : (
        <></>
      )}

      {selectedMarker ? (
        <>
          <S.ThumbsText>Avaliar preço</S.ThumbsText>
          <S.ThumbsMainContainer isLowestPrice={selectedMarker.isLowestPrice}>
            <S.InlineThumbsContainer>
              <S.ThumbsIconButton
                disabled={alreadyRated(ThumbsType.UP)}
                isLowestPrice={selectedMarker.isLowestPrice}
                onPress={() => ratePrice(ThumbsType.UP)}>
                <S.ThumbsIcon
                  size={alreadyRated(ThumbsType.UP) ? 16 : 12}
                  name="thumbs-up"
                  color={
                    alreadyRated(ThumbsType.UP)
                      ? color.cream
                      : color.little_cream
                  }
                />
              </S.ThumbsIconButton>
              <S.ThumbsIconButton
                disabled={alreadyRated(ThumbsType.DOWN)}
                isLowestPrice={selectedMarker.isLowestPrice}
                onPress={() => ratePrice(ThumbsType.DOWN)}>
                <S.ThumbsIcon
                  size={alreadyRated(ThumbsType.DOWN) ? 16 : 12}
                  name="thumbs-down"
                  color={
                    alreadyRated(ThumbsType.DOWN)
                      ? color.cream
                      : color.little_cream
                  }
                />
              </S.ThumbsIconButton>
              <S.ThumbsIconButton
                isLowestPrice={selectedMarker.isLowestPrice}
                onPress={() => ratePrice()}>
                <Feather size={13} name="x" color={color.little_cream} />
              </S.ThumbsIconButton>
            </S.InlineThumbsContainer>
          </S.ThumbsMainContainer>
        </>
      ) : (
        <></>
      )}

      {productData ? (
        <S.TransparentContainer>
          <S.Bubble>
            <S.BubbleText>{productData.name}</S.BubbleText>
          </S.Bubble>
        </S.TransparentContainer>
      ) : (
        <></>
      )}
    </S.WrapperContainer>
  );
}

const styles = StyleSheet.create({
  map: {...StyleSheet.absoluteFillObject, width, height},
});
