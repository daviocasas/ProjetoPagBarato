import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { color, font } from '../../config/theme.json';
import * as Window from '../../services/dimensionsService';
import Mail from 'react-native-vector-icons/MaterialCommunityIcons';
import Lock from 'react-native-vector-icons/Feather';
import Eyes from 'react-native-vector-icons/Feather';
//import User from '../../assets/svg/home/ic_user.svg';

export const IconEye = styled(Eyes).attrs({
  size: 18,
  color: color.dark_gray,
})``;

export const IconLock = styled(Lock).attrs({
  name: 'lock',
  color: color.primary,
  size: 23,
})``;

export const IconMail = styled(Mail).attrs({
  name: 'email-outline',
  color: color.primary,
  size: 24,
})``;

/* export const IconUser = styled(User).attrs({
  width: Window.widthScale(0.05),
  height: Window.heightScale(0.05),
})``; */

export const Container = styled.View`
  flex-direction: row;
  position: relative;
  background-color: ${color.little_gray};
  border-radius: ${Window.widthScale(0.02)}px;
  margin-top: 5%;
`;

export const WrapperIcon = styled.View`
  justify-content: center;
  align-items: center;
  padding-left: ${Window.widthScale(0.03)}px;
  padding-right: ${Window.widthScale(0.02)}px;
`;

export const InputText = styled(TextInput).attrs({
  placeholderTextColor: color.dark_gray,
})`
  background-color: transparent;
  font-family: ${font.regular};
  padding: 3%;
  width: ${Window.widthScale(0.9)}px;
  color: ${color.dark_gray};
  max-width: ${Window.widthScale(0.55)}px;
`;

export const WrapperPassword = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  position: absolute;
  right: ${`${Window.widthScale(0.02)}px`};
  padding: ${`${Window.widthScale(0.01)}px`};
  bottom: ${`${Window.heightScale(0.0125)}px`};
`;
