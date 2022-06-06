import React, { useState, useEffect, useCallback } from 'react';
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    TextInput,
    RefreshControl,
    StatusBar,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ProductItem } from '../../components/ProductItem/ProductItem';
import { SeparatorItem } from '../../components/SeparatorItem/SeparatorItem';
import Header from '../../components/Header/Header';
import api from '../../services/api';
import { getItem, StorageItems } from '../../services/storage'



export function HomeScreen() {
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    function renderItem({ item }) {
        return <ProductItem {...item} />
    }

    const fetchData = async () => {
        setRefreshing((prevState) => !prevState);
        const token = await getItem(StorageItems.ACCESS_TOKEN);
        console.log(token)
        try {
            const { data } = await api.get('/api/product?paginate=false&usersLatitude=-22.565200&usersLongitude=-47.151500',
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



