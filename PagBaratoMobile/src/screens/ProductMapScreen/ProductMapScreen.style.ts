import styled from 'styled-components/native';

import {color, font} from '../../config/theme.json';
import * as Window from '../../services/dimensionsService';

export const WrapperContainer = styled.View`
  justify-content: flex-end;
`;

export const MarkerContainer = styled.View`
  background-color: ${color.primary};
  align-items: center;
  border-radius: 3px;
  border: 1px solid;
  border-color: ${color['mid-orange']};
  max-width: 120px;
`;

export const WrapperMarkerContent = styled.View`
  padding: 3%;
`;

export const EstablishmentTitle = styled.Text`
  font-family: ${font.bold};
  font-size: ${Window.fontScale(6)}px;
  color: ${color.cream};
  text-align: justify;
`;

export const ProductValue = styled.Text`
  font-family: ${font.semiBold};
  font-size: ${Window.fontScale(9)}px;
  color: ${color.cream};
  text-align: right;
`;
