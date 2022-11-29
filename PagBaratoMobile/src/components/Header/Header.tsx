import React, {FunctionComponent} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';

import {color} from '../../config/theme.json';
import * as S from './Header.style';

interface IHeader {
  title?: string;
}

const Header: FunctionComponent<IHeader> = ({title}: any) => {
  const showConfirmLogoutDialog = () => {
    return Alert.alert(
      'Confirmar ação',
      'Deseja mesmo sair?',
      [
        {
          text: 'Sim',
          onPress: () => auth().signOut(),
        },
        {
          text: 'Não',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <S.Container>
      <S.WrapperIcon></S.WrapperIcon>
      <S.WrapperTitle>
        <S.Title>{title}</S.Title>
      </S.WrapperTitle>
      <S.WrapperIcon onPress={showConfirmLogoutDialog}>
        <Feather name="log-out" size={20} color={color.cream} />
      </S.WrapperIcon>
    </S.Container>
  );
};

export default Header;
