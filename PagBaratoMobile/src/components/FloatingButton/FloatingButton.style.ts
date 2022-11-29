import styled from 'styled-components/native';
import {color, font} from '../../config/theme.json';
import * as Window from '../../services/dimensionsService';

interface IProps {
  width?: number;
  disabled?: boolean;
}

export const FloatingButtonContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${(props: IProps) =>
    props.width ? `${Window.widthScale(props.width)}px` : '32px'};
  height: ${(props: IProps) =>
    props.width ? `${Window.widthScale(props.width)}px` : '32px'};
  position: absolute;
  align-items: center;
  justify-content: center;
  top: ${(props: IProps) =>
    props.width ? `${Window.heightScale(0.85)}px` : '600px'};
  right: 20px;
  background-color: ${color.primary};
  border-radius: ${Window.widthScale(1)}px;
  elevation: 4;
`;

export const FloatingButtonTitle = styled.Text`
  font-family: ${font.bold};
  font-size: ${Window.fontScale(14)}px;
  color: ${color.cream};
  text-align: center;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: color.cream,
})`
  padding-vertical: 5%;
`;
