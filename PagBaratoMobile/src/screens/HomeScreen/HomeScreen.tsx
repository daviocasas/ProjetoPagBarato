import React from 'react';
import {
    SafeAreaView,
    View,
    TextInput,
    FlatList,
    StyleSheet,
    TouchableOpacity,

} from 'react-native';

import { productList } from '../../services/listResults';
import { ProductItem } from '../../components/ProductItem/ProductItem';
import { SeparatorItem } from '../../components/SeparatorItem/SeparatorItem';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';

export function HomeScreen({ navigation }) {

    function renderItem({ item }) {
        return <ProductItem {...item} />
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Home" navigation />
            <Button title="Adicionar" width={0.3} onPress={() => navigation.navigate('PostProductScreen')} />
            <FlatList
                ItemSeparatorComponent={SeparatorItem}
                keyExtractor={(item) => item.id}
                data={productList}
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



