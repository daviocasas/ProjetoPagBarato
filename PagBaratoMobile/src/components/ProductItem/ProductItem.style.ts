import styled from 'styled-components/native';
import {color, font} from '../../config/theme.json';
import * as Dimension from '../../services/dimensionsService';

export const ProductContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
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
  flex-direction: row;
  justify-content: space-between;
`;

export const DefaultTitle = styled.Text`
  font-family: ${font.medium};
  font-size: 18px;
  font-weight: bold;
  color: ${color.black};
  margin-bottom: 8px;
`;

export const DefaultDescription = styled.Text`
  font-size: 12px;
  color: ${color.black};
`;

export const DefaultPrice = styled.Text`
  padding-top: ${Dimension.widthScale(0.04)}px;
  text-align: right;
  font-size: 12px;
  font-weight: 500;
  color: ${color.black};
`;

export const DefaultPriceValue = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${color.mid_green};
`;

export const RatingChip = styled.View`
  margin-top: ${Dimension.widthScale(0.01)}px;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 15px;
  background-color: ${color.secondary};
  border-radius: ${Dimension.widthScale(1)}px;
`;

export const RatingChipText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${color.cream};
  font-family: ${font.medium};
`;
