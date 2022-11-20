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
    props.width ? `${Window.widthScale(props.width)}px` : '100%'};
  height: ${(props: IProps) =>
    props.width ? `${Window.heightScale(props.width)}px` : '100%'};
  position: absolute;
  align-items: center;
  justify-content: center;
  top: 400;
  right: 20;
  background-color: ${color.secondary};
  border-radius: ${Window.widthScale(0.03)}px;
  elevation: 3;
`;

export const Title = styled.Text`
  font-family: ${font.semiBold};
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
