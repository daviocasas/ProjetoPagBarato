import React from 'react';
import * as S from './Header.style';
import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from '../../contexts/Auth';

interface IHeader {
  title?: string;
  navigation;
}

const Header = ({ navigation, title }: IHeader) => {

  const { signOut } = useAuth();

  const openMenu = () => {
    navigation.openDrawer()
  }


  return (
    <S.Container>
      <S.WrapperIcon onPress={openMenu}>
        <Feather name="menu" size={30} />
      </S.WrapperIcon>
      <S.WrapperTitle>
        <S.Title>{title}</S.Title>
      </S.WrapperTitle>
      <S.WrapperExit onPress={signOut} >
        <Feather name="log-out" size={30} />
      </S.WrapperExit>
    </S.Container>
  );
};

export default Header;
