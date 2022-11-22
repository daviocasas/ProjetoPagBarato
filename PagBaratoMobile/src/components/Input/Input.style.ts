import styled from 'styled-components/native';
import {TextInput} from 'react-native';
import {color, font} from '../../config/theme.json';
import * as Window from '../../services/dimensionsService';
import Mail from 'react-native-vector-icons/MaterialCommunityIcons';
import Lock from 'react-native-vector-icons/Feather';
import Eyes from 'react-native-vector-icons/Feather';

export const IconEye = styled(Eyes).attrs({
  size: 18,
  color: color.dark_gray,
})``;

export const IconLock = styled(Lock).attrs({
  name: 'lock',
  color: color.mid_green,
  size: 23,
})``;

export const IconMail = styled(Mail).attrs({
  name: 'email-outline',
  color: color.mid_green,
  size: 24,
})``;

export const Container = styled.View`
  flex-direction: row;
  position: relative;
  border-color: ${color.little_gray};
  border-width: ${Window.widthScale(0.002)}px;
  background-color: ${color.little_cream};
  border-radius: ${Window.widthScale(0.01)}px;
  margin-top: 3%;
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

export const WrapperButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  position: absolute;
  right: ${`${Window.widthScale(0.02)}px`};
  padding: ${`${Window.widthScale(0.01)}px`};
  bottom: ${`${Window.heightScale(0.0125)}px`};
`;
