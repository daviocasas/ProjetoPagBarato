import styled from 'styled-components/native';

import { color, font } from '../../config/theme.json';
import * as Window from '../../services/dimensionsService';

export const WrapperContainer = styled.View`
  justify-content: flex-end;
`;

export const MarkerContainer = styled.View`
  background-color: #FC7A3E;
  align-items: center;
  border-radius: 10px;
  border: 1px solid;
  border-color: ${color.primary};
`;

export const WrapperMarkerContent = styled.View`
  padding: 2%;
`;

export const EstablishmentTitle = styled.Text`
font-family: ${font.semiBold};
  font-size: ${Window.fontScale(8)}px;
  color: ${color.cream};
  text-align: center;
`;

export const ProductValue = styled.Text`
font-family: ${font.semiBold};
  font-size: ${Window.fontScale(12)}px;
  color: ${color.cream};
  text-align: center;
`;
