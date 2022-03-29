import React, { useState } from 'react';
import { Alert } from 'react-native';
import EmailValidator from 'email-validator';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { InputType } from '../../enum/inputType';
import * as MessageService from '../../services/message';
import { useDispatch } from 'react-redux';


import useReduxState from '../../hooks/useReduxState';
import * as S from './LoginScreen.style';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/Auth';

export function LoginScreen() {
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <>
            <S.Container>
                <S.WrapperContainer>
                    <S.SubContainer>
                        <S.TextLogo bold>Seja bem vindo!</S.TextLogo>
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
                                title="Entrar"
                                width={0.6}
                                onPress={() => signIn(email, password)}
                            />
                        </S.WrapperForm>
                    </S.SubContainer>
                </S.WrapperContainer>
            </S.Container>
        </>
    );
};
