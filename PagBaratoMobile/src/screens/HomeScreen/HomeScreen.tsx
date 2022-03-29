import React from 'react';
import { View } from 'react-native';
import ItemBox from '../../components/ItemBox/ItemBox';
import Button from '../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/Auth';
import Header from '../../components/Header/Header';


export function HomeScreen() {

    const navigation = useNavigation();
    const { signOut } = useAuth();

    return (
        <View>
            <Header
                title='Teste'
                onPress={signOut} />
            <Button
                onPress={() => navigation.navigate('PostProductScreen')}
                width={0.8}
                title="Publicar um produto"
            />
        </View>
    );
}