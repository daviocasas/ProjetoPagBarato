import React, {useState} from 'react';
import {Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

import {setAuthTokens, setItem, StorageItems} from '../../services/storage';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import {InputType} from '../../enum/inputType';
import * as S from './LoginScreen.style';
import {FirebaseError} from '../../enum/firebaseErrors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {color} from '../../config/theme.json';

export function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signIn() {
    try {
      if (email === '' || password === '') {
        Toast.show({
          type: 'error',
          text1: 'Preencha todos os campos!',
          text2: 'Não é permitido nenhum campo vazio.',
        });

        return;
      }

      const res = await auth().signInWithEmailAndPassword(email, password);
      await setItem(StorageItems.USER_ID, res.user.uid);

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Login efetuado com sucesso!',
        text2: 'Agora você já pode buscar os melhores preços na sua região :)',
      });
    } catch (err) {
      const errorsToTest = [
        FirebaseError.WRONG_PASSWORD,
        FirebaseError.USER_NOT_FOUND,
        FirebaseError.INVALID_EMAIL,
      ];

      if (err?.code && errorsToTest.includes(err.code)) {
        Toast.show({
          type: 'error',
          text1: 'Credenciais incorretas!',
          text2: 'Verifique seu e-mail e senha e tente novamente.',
        });
      }
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
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: color.cream,
      }}>
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
          <S.WrapperLink onPress={() => navigation.navigate('CreateAccount')}>
            <S.TextButtonLink>Criar uma conta</S.TextButtonLink>
          </S.WrapperLink>
        </S.WrapperFormLink>
        <S.WrapperForm>
          <Button title="Entrar" width={0.6} onPress={() => signIn()} />
        </S.WrapperForm>
      </S.SubContainer>
    </KeyboardAwareScrollView>
  );
}
