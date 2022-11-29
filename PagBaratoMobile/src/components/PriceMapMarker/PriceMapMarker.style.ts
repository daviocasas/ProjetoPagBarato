import styled from 'styled-components/native';

import {color, font} from '../../config/theme.json';
import * as Dimension from '../../services/dimensionsService';

interface IProps {
  isLowestPrice?: boolean;
  priceTrustingColor?: string;
}

export const MainContainer = styled.View`
  flex: 1;
`;

export const MarkerContainer = styled.View`
  flex: 1;
  max-width: 180px;
  background-color: ${(props: IProps) =>
    props.isLowestPrice ? color.secondary : color.primary};
  align-items: center;
  border-radius: 2px;
  border: 2px solid;
  border-color: ${(props: IProps) =>
    props.isLowestPrice ? color.mid_green : color.mid_orange};
  margin-bottom: ${Dimension.widthScale(0.01)}px;
`;

export const WrapperMarkerContent = styled.View`
  padding: ${Dimension.widthScale(0.01)}px;
`;

export const EstablishmentTitle = styled.Text`
  font-family: ${font.medium};
  font-size: ${Dimension.fontScale(9)}px;
  color: ${color.cream};
  text-align: justify;
`;

export const ProductValue = styled.Text`
  font-family: ${font.semiBold};
  font-size: ${Dimension.fontScale(11)}px;
  color: ${color.cream};
  text-align: right;
`;

export const PriceTrustingContainer = styled.View`
  flex: 1;
  top: 2px;
  width: 105%;
  height: 15px;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: ${Dimension.widthScale(0.02)}px;
  background-color: ${(props: IProps) => props.priceTrustingColor};
`;

export const PriceTrustingText = styled.Text`
  text-align: left;
  font-family: ${font.semiBold};
  font-size: ${Dimension.fontScale(8)}px;
  color: ${color.cream};
`;

export const InlineThumbsContainer = styled.View`
  flex: 1;
  align-self: flex-end;
  flex-direction: row;
  justify-content: space-between;
`;

export const ThumbsIconButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  margin: ${Dimension.widthScale(0.01)}px;
  padding: ${Dimension.widthScale(0.02)}px;
  background-color: ${(props: IProps) =>
    props.isLowestPrice ? color.secondary : color.primary};
  border-radius: ${Dimension.widthScale(1)}px;
`;
