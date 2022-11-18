import React, {useState, useEffect} from 'react';
import {Platform, PermissionsAndroid, Dimensions} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import api from '../../services/api';
import {getItem, StorageItems} from '../../services/storage';

import * as S from './ProductMapScreen.style';

const {width, height} = Dimensions.get('screen');

export function ProductMapScreen({route}) {
  const {
    params: {product, distance},
  } = route;

  const [markerLatitude, setMarkerLatitude] = useState([]);
  const [markerLongitude, setMarkerLongitude] = useState([]);
  const [markerCoords, setMarkerCoords] = useState([]);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [currentRange, setCurrentRange] = useState(Math.floor(distance));
  const [productData, setProductData] = useState<any>(null);

  console.log('route', route?.params?.product);
  console.log({distance});
  const prices = productData?.prices;

  //Retorna marcador apenas do estabelecimento mais barato
  /*const fetchCoord = async () => {
        console.log('fetchCoord')
        const token = await getItem(StorageItems.ACCESS_TOKEN);
        const { data } = await api.get(`/api/price/?paginate=false`,
            { headers: { 'Authorization': `Bearer ${token}` } })
        if (data) {
            const fill = data?.data.find((item) => item.productId === product.id);

            const { data: DATA } = await api.get(`/api/establishment/${fill.establishmentId}`, { headers: { 'Authorization': `Bearer ${token}` } });

            console.log('DATA', DATA)

            setMarkerLatitude(DATA.data.latitude)
            setMarkerLongitude(DATA.data.longitude)

            console.log('DATA.LAT', DATA.data.latitude)
            console.log('DATA.LONG', DATA.data.longitude)

        }
    } */

  //Retorna marcador em todos os estabelecimentos que tem o produto\

  const fetchCoord = async () => {
    console.log('fetchCoord');
    const token = await getItem(StorageItems.ACCESS_TOKEN);
    console.log('Product Id', product.id);

    try {
      const {data: response} = await api.get(
        `/api/product/${product.id}?usersLatitude=${currentLatitude}
            &usersLongitude=${currentLongitude}
            &rangeRadius=${currentRange}`,
        {headers: {Authorization: `Bearer ${token}`}},
      );

      console.log('DATA: ', response);

      setProductData(response.data);
      //console.log('Object: ', response.data.prices)
      // console.log('Object (Coords): ', response.data.prices.map(x => console.log("Q ISSO: " + x.establishment)))
      // console.log('Object (Lat): ', response.data.prices.map(x => console.log("Latitude: " + x.establishment.latitude)))
      //console.log('Object (Long): ', response.data.prices.map(x => console.log("Longitude: " + x.establishment.longitude)))

      //const markerLatitude = response.data.prices.map(x => x.establishment.latitude)
      //const markerLongitude = response.data.prices.map(x => x.establishment.longitude)
      //console.log("markerLatitude: ", markerLatitude)
      //console.log("markerLongitude", markerLongitude)
      //setMarkerLatitude(markerLatitude)
      //setMarkerLongitude(markerLongitude)
    } catch (erro) {
      console.log('Erro que ta dando é esse: ');
      console.log(erro.response);
    }

    //setMarkerLatitude(data.data.prices.map(x => x.establishment.latitude))
    //setMarkerLongitude(data.data.longitude)

    //console.log('DATA.LAT', DATA.data.latitude)
    //console.log('DATA.LONG', DATA.data.longitude)
  };

  console.log('Product Data: ', productData);

  const [region, setRegion] = useState(null);

  function getMyLocation() {
    Geolocation.getCurrentPosition(
      info => {
        console.log('LAT: ', info.coords.latitude);
        console.log('LONG: ', info.coords.longitude);

        const currentLatitude = info.coords.latitude;
        const currentLongitude = info.coords.longitude;
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
      },
      () => {
        console.log('Erro');
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 1000,
      },
    );
  }

  useEffect(() => {
    getMyLocation();
  }, []);

  useEffect(() => {
    if (currentLongitude && currentLongitude) {
      fetchCoord();
    }
  }, [currentLatitude, currentLongitude]);

  return (
    <S.WrapperContainer>
      {productData ? (
        <MapView
          onMapReady={() => {
            Platform.OS === 'android'
              ? PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                ).then(() => {
                  console.log('USUARIO ACEITOU');
                })
              : '';
          }}
          style={{width: width, height: height}}
          region={{
            latitude: currentLatitude,
            longitude: currentLongitude,
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
                      <S.ProductValue>R${String(x.value) || ''}</S.ProductValue>
                    </S.WrapperMarkerContent>
                  </S.MarkerContainer>
                </Marker>
              );
            })}
        </MapView>
      ) : null}
    </S.WrapperContainer>
  );
}
