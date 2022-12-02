import styled from 'styled-components/native';
import {color, font} from '../../config/theme.json';
import * as Dimension from '../../services/dimensionsService';

interface IProps {
  bold?: boolean;
  priceTrustingColor?: string;
}

export const ProductContainer = styled.View`
  padding: 4%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${color.cream};
`;

export const ContentContainer = styled.View`
  flex: 1;
`;

export const InlineContainer = styled.View`
  flex: 1;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DefaultTitle = styled.Text`
  font-weight: 900;
  color: ${color.black};
  font-family: ${font.light};
  font-size: ${Dimension.fontScale(14.5)}px;
`;

export const OpenProductIconButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  align-items: center;
  justify-content: center;
  background-color: ${color.secondary};
  padding: ${Dimension.widthScale(0.025)}px;
  border-radius: ${Dimension.widthScale(1)}px;
`;

export const DefaultDescription = styled.Text`
  color: ${color.black};
  font-size: ${Dimension.fontScale(11)}px;
`;

export const DefaultLabel = styled.Text`
  color: ${color.black};
  font-size: ${Dimension.fontScale(10.5)}px;
  font-weight: ${(props: IProps) => (props.bold ? '600' : '400')};
`;

export const DefaultPriceValue = styled.Text`
  font-weight: bold;
  color: ${color.mid_green};
  font-size: ${Dimension.fontScale(14.5)}px;
`;

export const BottomContentContainer = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${Dimension.widthScale(0.05)}px;
`;

export const RatingChipContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const PriceContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const RatingChip = styled.View`
  align-items: center;
  justify-content: center;
  width: ${Dimension.widthScale(0.21)}px;
  height: ${Dimension.heightScale(0.025)}px;
  border-radius: ${Dimension.widthScale(1)}px;
  background-color: ${(props: IProps) => props.priceTrustingColor};
`;

export const RatingChipText = styled.Text`
  font-weight: bold;
  color: ${color.cream};
  font-family: ${font.medium};
  font-size: ${Dimension.fontScale(11)}px;
`;
