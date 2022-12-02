import styled from 'styled-components/native';
import {TextInput} from 'react-native';
import {color, font} from '../../config/theme.json';
import * as Dimension from '../../services/dimensionsService';
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
  border-width: ${Dimension.widthScale(0.002)}px;
  background-color: ${color.little_cream};
  border-radius: ${Dimension.widthScale(0.01)}px;
  margin-top: 3%;
`;

export const WrapperIcon = styled.View`
  justify-content: center;
  align-items: center;
  padding-left: ${Dimension.widthScale(0.03)}px;
  padding-right: ${Dimension.widthScale(0.02)}px;
`;

export const InputText = styled(TextInput).attrs({
  placeholderTextColor: color.baby_gray,
})`
  padding: 3%;
  color: ${color.dark_gray};
  background-color: transparent;
  width: ${Dimension.widthScale(0.9)}px;
  max-width: ${Dimension.widthScale(0.55)}px;
`;

export const WrapperButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  position: absolute;
  right: ${`${Dimension.widthScale(0.02)}px`};
  padding: ${`${Dimension.widthScale(0.01)}px`};
  bottom: ${`${Dimension.heightScale(0.0125)}px`};
`;
