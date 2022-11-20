import styled from 'styled-components/native';

import {color, font} from '../../config/theme.json';
import * as Dimension from '../../services/dimensionsService';

export const WrapperContainer = styled.View`
  justify-content: flex-end;
`;

export const MarkerContainer = styled.View`
  flex: 1;
  background-color: ${color.primary};
  align-items: center;
  border-radius: 3px;
  border: 1px solid;
  border-color: ${color.mid_orange};
  max-width: 140px;
`;

export const WrapperMarkerContent = styled.View`
  padding: ${Dimension.widthScale(0.01)}px;
`;

export const EstablishmentTitle = styled.Text`
  font-family: ${font.semiBold};
  font-size: ${Dimension.fontScale(7)}px;
  color: ${color.cream};
  text-align: justify;
`;

export const ProductValue = styled.Text`
  font-family: ${font.bold};
  font-size: ${Dimension.fontScale(9)}px;
  color: ${color.cream};
  text-align: right;
`;
