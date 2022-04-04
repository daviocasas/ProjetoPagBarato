import styled from 'styled-components/native';
import { color, font } from '../../config/theme.json';
import * as Dimension from '../../services/dimensionsService';

export const Container = styled.View`
  background-color: ${color.primary};
  padding-top: ${Dimension.widthScale(0.05)}px;
  padding-bottom: ${Dimension.widthScale(0.02)}px;
  width: ${Dimension.widthScale(1)}px;
  flex-direction: row;
`;

export const WrapperIcon = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${Dimension.widthScale(0.2)}px;
  justify-content: center;
  align-items: center;
`;

export const WrapperExit = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${Dimension.widthScale(0.2)}px;
  justify-content: center;
  align-items: center;
`;

export const WrapperTitle = styled.View`
  width: ${Dimension.widthScale(0.6)}px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${font.bold};
  font-size: ${Dimension.fontScale(14)}px;
  color: ${color.cream};
  text-align: center;
`;

