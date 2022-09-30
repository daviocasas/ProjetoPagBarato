import React, { useState, useEffect, useCallback } from 'react';

import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    TextInput,
    RefreshControl,
    StatusBar,
    Platform,
    PermissionsAndroid,
    Text,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ProductItem } from '../../components/ProductItem/ProductItem';
import { SeparatorItem } from '../../components/SeparatorItem/SeparatorItem';
import { Slider } from '@miblanchard/react-native-slider';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import api from '../../services/api';
import { getItem, StorageItems } from '../../services/storage'
import Geolocation from '@react-native-community/geolocation';



export function HomeScreen() {
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [currentLatitude, setCurrentLatitude] = useState('');
    const [currentLongitude, setCurrentLongitude] = useState('');
    const [distance, setDistance] = useState(0);
    const [watchID, setWatchID] = useState(0);

    //const { item } = route.params;
    //console.log(`PASSEI ESSE VALOR DA OUTRA TELA: ${JSON.stringify(item)}`)


    function renderItem({ item }) {
        return <ProductItem {...item} />
    }

    //PRIMEIRO EXEMPLO - USUARIO ESTA NA PUC
    //lat = -22.8343228
    //long = -47.0525011



    const fetchData = async () => {
        setRefreshing((prevState) => !prevState);
        const token = await getItem(StorageItems.ACCESS_TOKEN);
        console.log(token)
        console.log(currentLatitude)
        console.log(currentLongitude)
        console.log(Math.floor(distance))

        try {
            const { data } = await api.get(`/api/product?paginate=false&usersLatitude=${currentLatitude}&usersLongitude=${currentLongitude}&rangeRadius=${Math.floor(distance)}`,
                { headers: { 'Authorization': `Bearer ${token}` } });
            if (data.data) {
                const formatedData = data.data.map((item) => ({
                    ...item,
                    price: item.lowestPrice,
                    name: item.name,
                    establishment: item.lowestPriceEstablishment
                }));
                setRefreshing((prevState) => !prevState);
                setList(formatedData);
            }
        } catch (err) {
            console.log('Erro que ta dando é esse: ')
            console.log(err.response)
        }

    }


    useFocusEffect(
        useCallback(() => {
            fetchData();
            getMyLocation();
        }, [])
    );


    useEffect(() => {
        if (searchText !== '') {
            setList((prevState) => prevState.filter((i) => {
                return (i.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
            })
            );
        } else {
            fetchData();

        }
    }, [searchText]);
    // https://reactnative.dev/docs/refreshcontrol

    const callLocation = () => {
        if (Platform.OS === 'ios') {
            getMyLocation();
        } else {
            const requestLocationPermission = async () => {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Permissão de acesso a localização",
                        message: "Este aplicativo precisa acessar sua localização",
                        buttonNeutral: "Pergunte-me depois",
                        buttonNegative: "Cancelar",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getMyLocation();
                } else {
                    alert('Permissão de localização negada');
                }
            }
            requestLocationPermission();
        }
    }

    /*
    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const currentLatitude = JSON.stringify(position.coords.latitude);
                const currentLongitude = JSON.stringify(position.coords.longitude);
                setCurrentLatitude(currentLatitude);
                setCurrentLongitude(currentLongitude);
                console.log("Latitude: " + currentLatitude + " Long: " + currentLongitude)
            },
            (error) => alert(error.message),
            { timeout: 20000 }
        );
        const watchID = Geolocation.watchPosition((position) => {
            const currentLatitude = JSON.stringify(position.coords.latitude);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            setCurrentLatitude(currentLatitude);
            setCurrentLongitude(currentLongitude);
        });
        setWatchID(watchID);
    }
    */

    function getMyLocation() {
        Geolocation.getCurrentPosition(info => {
            console.log("LAT: ", info.coords.latitude)
            console.log("LONG: ", info.coords.longitude)

            const currentLatitude = JSON.stringify(info.coords.latitude);
            const currentLongitude = JSON.stringify(info.coords.longitude);
            setCurrentLatitude(currentLatitude);
            setCurrentLongitude(currentLongitude);

        },
            () => { console.log("Erro") }, {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 1000,

        })
        const watchID = Geolocation.watchPosition((position) => {
            const currentLatitude = JSON.stringify(position.coords.latitude);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            setCurrentLatitude(currentLatitude);
            setCurrentLongitude(currentLongitude);
        });
        setWatchID(watchID);
    }

    /* const clearLocation = () => {
        Geolocation.clearWatch(watchID);
    } */

    useEffect(() => {
        callLocation();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <Header title="Home" />
            <Text>Distância (km): {Math.floor(distance)}</Text>
            <Slider
                minimumValue={0}
                maximumValue={20}
                thumbTintColor="#EF8F01"
                value={distance}
                onValueChange={(value) => setDistance(value)}
            />
            <TextInput
                placeholder='Pesquise um produto...'
                value={searchText}
                onChangeText={(t) => setSearchText(t)}
            />
            <FlatList
                data={list}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}
                ItemSeparatorComponent={SeparatorItem}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f3f3",

    },

});



