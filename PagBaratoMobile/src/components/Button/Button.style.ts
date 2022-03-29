import styled from 'styled-components/native';
import { color, font } from '../../config/theme.json';
import * as Window from '../../services/dimensionsService';

interface IProps {
  width?: number;
  disabled?: boolean;
}

export const ButtonContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${(props: IProps) =>
    props.width ? `${Window.widthScale(props.width)}px` : '100%'};
  align-items: center;
  justify-content: center;
  align-self: center;
  background-color: ${color.primary};
  border-radius: ${Window.widthScale(0.03)}px;
  elevation: 5;
  flex-direction: row;
  margin-top: ${Window.heightScale(0.03)}px;;
`;

export const Title = styled.Text`
  font-family: ${font.medium};
  font-size: ${Window.fontScale(16)}px;
  color: ${color.cream};
  text-align: center;
  padding-vertical: 5%;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: color.cream,
})`
  padding-vertical: 5%;
`;