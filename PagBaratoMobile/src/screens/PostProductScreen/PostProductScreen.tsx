import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import api from '../../services/api'
import { getItem, StorageItems } from '../../services/storage'

import SelectBox from 'react-native-multi-selectbox'

import * as S from './PostProductScreen.style';

export function PostProductScreen({ navigation }) {
    const [productName, setProductName] = useState('');
    const [establishmentId, setEstablishmentId] = useState('');
    const [value, setValue] = useState('');

    const [selectedItem, setSelectedItem] = useState<any>({})
    const [establishmentList, setEstablishmentList] = useState([]);


    const fetchData = async () => {
        const token = await getItem(StorageItems.ACCESS_TOKEN);
        const { data } = await api.get('/api/establishment?paginate=false', { headers: { 'Authorization': `Bearer ${token}` } });
        const formatedData = data.data.map((item) => ({
            ...item,
            id: item.id,
            item: item.name,
        }));
        return setEstablishmentList(formatedData);

    }

    useEffect(() => {
        fetchData();
    }, []);


    const postProductPrice = async () => {
        try {
            console.log({ productName, establishmentId: selectedItem.id, value })
            const token = await getItem(StorageItems.ACCESS_TOKEN);
            const res = await api.post('/api/price',
                { productName, establishmentId: selectedItem.id, value },
                { headers: { 'Authorization': `Bearer ${token}` } });
            Alert.alert('Preço postado com sucesso!')
            navigation.navigate('Home')

            return res.data;

        } catch (error) {
            console.log(error.response.data);
            //console.log(JSON.stringify(error));

        }
    }

    function onChangeVal() {
        return (val) => setSelectedItem(val)
    }

    return (
        <>
            <S.Container>
                <S.WrapperContainer>
                    <S.SubContainer>
                        <S.TextLogo bold>Poste um preço de produto!</S.TextLogo>
                        <S.WrapperForm>
                            <Input
                                value={productName}
                                onChangeText={setProductName}
                                placeholder="Nome do produto"
                                autoCapitalized="none"
                                keyboardType="default"
                                maxLength={120}
                            />
                            <SelectBox
                                label="Selecione o estabelecimento"
                                options={establishmentList}
                                value={selectedItem}
                                onChange={onChangeVal()}
                                hideInputFilter={false}
                            />
                            <Input
                                value={value}
                                onChangeText={setValue}
                                placeholder="Preço do produto"
                                autoCapitalized="none"
                                keyboardType="numeric"
                                maxLength={120}
                            />
                        </S.WrapperForm>
                        <S.WrapperForm>
                            <Button
                                title="Publicar produto"
                                width={0.6}
                                onPress={postProductPrice}
                            />
                        </S.WrapperForm>
                    </S.SubContainer>
                </S.WrapperContainer>
            </S.Container>
        </>
    );
};
