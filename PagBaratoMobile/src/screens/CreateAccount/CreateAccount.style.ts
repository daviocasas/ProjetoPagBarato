import styled from 'styled-components/native';

import {color, font} from '../../config/theme.json';
import * as Dimension from '../../services/dimensionsService';

interface IProps {
  bold?: boolean;
  link?: boolean;
}

export const TitleText = styled.Text`
  font-family: ${font.regular};
  font-size: ${(props: IProps) =>
    props.bold ? `${Dimension.fontScale(22)}px` : `${Dimension.fontScale(16)}px`};
  text-decoration: ${(props: IProps) => (props.link ? 'underline' : 'none')};
  text-align: left;
  font-weight: ${(props: IProps) => (props.bold ? 700 : 400)};
  padding-horizontal: ${(props: IProps) =>
    props.bold
      ? `${Dimension.heightScale(0.05)}px`
      : `${Dimension.heightScale(0.025)}px`};
  color: ${color.black};
`;

export const DescriptionText = styled.Text`
  font-weight: bold;
  color: ${color.primary};
  font-family: ${font.light};
  font-size: ${Dimension.fontScale(10)}px;
  padding-bottom: ${Dimension.heightScale(0.025)}px;
  padding-horizontal: ${Dimension.heightScale(0.05)}px;
`;

export const MainContainer = styled.View`
  justify-content: center;
  width: ${Dimension.widthScale(1)}px;
  background-color: ${color.cream};
  height: ${Dimension.heightScale(0.7)}px;
  border-top-left-radius: ${Dimension.widthScale(0.1)}px;
  border-top-right-radius: ${Dimension.widthScale(0.1)}px;
`;

export const WrapperForm = styled.View`
  align-self: center;
  flex-direction: column;
  justify-content: center;
  width: ${Dimension.widthScale(0.8)}px;
  padding-bottom: ${Dimension.heightScale(0.02)}px;
`;

export const WrapperLink = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;
