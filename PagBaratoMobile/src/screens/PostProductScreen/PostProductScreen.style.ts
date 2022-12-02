import styled from 'styled-components/native';

import {color, font} from '../../config/theme.json';
import * as Dimension from '../../services/dimensionsService';

interface IProps {
  bold?: boolean;
  link?: boolean;
}

export const WrapperLogo = styled.View`
  width: ${Dimension.widthScale(1)}px;
  height: ${Dimension.heightScale(0.3)}px;
  justify-content: center;
  align-items: center;
`;

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

export const TextSwitch = styled.Text`
  font-family: ${font.medium};
  font-size: ${(props: IProps) =>
    props.bold ? `${Dimension.fontScale(22)}px` : `${Dimension.fontScale(10)}px`};
  text-decoration: ${(props: IProps) => (props.link ? 'underline' : 'none')};
  text-align: center;
  font-weight: ${(props: IProps) => (props.bold ? 800 : 400)};
  padding-vertical: ${(props: IProps) =>
    props.bold
      ? `${Dimension.heightScale(0.05)}px`
      : `${Dimension.heightScale(0.025)}px`};
  color: ${(props: IProps) => (props.link ? color.dark_gray : color.black)};
`;

export const MainContainer = styled.View`
  justify-content: center;
  width: ${Dimension.widthScale(1)}px;
  height: ${Dimension.heightScale(0.7)}px;
  background-color: ${color.cream};
  border-top-left-radius: ${Dimension.widthScale(0.1)}px;
  border-top-right-radius: ${Dimension.widthScale(0.1)}px;
`;

export const WrapperForm = styled.View`
  width: ${Dimension.widthScale(0.8)}px;
  align-self: center;
  flex-direction: column;
  justify-content: center;
`;

export const WrapperSelectBox = styled.View`
  width: ${Dimension.widthScale(0.8)}px;
  align-self: center;
  flex-direction: column;
  justify-content: center;
  padding-top: ${Dimension.widthScale(0.02)}px;
`;

export const WrapperSwitchSelector = styled.View`
  width: ${Dimension.widthScale(0.8)}px;
  align-self: center;
  flex-direction: column;
  justify-content: center;
  padding: ${Dimension.heightScale(0.02)}px;
`;

export const WrapperSwitchForm = styled.View`
  flex-direction: row;
`;

export const WrapperSwitchFormButton = styled.View`
  background-color: red;
`;

export const WrapperLink = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  padding-left: ${Dimension.heightScale(0.02)}px;
  padding-right: ${Dimension.heightScale(0.02)}px;
`;
