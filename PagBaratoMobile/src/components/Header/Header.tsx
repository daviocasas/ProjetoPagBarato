import React, {FunctionComponent} from 'react';
import * as S from './Header.style';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {color} from '../../config/theme.json';

interface IHeader {
  title?: string;
}

const Header: FunctionComponent<IHeader> = ({title}: any) => {
  const navigation = useNavigation();

  function signOut() {
    auth().signOut();
  }

  return (
    <S.Container>
      <S.WrapperIcon onPress={() => navigation.navigate('PostProductScreen')}>
        <Feather name="plus" size={20} color={color.second} />
      </S.WrapperIcon>
      <S.WrapperTitle>
        <S.Title>{title}</S.Title>
      </S.WrapperTitle>
      <S.WrapperIcon onPress={signOut}>
        <Feather name="log-out" size={20} color={color.second} />
      </S.WrapperIcon>
    </S.Container>
  );
};

export default Header;
