import React, {useState, useEffect} from 'react';
import {Platform, PermissionsAndroid, Dimensions} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import api from '../../services/api';
import {getItem, StorageItems} from '../../services/storage';

import * as S from './ProductMapScreen.style';

const {width, height} = Dimensions.get('screen');

export function ProductMapScreen({route}) {
  const {
    params: {productId, currentLocation, distance},
  } = route;

  const [productData, setProductData] = useState<any>(null);

  const prices = productData?.prices;
  const location = currentLocation;
  const currentRange = Math.floor(distance);

  console.log('Map: ', {...currentLocation, distance});

  const fetchCoord = async () => {
    console.log('fetchCoord()', productId);
    const token = await getItem(StorageItems.ACCESS_TOKEN);

    try {
      const {data: response} = await api.get(
        `/api/product/${productId}?usersLatitude=${location.currentLatitude}
            &usersLongitude=${location.currentLongitude}
            &rangeRadius=${currentRange}`,
        {headers: {Authorization: `Bearer ${token}`}},
      );

      setProductData(response.data);
    } catch (err) {
      console.log('Erro: ', err.response);
    }
  };

  console.log('productData: ', productData);

  useEffect(() => {
    if (location.currentLongitude && location.currentLongitude) fetchCoord();
  }, [location]);

  return (
    <S.WrapperContainer>
      {productData && prices ? (
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
            latitude: Number(location.currentLatitude),
            longitude: Number(location.currentLongitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          zoomEnabled={true}
          minZoomLevel={10}
          showsUserLocation={true}
          loadingEnabled={true}>
          {prices &&
            prices.length &&
            prices.map(x => {
              return (
                <Marker
                  key={x.id}
                  coordinate={{
                    latitude: x.establishment.latitude,
                    longitude: x.establishment.longitude,
                  }}>
                  <S.MarkerContainer>
                    <S.WrapperMarkerContent>
                      <S.EstablishmentTitle>
                        {x.establishment.name || ''}
                      </S.EstablishmentTitle>
                      <S.ProductValue>
                        {x.value
                          ? `R$ ${Number(String(x.value))
                              .toFixed(2)
                              .replace('.', ',')}`
                          : 'FREE'}
                      </S.ProductValue>
                    </S.WrapperMarkerContent>
                  </S.MarkerContainer>
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
