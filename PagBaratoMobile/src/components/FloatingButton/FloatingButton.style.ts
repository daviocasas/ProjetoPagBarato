import styled from 'styled-components/native';
import {color, font} from '../../config/theme.json';
import * as Dimension from '../../services/dimensionsService';

interface IProps {
  width?: number;
  disabled?: boolean;
}

export const FloatingButtonContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${(props: IProps) =>
    props.width ? `${Dimension.widthScale(props.width)}px` : '32px'};
  height: ${(props: IProps) =>
    props.width ? `${Dimension.widthScale(props.width)}px` : '32px'};
  position: absolute;
  align-items: center;
  justify-content: center;
  top: ${(props: IProps) =>
    props.width ? `${Dimension.heightScale(0.815)}px` : '550px'};
  right: 30px;
  background-color: ${color.primary};
  border-radius: ${Dimension.widthScale(1)}px;
  elevation: 4;
`;

export const FloatingButtonTitle = styled.Text`
  font-family: ${font.bold};
  font-size: ${Dimension.fontScale(14)}px;
  color: ${color.cream};
  text-align: center;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: color.cream,
})`
  padding-vertical: 5%;
`;
