import React, { useState } from 'react';
import { Alert } from 'react-native';
import EmailValidator from 'email-validator';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { InputType } from '../../enum/inputType';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth'


import useReduxState from '../../hooks/useReduxState';
import * as S from './LoginScreen.style';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/Auth';

export function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //const { signIn } = useAuth();

    function signIn() {
        auth().signInWithEmailAndPassword(email, password)
            .then(() => console.log('Usuário logado'))
            .catch(error => console.log(error))
    }

    return (
        <>
            <S.Container>
                <S.WrapperContainer>
                    <S.SubContainer>
                        <S.TextLogo bold>PagBarato</S.TextLogo>
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
                        <S.WrapperFormLink>
                            <S.WrapperLink onPress={() => navigation.navigate('ForgotPassword')} >
                                <S.TextLogo>Esqueci a senha</S.TextLogo>
                            </S.WrapperLink>
                            <S.WrapperLink onPress={() => navigation.navigate('CreateAccount')}>
                                <S.TextLogo>Criar uma conta</S.TextLogo>
                            </S.WrapperLink>

                        </S.WrapperFormLink>
                        <S.WrapperForm>
                            <Button
                                title="Entrar"
                                width={0.6}
                                onPress={signIn}
                            //onPress={() => signIn(email, password)}
                            />
                        </S.WrapperForm>
                    </S.SubContainer>
                </S.WrapperContainer>
            </S.Container>
        </>
    );
};
