import styled from 'styled-components/native';

import {color, font} from '../../config/theme.json';
import * as Window from '../../services/dimensionsService';

interface IProps {
  bold?: boolean;
  link?: boolean;
}

export const WrapperLogo = styled.View`
  width: ${Window.widthScale(1)}px;
  height: ${Window.heightScale(0.3)}px;
  justify-content: center;
  align-items: center;
`;

export const TitleText = styled.Text`
  font-family: ${font.regular};
  font-size: ${(props: IProps) =>
    props.bold ? `${Window.fontScale(18)}px` : `${Window.fontScale(14)}px`};
  text-decoration: ${(props: IProps) => (props.link ? 'underline' : 'none')};
  text-align: left;
  font-weight: ${(props: IProps) => (props.bold ? 700 : 400)};
  padding-horizontal: ${(props: IProps) =>
    props.bold
      ? `${Window.heightScale(0.05)}px`
      : `${Window.heightScale(0.025)}px`};
  color: ${color.black};
`;

export const DescriptionText = styled.Text`
  font-weight: 400;
  color: ${color.primary};
  font-family: ${font.regular};
  font-size: ${Window.fontScale(9)}px;
  padding-bottom: ${Window.heightScale(0.025)}px;
  padding-horizontal: ${Window.heightScale(0.05)}px;
`;

export const SubContainer = styled.View`
  justify-content: center;
  width: ${Window.widthScale(1)}px;
  background-color: ${color.cream};
  height: ${Window.heightScale(0.7)}px;
  border-top-left-radius: ${Window.widthScale(0.1)}px;
  border-top-right-radius: ${Window.widthScale(0.1)}px;
`;

export const WrapperForm = styled.View`
  align-self: center;
  flex-direction: column;
  justify-content: center;
  width: ${Window.widthScale(0.8)}px;
  padding-bottom: ${Window.heightScale(0.02)}px;
`;

export const WrapperLink = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;
