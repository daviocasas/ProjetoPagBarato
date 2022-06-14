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
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ProductItem } from '../../components/ProductItem/ProductItem';
import { SeparatorItem } from '../../components/SeparatorItem/SeparatorItem';
import Header from '../../components/Header/Header';
import api from '../../services/api';
import { getItem, StorageItems } from '../../services/storage'
import Geolocation from '@react-native-community/geolocation';



export function HomeScreen() {
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [currentLatitude, setCurrentLatitude] = useState('-22.565200');
    const [currentLongitude, setCurrentLongitude] = useState('-47.151500');
    const [watchID, setWatchID] = useState(0);

    function renderItem({ item }) {
        return <ProductItem {...item} />
    }


    //lat = -22.565200
    //long = -47.151500
    const fetchData = async () => {
        setRefreshing((prevState) => !prevState);
        const token = await getItem(StorageItems.ACCESS_TOKEN);
        console.log(token)
        try {
            const { data } = await api.get(`/api/product?paginate=false&usersLatitude=${currentLatitude}&usersLongitude=${currentLongitude}`,
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
            console.log(err.response)
        }

    }

    useFocusEffect(
        useCallback(() => {
            fetchData();
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
            getLocation();
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
                    getLocation();
                } else {
                    alert('Permissão de localização negada');
                }
            }
            requestLocationPermission();
        }
    }

    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const currentLatitude = JSON.stringify(position.coords.latitude);
                const currentLongitude = JSON.stringify(position.coords.longitude);
                setCurrentLatitude(currentLatitude);
                setCurrentLongitude(currentLongitude);
                console.log("Latitude: " + currentLatitude + "Long: " + currentLongitude)
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        const watchID = Geolocation.watchPosition((position) => {
            const currentLatitude = JSON.stringify(position.coords.latitude);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            setCurrentLatitude(currentLatitude);
            setCurrentLongitude(currentLongitude);
        });
        setWatchID(watchID);
    }

    const clearLocation = () => {
        Geolocation.clearWatch(watchID);
    }

    useEffect(() => {
        callLocation();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <Header title="Home" />
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



