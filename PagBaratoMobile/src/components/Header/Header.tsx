import React from 'react';
import * as S from './Header.style';
import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from '../../contexts/Auth';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';


interface IHeader {
  title?: string;
}



const Header = ({ title }: IHeader) => {

  //const { signOut } = useAuth();

  const navigation = useNavigation();

  function signOut() {
    auth().signOut();
  }

  return (
    <S.Container>
      <S.WrapperExit onPress={() => navigation.navigate('PostProductScreen')}>
        <Feather name="plus" size={30} />
      </S.WrapperExit>
      <S.WrapperTitle>
        <S.Title>{title}</S.Title>
      </S.WrapperTitle>
      <S.WrapperIcon onPress={signOut} >
        <Feather name="log-out" size={30} />
      </S.WrapperIcon>
    </S.Container>
  );
};

export default Header;
