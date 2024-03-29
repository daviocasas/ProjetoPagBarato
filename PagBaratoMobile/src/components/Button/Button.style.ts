import styled from 'styled-components/native';
import {color, font} from '../../config/theme.json';
import * as Dimension from '../../services/dimensionsService';

interface IProps {
  width?: number;
  disabled?: boolean;
}

export const ButtonContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${(props: IProps) =>
    props.width ? `${Dimension.widthScale(props.width)}px` : '100%'};
  align-items: center;
  justify-content: center;
  align-self: center;
  background-color: ${color.primary};
  border-radius: ${Dimension.widthScale(0.1)}px;
  elevation: 3;
  flex-direction: row;
  margin-top: ${Dimension.heightScale(0.02)}px; ;
`;

export const Title = styled.Text`
  font-family: ${font.semiBold};
  font-size: ${Dimension.fontScale(12)}px;
  color: ${color.cream};
  text-align: center;
  padding-vertical: 3.5%;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: color.cream,
})`
  padding-vertical: 3.5%;
`;
