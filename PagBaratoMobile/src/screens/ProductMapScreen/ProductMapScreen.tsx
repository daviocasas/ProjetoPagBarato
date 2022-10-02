import React, { useState, useEffect } from 'react';
import { Platform, PermissionsAndroid, Dimensions } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import api from '../../services/api';
import { getItem, StorageItems } from '../../services/storage'



import * as S from './ProductMapScreen.style';


const { width, height } = Dimensions.get('screen')



export function ProductMapScreen({ route }) {
    const [coord, setCoord] = useState({ lat: 0, long: 0 });
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [currentLongitude, setCurrentLongitude] = useState(0);
    console.log('route', route?.params?.product);

    const { params: { product } } = route;

    const fetchCoord = async () => {
        console.log('fetchCoord')
        const token = await getItem(StorageItems.ACCESS_TOKEN);
        const { data } = await api.get(`/api/price/?paginate=false`, { headers: { 'Authorization': `Bearer ${token}` } })
        if (data) {
            const fill = data?.data.find((item) => item.productId === product.id);

            const { data: DATA } = await api.get(`/api/establishment/${fill.establishmentId}`, { headers: { 'Authorization': `Bearer ${token}` } });

            console.log('DATA', DATA)

            setCoord({ lat: DATA.data.latitude, long: DATA.data.longitude })
            console.log('DATA.LAT', DATA.data.latitude)
            console.log('DATA.LONG', DATA.data.longitude)

        }
    }



    const [region, setRegion] = useState(null);


    function getMyLocation() {
        Geolocation.getCurrentPosition(info => {
            console.log("LAT: ", info.coords.latitude)
            console.log("LONG: ", info.coords.longitude)

            const currentLatitude = info.coords.latitude;
            const currentLongitude = info.coords.longitude;
            setCurrentLatitude(currentLatitude);
            setCurrentLongitude(currentLongitude);

        },
            () => { console.log("Erro") }, {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 1000,

        })
    }

    useEffect(() => {
        fetchCoord();
        getMyLocation()
    }, [])

    return (
        <S.WrapperContainer>
            {coord.lat && coord.long ? (
                <MapView
                    onMapReady={() => {
                        Platform.OS === 'android' ? PermissionsAndroid.request(
                            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                            .then(() => {
                                console.log("USUARIO ACEITOU")
                            })
                            : ''
                    }}
                    style={{ width: width, height: height }}
                    region={{
                        latitude: currentLatitude,
                        longitude: currentLongitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    zoomEnabled={true}
                    minZoomLevel={5}
                    showsUserLocation={true}
                    loadingEnabled={true}
                //provider={PROVIDER_GOOGLE}
                >
                    {product && (
                        <Marker
                            coordinate={{ latitude: Number(coord.lat), longitude: Number(coord.lat) }}
                            pinColor={"purple"} // any color
                            title={product.name || ''}
                            description={String(product.price) || ''}>
                        </Marker>

                    )}
                </MapView>
            ) : null}
        </S.WrapperContainer>

    );
};