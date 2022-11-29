import React, {useState, useEffect} from 'react';
import {
  Platform,
  PermissionsAndroid,
  Dimensions,
  StyleSheet,
} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';

import {PriceMapMarker} from '../../components/PriceMapMarker/PriceMapMarker';
import {getItem, StorageItems} from '../../services/storage';
import {color} from '../../config/theme.json';

import api from '../../services/api';
import * as S from './ProductMapScreen.style';
import {ThumbsType} from '../../enum/priceRate';

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

  const ratePrice = (thumbs?: ThumbsType) => {
    if (thumbs) {
      Toast.show({
        type: 'success',
        text1: 'Avaliação computada com sucesso!',
        text2: 'Agradecemos por sua contribuição :)',
      });
    }

    setSelectedMarker(null);
  };

  const fetchProductPrices = async () => {
    const token = await getItem(StorageItems.ACCESS_TOKEN);

    try {
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
      console.log('Erro: ', err.response);
    }
  };

  useEffect(() => {
    if (location.currentLongitude && location.currentLongitude) {
      fetchProductPrices();
    }
  }, [location]);

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
            prices.map(x => {
              return (
                <Marker
                  key={x.id}
                  identifier={x.id}
                  tracksViewChanges={false}
                  coordinate={{
                    latitude: x.establishment.latitude,
                    longitude: x.establishment.longitude,
                  }}
                  onPress={e => {
                    setSelectedMarker({
                      priceId: e.nativeEvent.id,
                      isLowestPrice: x.value === lowestPrice.value,
                    });
                  }}>
                  <PriceMapMarker
                    isLowestPrice={x.value === lowestPrice.value}
                    trustingFactor={x.trustingFactor}
                    establishment={x.establishment}
                    price={x.value}
                  />
                </Marker>
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
                isLowestPrice={selectedMarker.isLowestPrice}
                onPress={() => ratePrice(ThumbsType.UP)}>
                <Feather size={14} name="thumbs-up" color={color.cream} />
              </S.ThumbsIconButton>
              <S.ThumbsIconButton
                isLowestPrice={selectedMarker.isLowestPrice}
                onPress={() => ratePrice(ThumbsType.DOWN)}>
                <Feather size={14} name="thumbs-down" color={color.cream} />
              </S.ThumbsIconButton>
              <S.ThumbsIconButton
                isLowestPrice={selectedMarker.isLowestPrice}
                onPress={() => ratePrice()}>
                <Feather size={14} name="x" color={color.cream} />
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
