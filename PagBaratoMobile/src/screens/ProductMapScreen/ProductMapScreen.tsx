import React, {useState, useEffect} from 'react';
import {Platform, PermissionsAndroid, Dimensions} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import {PriceMapMarker} from '../../components/PriceMapMarker/PriceMapMarker';
import api from '../../services/api';
import {getItem, StorageItems} from '../../services/storage';

import * as S from './ProductMapScreen.style';

const {width, height} = Dimensions.get('screen');

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

  const location = currentLocation;
  const prices = productData?.prices;
  const currentRange = Math.floor(distance);

  console.log('Map: ', {...currentLocation, distance});

  const getLowestPrice = (prices: Array<any>) => {
    let min = prices[0];

    for (let i = 1; i < prices.length; i++) {
      let price = prices[i];
      min = price.value < min.value ? price : min;
    }

    return min;
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
    if (location.currentLongitude && location.currentLongitude)
      fetchProductPrices();
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
          style={{width, height}}
          region={{
            latitude: lowestPrice.establishment.latitude,
            longitude: lowestPrice.establishment.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          zoomEnabled={true}
          minZoomLevel={getMapZoomLevel(currentRange)}
          showsUserLocation={true}
          loadingEnabled={true}>
          {prices &&
            prices.length &&
            prices.map(x => {
              return (
                <Marker
                  key={x.id}
                  tracksViewChanges={false}
                  coordinate={{
                    latitude: x.establishment.latitude,
                    longitude: x.establishment.longitude,
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
    </S.WrapperContainer>
  );
}
