import React, { useState, useEffect } from 'react';
import { Alert, Switch } from 'react-native';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import api from '../../services/api';
import { getItem, StorageItems } from '../../services/storage';

import SelectBox from 'react-native-multi-selectbox';
import DatePicker from 'react-native-date-picker';

import * as S from './PostProductScreen.style';

export function PostProductScreen({ navigation }) {
    const [productName, setProductName] = useState('');
    const [value, setValue] = useState('');

    const [isEnabled, setIsEnabled] = useState(false);

    const [selectedItem, setSelectedItem] = useState<any>({})
    const [establishmentList, setEstablishmentList] = useState([]);

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const [priceType, setPriceType] = useState<any>({});



    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
    }

    const fetchData = async () => {
        const token = await getItem(StorageItems.ACCESS_TOKEN);
        const { data } = await api.get('/api/establishment?paginate=false',
            { headers: { 'Authorization': `Bearer ${token}` } });
        const formatedData = data.data.map((item: { id: any; name: any; }) => ({
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
        if (productName === '' || value === '' || selectedItem === '' || priceType === '') {
            console.log('Campos não preenchidos')
            Alert.alert('Preencha todos os campos necessarios');
        } else {
            try {
                console.log({
                    productName,
                    establishmentId: selectedItem.id,
                    value,
                    isProductWithNearExpirationDate: isEnabled,
                    type: priceType.id,
                    expiresAt: date
                })


                const token = await getItem(StorageItems.ACCESS_TOKEN);
                const res = await api.post(`/api/price`,
                    {
                        productName,
                        establishmentId: selectedItem.id,
                        value,
                        isProductWithNearExpirationDate: isEnabled,
                        type: priceType.id,
                        expiresAt: date
                    },
                    { headers: { 'Authorization': `Bearer ${token}` } });
                Alert.alert('Preço postado com sucesso!')
                navigation.navigate('HomeScreen')

                return res.data;

            } catch (error) {
                console.log(error.response.data);
                //console.log(JSON.stringify(error));

            }

        }
    }

    function onChangeVal() {
        return (val: any) => setSelectedItem(val)
    }

    function onChangeValPriceType() {
        return (val: any) => setPriceType(val)
    }

    const PRICE_OPTIONS = [
        {
            item: 'Comum',
            id: 'COMMON',
        },
        {
            item: 'Oferta',
            id: 'DEAL',
        },
    ]

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
                            <S.WrapperSelectBox>
                                <SelectBox
                                    label="Selecione o estabelecimento"
                                    options={establishmentList}
                                    value={selectedItem}
                                    onChange={onChangeVal()}
                                    hideInputFilter={false}
                                    inputPlaceholder="Estabelecimentos"
                                    arrowIconColor="green"
                                    searchIconColor="green"
                                />
                            </S.WrapperSelectBox>
                            <Input
                                value={value}
                                onChangeText={setValue}
                                placeholder="Preço do produto"
                                autoCapitalized="none"
                                keyboardType="numeric"
                                maxLength={120}
                            />
                            <S.WrapperSwitchSelector>
                                <S.WrapperSwitchForm>
                                    <S.TextSwitch>Produto próximo da data de vencimento? </S.TextSwitch>
                                    <Switch
                                        trackColor={{ false: "#3e3e3e", true: "green" }}
                                        thumbColor={isEnabled ? "orange" : "#f4f4f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                </S.WrapperSwitchForm>
                                <S.WrapperSwitchForm>
                                    <SelectBox
                                        label="Selecione o tipo de preço"
                                        inputPlaceholder="Tipo de preço"
                                        options={PRICE_OPTIONS}
                                        value={priceType}
                                        onChange={onChangeValPriceType()}
                                        hideInputFilter={true}
                                        arrowIconColor="green"
                                    />

                                </S.WrapperSwitchForm>
                                <Button
                                    disabled={priceType.id != 'DEAL'}
                                    title="Data da oferta"
                                    width={0.4}
                                    onPress={() => setOpen(true)}
                                />

                                <DatePicker
                                    modal
                                    open={open}
                                    date={date}
                                    mode="date"
                                    onConfirm={(date) => {
                                        setOpen(false)
                                        setDate(date)
                                    }}
                                    onCancel={() => {
                                        setOpen(false)
                                    }}
                                />

                            </S.WrapperSwitchSelector>
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
