import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { InputType } from '../../enum/inputType';
import auth from '@react-native-firebase/auth'
import { Image, Alert } from 'react-native';


import useReduxState from '../../hooks/useReduxState';
import * as S from './LoginScreen.style';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/Auth';
import { setAuthTokens, setItem, StorageItems } from '../../services/storage'

export function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function signIn() {
        auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res);
                console.log(res.user.uid);
                setItem(StorageItems.USER_ID, res.user.uid);
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    Alert.alert('Senha incorreta')
                    console.log('Senha incorreta')
                }
                if (error.code === 'auth/invalid-email') {
                    Alert.alert('Email incorreto')
                    console.log('Email incorreto')
                }
            })
    }

    auth().onAuthStateChanged(function (user) {
        if (user) {
            user.getIdToken().then(function (idToken) {  // <------ Check this line
                setAuthTokens(idToken, ''); // It shows the Firebase token now
                return idToken;
            });
        }
    });


    return (
        <>
            <S.Container>
                <S.WrapperContainer>
                    <S.SubContainer>
                        <S.LogoContainer>
                            <Image style={{ width: 250, height: 150 }} source={require('../../assets/logo/PagBarato_Cream.png')} />
                        </S.LogoContainer>
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
