import React, { useState, useEffect, useCallback } from 'react';
import { LogBox } from 'react-native';

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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
    const [list, setList] = useState<any>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [currentLatitude, setCurrentLatitude] = useState('');
    const [currentLongitude, setCurrentLongitude] = useState('');
    const [distance, setDistance] = useState(1);
    const [watchID, setWatchID] = useState(0);
    const navigation = useNavigation();

    //const { item } = route.params;
    //console.log(`PASSEI ESSE VALOR DA OUTRA TELA: ${JSON.stringify(item)}`)


    function renderItem({ item }) {
        return <ProductItem onPress={() => navigation.navigate('ProductMapScreen', { product: item, distance })}  {...item} />
    }

    //PRIMEIRO EXEMPLO - USUARIO ESTA NA PUC
    //lat = -22.8343228
    //long = -47.0525011

    LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications

    const fetchData = async () => {
        //setRefreshing((prevState) => !prevState);
        setRefreshing(true)
        const token = await getItem(StorageItems.ACCESS_TOKEN);
        const refreshToken = await getItem(StorageItems.REFRESH_TOKEN);
        console.log("TOKEN: ")
        console.log(token)
        console.log("REFRESH TOKEN: ")
        console.log(refreshToken)

        console.log(currentLatitude)
        console.log(currentLongitude)
        console.log(Math.floor(distance))

        try {
            const { data: response } = await api.get(`/api/product?paginate=false&usersLatitude=${currentLatitude}&usersLongitude=${currentLongitude}&rangeRadius=${Math.floor(distance)}`,
                { headers: { 'Authorization': `Bearer ${token}` } });
            if (response.data) {
                const formatedData = response.data.map((item) => ({
                    ...item,
                    price: item.lowestPrice,
                    name: item.name,
                    establishment: item.lowestPriceEstablishment
                }));
                //setRefreshing((prevState) => !prevState);

                setList(formatedData);
            }
        } catch (err) {
            console.log('Erro que ta dando é esse: ')
            console.log(err.response)
        } finally {
            setRefreshing(false);
        }

    }


    useFocusEffect(
        useCallback(() => {
            console.log({ refreshing })
            if (currentLatitude && currentLongitude) {
                if (distance && Math.floor(distance) && !refreshing) {
                    console.log('FatchData do Focus Effect')
                    fetchData();

                }
            } else {
                getMyLocation();
            }
        }, [currentLatitude, currentLongitude])
    );


    useEffect(() => {
        if (searchText !== '') {
            setList((prevState) => prevState.filter((i) => {
                return (i.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
            })
            );
        } else if (!refreshing) {
            console.log('FatchData do SearchText')
            fetchData();
        }
    }, [searchText]);
    // https://reactnative.dev/docs/refreshcontrol

    useEffect(() => {
        grantPermissionLocation();
    }, []);

    useEffect(() => {
        if (distance) {
            fetchData();
        }
    }, [distance]);



    const grantPermissionLocation = () => {
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




    return (
        <SafeAreaView style={styles.container}>
            <Header title="Home" />
            <Text>Distância (km): {Math.floor(distance)}</Text>
            <Slider
                minimumValue={1}
                maximumValue={21}
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



