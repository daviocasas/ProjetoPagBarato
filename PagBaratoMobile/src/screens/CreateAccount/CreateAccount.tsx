import React, { useState } from 'react';
import { Alert } from 'react-native';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { InputType } from '../../enum/inputType';
import api from '../../services/api'


import * as S from './CreateAccount.style';

export function CreateAccount({ navigation }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');


    const signUp = async () => {
        try {

            const res = await api.post('/api/user', { email, password, name });
            Alert.alert('Conta criada com sucesso!')
            navigation.navigate('Login')
            return res.data;

        } catch (error) {
            console.log(error.response.data);
            //console.log(JSON.stringify(error));
            if (error.code === 'auth/invalid-email') {
                Alert.alert('Email inválido')
            }
            if (error.code === 'auth/invalid-password') {
                Alert.alert('Senha inválida')
            }
        }

    }



    return (
        <>
            <S.Container>
                <S.WrapperContainer>
                    <S.SubContainer>
                        <S.TextLogo bold>Preencha os campos para criar a sua conta!</S.TextLogo>
                        <S.WrapperForm>
                            <Input
                                value={email}
                                onChangeText={setEmail}
                                type={InputType.EMAIL}
                                placeholder="E-mail"
                                autoCapitalized="none"
                                keyboardType="email-address"
                                maxLength={120}
                            />
                            <Input
                                value={password}
                                onChangeText={setPassword}
                                type={InputType.PASSWORD}
                                password
                                placeholder="Senha"
                                autoCapitalized="none"
                                keyboardType="default"
                                maxLength={120}
                            />
                            <Input
                                value={name}
                                onChangeText={setName}
                                placeholder="Nome"
                                autoCapitalized="words"
                                keyboardType="default"
                                maxLength={120}
                            />
                        </S.WrapperForm>
                        <S.WrapperForm>
                            <Button
                                title="Criar conta"
                                width={0.6}
                                onPress={signUp}
                            />
                        </S.WrapperForm>
                    </S.SubContainer>
                </S.WrapperContainer>
            </S.Container>
        </>
    );
};
