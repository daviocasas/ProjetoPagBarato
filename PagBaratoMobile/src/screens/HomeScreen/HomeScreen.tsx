import React, {useState, useEffect, useCallback} from 'react';
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
  LogBox,
  View,
} from 'react-native';

import {Slider} from '@miblanchard/react-native-slider';
import Geolocation from '@react-native-community/geolocation';

import api from '../../services/api';
import {color} from '../../config/theme.json';
import Header from '../../components/Header/Header';
import {getItem, StorageItems} from '../../services/storage';
import {ProductItem} from '../../components/ProductItem/ProductItem';
import {SeparatorItem} from '../../components/SeparatorItem/SeparatorItem';
import FloatingButton from '../../components/FloatingButton/FloatingButton';

import * as S from './HomeScreen.style';
import {useAuth} from '../../contexts/Auth';

export function HomeScreen() {
  const [list, setList] = useState<any>([]);
  const [watchID, setWatchID] = useState(0);
  const [distance, setDistance] = useState(5);
  const [firstLoad, setFirstLoad] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [distanceRangeFilter, setDistanceRangeFilter] = useState(5);

  const [location, setLocation] = useState({
    currentLatitude: '',
    currentLongitude: '',
  });

  const navigation = useNavigation();
  const {refreshToken} = useAuth();

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
    if (
      !location.currentLatitude ||
      !location.currentLongitude ||
      isFetchingData
    )
      return;

    setIsFetchingData(true);

    const token = await getItem(StorageItems.ACCESS_TOKEN);

    try {
      const {data: response} = await api.get(
        `/api/product?paginate=false&usersLatitude=${location.currentLatitude}&usersLongitude=${location.currentLongitude}&rangeRadius=${distanceRangeFilter}`,
        {headers: {Authorization: `Bearer ${token}`}},
      );

      if (response && response.data) setList(response.data);
    } catch (err) {
      console.error(err.response.data);
      if (err?.response?.data?.error?.statusCode === 403) refreshToken();
    } finally {
      if (firstLoad) setFirstLoad(false);
      setIsFetchingData(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (location.currentLatitude && location.currentLongitude) {
        if (distanceRangeFilter && !isFetchingData) {
          console.info('FocusEffect fetchData()');
          fetchData();
        }
      } else {
        getMyLocation();
      }
    }, [location]),
  );

  useEffect(() => {
    if (searchText === '') return;

    setList(prevState =>
      prevState.filter(i => {
        return i.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      }),
    );
  }, [searchText]);
  // https://reactnative.dev/docs/refreshcontrol

  useEffect(() => {
    grantPermissionLocation();

    return () => {
      clearLocation();
    };
  }, []);

  useEffect(() => {
    if (distanceRangeFilter && !isFetchingData && !firstLoad) {
      console.info('distanceRangeFilter fetchData()');
      fetchData();
    }
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
        console.error(err);
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
        console.error(err);
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
    <SafeAreaView style={styles.container}>
      <Header title="PagBarato" />

      <View style={styles.viewContainer}>
        <Text style={styles.text}>Raio de busca: {distanceRangeFilter}km</Text>
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
          style={styles.text}
          placeholderTextColor={color.baby_gray}
          placeholder="Pesquise um produto..."
          value={searchText}
          onChangeText={t => setSearchText(t)}
        />

        {list && list.length ? (
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
        ) : (
          <S.EmptyStateContainer>
            <S.EmptyStateText>
              {isFetchingData
                ? 'Carregando...'
                : 'Nenhum preço encontrado na sua região.'}
            </S.EmptyStateText>
          </S.EmptyStateContainer>
        )}
      </View>

      <FloatingButton
        width={0.135}
        title="+"
        onPress={() => navigation.navigate('PostProductScreen')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.cream,
  },
  viewContainer: {
    padding: 16,
    marginBottom: 180,
  },
  text: {
    color: color.black,
  },
});
