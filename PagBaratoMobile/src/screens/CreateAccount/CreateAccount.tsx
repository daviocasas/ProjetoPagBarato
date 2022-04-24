import React, { useState } from 'react';
import { Alert } from 'react-native';
import EmailValidator from 'email-validator';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { InputType } from '../../enum/inputType';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth'


import useReduxState from '../../hooks/useReduxState';
import * as S from './CreateAccount.style';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/Auth';

export function CreateAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function signUp() {
        auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
            console.log('user: ', userCredential);
        }).catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('Email já existente')
            }
            if (error.code === 'auth/invalid-email') {
                console.log('Email inválido')
            }
        });
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
