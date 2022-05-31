import React, { useState } from 'react';
import { Alert } from 'react-native';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import api from '../../services/api'



import * as S from './PostProductScreen.style';

export function PostProductScreen() {
    const [productName, setProductName] = useState('');
    const [place, setPlace] = useState('');
    const [price, setPrice] = useState('');

    const postProductPrice = async () => {
        const res = await api.post('/api/price', {
            place, price, productName
        })
        console.log(res.data);
    }

    //userID: a6adb78a-9beb-4c0f-a411-95f02323cb7c
    //productName  

    // https://github.com/lucasaraujonrt/react-native-animations


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
                            <Input
                                value={place}
                                onChangeText={setPlace}
                                placeholder="Estabelecimento"
                                autoCapitalized="none"
                                keyboardType="default"
                                maxLength={120}
                            />
                            <Input
                                value={price}
                                onChangeText={setPrice}
                                placeholder="Preço do produto"
                                autoCapitalized="none"
                                keyboardType="default"
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
