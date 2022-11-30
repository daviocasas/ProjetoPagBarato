import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import api from '../../services/api';
import * as S from './CreateAccount.style';

import {InputType} from '../../enum/inputType';
import {color} from '../../config/theme.json';
import {FirebaseError} from '../../enum/firebaseErrors';

export function CreateAccount({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    try {
      if (email === '' || name === '' || password === '') {
        Toast.show({
          type: 'error',
          text1: 'Preencha todos os campos!',
          text2: 'Não é permitido nenhum campo vazio.',
        });

        return;
      }

      const res = await api.post('/api/user', {email, password, name});

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Cadastro efetuado com sucesso!',
        text2: 'Agora você já pode desfrutar dos melhores preços :D',
      });

      navigation.navigate('Login');

      return res.data;
    } catch (err) {
      const errorCode = err.response?.data?.error?.code;

      if (errorCode && errorCode === FirebaseError.EMAIL_ALREADY_EXISTS) {
        Toast.show({
          type: 'error',
          text1: 'Email já cadastrado!',
          text2:
            'Alguma conta já foi registrada com este e-mail. Efetue login.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Cadastro não efetuado!',
          text2: 'Erro inesperado! Verifique os dados e tente novamente.',
        });
      }
    }
  };

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
        <S.TitleText bold>Cadastro</S.TitleText>
        <S.DescriptionText>
          Preencha os dados a seguir para utilizar a plataforma:
        </S.DescriptionText>
        <S.WrapperForm>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Seu nome"
            autoCapitalized="words"
            keyboardType="default"
            maxLength={120}
          />
          <Input
            value={email}
            onChangeText={setEmail}
            type={InputType.EMAIL}
            placeholder="Seu e-mail"
            autoCapitalized="none"
            keyboardType="email-address"
            maxLength={120}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            type={InputType.PASSWORD}
            password
            placeholder="Uma senha"
            autoCapitalized="none"
            keyboardType="default"
            maxLength={120}
          />
        </S.WrapperForm>
        <S.WrapperForm>
          <Button title="Criar conta" width={0.6} onPress={signUp} />
        </S.WrapperForm>
      </S.SubContainer>
    </KeyboardAwareScrollView>
  );
}
