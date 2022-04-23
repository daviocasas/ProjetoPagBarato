import React from 'react';
import * as S from './Header.style';
import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from '../../contexts/Auth';
import { useNavigation } from '@react-navigation/native';


interface IHeader {
  title?: string;
}



const Header = ({ title }: IHeader) => {

  const { signOut } = useAuth();

  const navigation = useNavigation();

  return (
    <S.Container>
      <S.WrapperExit onPress={signOut}>
        <Feather name="log-out" size={30} />
      </S.WrapperExit>
      <S.WrapperTitle>
        <S.Title>{title}</S.Title>
      </S.WrapperTitle>
      <S.WrapperIcon onPress={() => navigation.navigate('PostProductScreen')} >
        <Feather name="plus" size={30} />
      </S.WrapperIcon>
    </S.Container>
  );
};

export default Header;
