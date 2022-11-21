import React, {useState, useEffect, useCallback} from 'react';
import {LogBox, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

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

import {Slider} from '@miblanchard/react-native-slider';
import Geolocation from '@react-native-community/geolocation';

import {color} from '../../config/theme.json';
import {getItem, StorageItems} from '../../services/storage';
import {ProductItem} from '../../components/ProductItem/ProductItem';
import {SeparatorItem} from '../../components/SeparatorItem/SeparatorItem';
import FloatingButton from '../../components/FloatingButton/FloatingButton';

import Header from '../../components/Header/Header';
import api from '../../services/api';

export function HomeScreen() {
  const [watchID, setWatchID] = useState(0);
  const [list, setList] = useState<any>([]);
  const [distance, setDistance] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [distanceRangeFilter, setDistanceRangeFilter] = useState(5);

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

  const changeDistanceRange = (val: number | number[]) => {
    const sliderValue = val[0] && Math.floor(val[0]);
    if (sliderValue !== distanceRangeFilter) {
      setDistanceRangeFilter(_prevState => sliderValue);
    }
  };

  const fetchData = async () => {
    if (!location.currentLatitude || !location.currentLongitude) return;

    setIsFetchingData(true);

    const token = await getItem(StorageItems.ACCESS_TOKEN);

    try {
      const {data: response} = await api.get(
        `/api/product?paginate=false&usersLatitude=${location.currentLatitude}&usersLongitude=${location.currentLongitude}&rangeRadius=${distanceRangeFilter}`,
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
      setIsFetchingData(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (location.currentLatitude && location.currentLongitude) {
        if (distanceRangeFilter && !isFetchingData) {
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
    } else if (!isFetchingData) {
      console.log('SearchText fetchData()');
      fetchData();
    }
  }, [searchText]);
  // https://reactnative.dev/docs/refreshcontrol

  useEffect(() => {
    grantPermissionLocation();

    return () => {
      clearLocation();
    };
  }, []);

  useEffect(() => {
    if (distanceRangeFilter) fetchData();
  }, [distanceRangeFilter]);

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
        <Header title="PagBarato" />

        <View style={styles.viewContainer}>
          <Text>Distância (km): {distanceRangeFilter}</Text>
          <Slider
            minimumValue={1}
            maximumValue={20}
            minimumTrackTintColor={color.mid_orange}
            thumbTintColor={color.primary}
            value={distance}
            onSlidingComplete={changeDistanceRange}
            onValueChange={value => setDistance(value as number)}
          />
          <TextInput
            placeholder="Pesquise um produto..."
            value={searchText}
            onChangeText={t => setSearchText(t)}
          />

          <FlatList
            data={list}
            refreshControl={
              <RefreshControl
                refreshing={isFetchingData}
                onRefresh={fetchData}
              />
            }
            ItemSeparatorComponent={SeparatorItem}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>

        <FloatingButton
          width={0.1}
          title="+"
          onPress={() => navigation.navigate('PostProductScreen')}
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
  viewContainer: {
    padding: 16,
  },
});
