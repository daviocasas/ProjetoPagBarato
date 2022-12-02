import styled from 'styled-components/native';

import {color, font} from '../../config/theme.json';
import * as Dimension from '../../services/dimensionsService';
import Feather from 'react-native-vector-icons/Feather';

interface IProps {
  thumbsIconName?: string;
  thumbsIconSize?: number;
  isLowestPrice?: boolean;
  priceTrustingColor?: string;
}

export const WrapperContainer = styled.View`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  align-items: center;
  justify-content: flex-end;
`;

export const TransparentContainer = styled.View`
  flex-direction: row;
  background-color: transparent;
  margin-vertical: ${Dimension.widthScale(0.055)}px;
`;

export const Bubble = styled.View`
  background-color: ${color.dark_gray};
  padding-horizontal: ${Dimension.widthScale(0.035)}px;
  padding-vertical: ${Dimension.widthScale(0.02)}px;
  border-radius: ${Dimension.widthScale(0.06)}px;
`;

export const BubbleText = styled.Text`
  font-size: ${Dimension.fontScale(11.5)}px;
  font-family: ${font.semiBold};
  color: ${color.cream};
`;

export const ThumbsText = styled.Text`
  color: ${color.black};
  font-family: ${font.medium};
  background-color: ${color.cream}60;
  font-size: ${Dimension.fontScale(10)}px;
  border-top-left-radius: ${Dimension.widthScale(1)}px;
  border-top-right-radius: ${Dimension.widthScale(1)}px;
`;

export const ThumbsMainContainer = styled.View`
  border-width: 2px;
  height: ${Dimension.heightScale(0.05)}px;
  border-radius: ${Dimension.widthScale(1)}px;
  margin-bottom: ${Dimension.widthScale(0.01)}px;
  border-color: ${(props: IProps) =>
    props.isLowestPrice ? color.mid_green : color.mid_orange};
  background-color: ${(props: IProps) =>
    props.isLowestPrice ? color.secondary : color.primary};
`;

export const InlineThumbsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-self: flex-start;
  justify-content: space-between;
`;

export const ThumbsIconButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding: ${Dimension.widthScale(0.02)}px;
  background-color: ${(props: IProps) =>
    props.isLowestPrice ? color.secondary : color.primary};
  border-radius: ${Dimension.widthScale(1)}px;
`;

export const ThumbsIcon = styled(Feather).attrs(({size, name, color}) => ({
  name,
  color,
  size,
}))`
  animation: all 0.2s ease-in-out;
`;
