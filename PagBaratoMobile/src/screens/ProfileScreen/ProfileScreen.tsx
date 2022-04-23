import React, { useState } from 'react';
import { Alert } from 'react-native';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

import * as S from './ProfileScreen.style';


export function ProfileScreen() {
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [price, setPrice] = useState('');


    const testeFunction = () => {
        const message = "Produto publicado!"
        return Alert.alert(message)
    }


    return (
        <>
            <S.Container>
                <S.WrapperContainer>
                    <S.SubContainer>
                        <S.TextLogo bold>Olá, {name}</S.TextLogo>
                        <S.WrapperForm>
                            <Input
                                value={name}
                                onChangeText={setName}
                                placeholder="Nome do produto"
                                autoCapitalized="none"
                                keyboardType="default"
                                maxLength={120}
                            />
                            <Input
                                value={place}
                                onChangeText={setPlace}
                                placeholder="Local do produto"
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
                                onPress={testeFunction}
                            />
                        </S.WrapperForm>
                    </S.SubContainer>
                </S.WrapperContainer>
            </S.Container>
        </>
    );
};
