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


import * as S from './HomeScreen.style';

export function HomeScreen() {

    function renderItem({ item }) {
        return <ProductItem {...item} />
    }

    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState(productList);

    useEffect(() => {
        if (searchText === '') {
            setList(productList);
        } else {
            setList(
                productList.filter((i) => {
                    return (i.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
                })
            );
        }
    }, [searchText]);


    return (
        <SafeAreaView style={styles.container}>
            <Header title="Home" />
            <TextInput
                placeholder='Pesquise um produto'
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
        backgroundColor: "#fff",

    },
});



