import React, {useState, useEffect, useCallback} from 'react';
import {LogBox} from 'react-native';

import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  TextInput,
  RefreshControl,
  Platform,
  PermissionsAndroid,
  Text,
} from 'react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ProductItem} from '../../components/ProductItem/ProductItem';
import {SeparatorItem} from '../../components/SeparatorItem/SeparatorItem';
import {Slider} from '@miblanchard/react-native-slider';
import Header from '../../components/Header/Header';
import api from '../../services/api';
import {getItem, StorageItems} from '../../services/storage';
import Geolocation from '@react-native-community/geolocation';

export function HomeScreen() {
  const [watchID, setWatchID] = useState(0);
  const [list, setList] = useState<any>([]);
  const [distance, setDistance] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [location, setLocation] = useState({
    currentLatitude: '',
    currentLongitude: '',
  });

  const navigation = useNavigation();

  function renderItem({item}) {
    return (
      <ProductItem
        onPress={() =>
          navigation.navigate('ProductMapScreen', {
            productId: item.id,
            currentLocation: location,
            distance,
          })
        }
        {...item}
      />
    );
  }

  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  const fetchData = async () => {
    if (!location.currentLatitude || !location.currentLongitude) return;

    setRefreshing(true);

    const token = await getItem(StorageItems.ACCESS_TOKEN);

    console.log({...location, distance: Math.floor(distance)});

    try {
      const {data: response} = await api.get(
        `/api/product?paginate=false&usersLatitude=${
          location.currentLatitude
        }&usersLongitude=${location.currentLongitude}&rangeRadius=${Math.floor(
          distance,
        )}`,
        {headers: {Authorization: `Bearer ${token}`}},
      );

      if (response.data) {
        const formatedData = response.data.map(item => ({
          ...item,
          price: item.lowestPrice,
          name: item.name,
          establishment: item.lowestPriceEstablishment,
        }));

        setList(formatedData);
      }
    } catch (err) {
      console.log(err.response.data);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (location.currentLatitude && location.currentLongitude) {
        if (distance && Math.floor(distance) && !refreshing) {
          console.log('FocusEffect fetchData()');
          fetchData();
        }
      } else {
        getMyLocation();
      }
    }, [location]),
  );

  useEffect(() => {
    if (searchText !== '') {
      setList(prevState =>
        prevState.filter(i => {
          return i.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
        }),
      );
    } else if (!refreshing) {
      console.log('SearchText fetchData()');
      fetchData();
    }
  }, [searchText]);
  // https://reactnative.dev/docs/refreshcontrol

  useEffect(() => {
    grantPermissionLocation();

    return () => {
      console.log('Alou');
      clearLocation();
    };
  }, []);

  useEffect(() => {
    if (distance) fetchData();
  }, [distance]);

  const grantPermissionLocation = () => {
    if (Platform.OS === 'ios') {
      getMyLocation();
    } else {
      const requestLocationPermission = async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão de acesso a localização',
            message: 'Este aplicativo precisa acessar sua localização',
            buttonNeutral: 'Pergunte-me depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getMyLocation();
        } else {
          alert('Permissão de localização negada');
        }
      };
      requestLocationPermission();
    }
  };

  const setMyLocation = (latitude, longitude) => {
    const currentLatitude = JSON.stringify(latitude);
    const currentLongitude = JSON.stringify(longitude);

    if (
      currentLatitude != location.currentLatitude &&
      currentLongitude != location.currentLongitude
    ) {
      setLocation({currentLatitude, currentLongitude});
    }
  };

  function getMyLocation() {
    Geolocation.getCurrentPosition(
      info => {
        setMyLocation(info.coords.latitude, info.coords.longitude);
      },
      err => {
        console.log('Erro', err);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
      },
    );

    const watchID = Geolocation.watchPosition(
      position => {
        setMyLocation(position.coords.latitude, position.coords.longitude);
      },
      err => {
        console.log('Erro', err);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
      },
    );

    setWatchID(watchID);
  }

  const clearLocation = () => {
    Geolocation.clearWatch(watchID);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header title="Home" />
        <Text>Distância (km): {Math.floor(distance)}</Text>
        <Slider
          minimumValue={1}
          maximumValue={21}
          thumbTintColor="#EF8F01"
          value={distance}
          onValueChange={value => setDistance(value)}
        />
        <TextInput
          placeholder="Pesquise um produto..."
          value={searchText}
          onChangeText={t => setSearchText(t)}
        />

        <FlatList
          data={list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
          ItemSeparatorComponent={SeparatorItem}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
});
