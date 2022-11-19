import React, {useState} from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import {InputType} from '../../enum/inputType';
import auth from '@react-native-firebase/auth';
import {Image, Alert} from 'react-native';

import * as S from './LoginScreen.style';
import {setAuthTokens, setItem, StorageItems} from '../../services/storage';

export function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signIn() {
    try {
      console.log('Entrou signIn', email, password);

      if (email === '' || password === '') {
        Alert.alert('Preencha todos os campos necessarios!');
        return;
      }

      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res);
          setItem(StorageItems.USER_ID, res.user.uid);
        })
        .catch(error => {
          console.log(error);

          if (error.code === 'auth/wrong-password') {
            Alert.alert('Senha incorreta');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('Email incorreto ou inexistente');
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  auth().onAuthStateChanged(function (user) {
    if (user) {
      user.getIdToken().then(function (idToken) {
        setAuthTokens(idToken, '');
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
              <Image
                style={{width: 250, height: 150}}
                source={require('../../assets/logo/PagBarato_Cream.png')}
              />
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
              <S.WrapperLink
                onPress={() => navigation.navigate('ForgotPassword')}>
                <S.TextLogo>Esqueci a senha</S.TextLogo>
              </S.WrapperLink>
              <S.WrapperLink
                onPress={() => navigation.navigate('CreateAccount')}>
                <S.TextLogo>Criar uma conta</S.TextLogo>
              </S.WrapperLink>
            </S.WrapperFormLink>
            <S.WrapperForm>
              <Button
                title="Entrar"
                width={0.6}
                onPress={() => signIn()}
                //onPress={() => signIn(email, password)}
              />
            </S.WrapperForm>
          </S.SubContainer>
        </S.WrapperContainer>
      </S.Container>
    </>
  );
}
