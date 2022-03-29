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

export function HomeScreen() {

    function renderItem({ item }) {
        return <ProductItem {...item} />
    }

    return (
        <SafeAreaView style={styles.container}>
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



