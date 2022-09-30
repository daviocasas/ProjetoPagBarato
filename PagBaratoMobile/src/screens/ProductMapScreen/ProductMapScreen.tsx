import React, { useState, useEffect } from 'react';
import { Platform, PermissionsAndroid, Dimensions } from 'react-native';

import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';


import * as S from './ProductMapScreen.style';


const { width, height } = Dimensions.get('screen')



export function ProductMapScreen() {

    const [region, setRegion] = useState(null);

    useEffect(() => {
        getMyLocation()
    }, [])

    function getMyLocation() {
        Geolocation.getCurrentPosition(info => {
            console.log("LAT: ", info.coords.latitude)
            console.log("LONG: ", info.coords.longitude)

            setRegion({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.421
            })

        },
            () => { console.log("Erro") }, {
            enableHighAccuracy: true,
            timeout: 2000,

        })
    }
    return (
        <>
            <S.WrapperContainer>
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
                    region={region}
                    zoomEnabled={true}
                    minZoomLevel={10}
                    showsUserLocation={true}
                    loadingEnabled={true}
                />
            </S.WrapperContainer>
        </>

    );
};