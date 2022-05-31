import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    TextInput
} from 'react-native';

import { productList } from '../../services/listResults';
import { ProductItem } from '../../components/ProductItem/ProductItem';
import { SeparatorItem } from '../../components/SeparatorItem/SeparatorItem';
import { InputType } from '../../enum/inputType';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import api from '../../services/api';


import * as S from './HomeScreen.style';

export function HomeScreen() {
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState([]);

    function renderItem({ item }) {
        return <ProductItem {...item} />
    }

    // chamar a api :check:
    // formatar os dados :check:
    // renderizar os dados  :check:

    const fetchData = async () => {
        const { data } = await api.get('/api/price?paginate=false');
        const formatedData = data.data.records.map((item) => ({ ...item, price: item.value, name: item.productId }));
        setList(formatedData);
    }

    useEffect(() => {
        fetchData();
    }, []);


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



