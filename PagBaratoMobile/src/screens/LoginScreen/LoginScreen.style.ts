import styled from 'styled-components/native';

import {color, font} from '../../config/theme.json';
import * as Window from '../../services/dimensionsService';

interface IProps {
  bold?: boolean;
  link?: boolean;
}

export const LogoContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const WrapperLogo = styled.View`
  width: ${Window.widthScale(1)}px;
  height: ${Window.heightScale(0.3)}px;
  justify-content: center;
  align-items: center;
`;

export const SubContainer = styled.View`
  justify-content: center;
  width: ${Window.widthScale(1)}px;
  height: ${Window.heightScale(0.7)}px;
  background-color: ${color.cream};
  border-top-left-radius: ${Window.widthScale(0.1)}px;
  border-top-right-radius: ${Window.widthScale(0.1)}px;
`;

export const WrapperForm = styled.View`
  align-self: center;
  flex-direction: column;
  justify-content: center;
  width: ${Window.widthScale(0.8)}px;
  padding-bottom: ${Window.heightScale(0.01)}px;
`;

export const WrapperLink = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  padding-left: ${Window.heightScale(0.02)}px;
  padding-right: ${Window.heightScale(0.02)}px;
`;

export const WrapperFormLink = styled.View`
  width: ${Window.widthScale(0.5)}px;
  align-self: flex-end;
  flex-direction: row;
  justify-content: center;
`;

export const TextButtonLink = styled.Text`
  font-family: ${font.semiBold};
  font-size: ${(props: IProps) =>
    props.bold ? `${Window.fontScale(20)}px` : `${Window.fontScale(12)}px`};
  text-decoration: ${(props: IProps) => (props.link ? 'underline' : 'none')};
  text-align: center;
  font-weight: ${(props: IProps) => (props.bold ? 700 : 400)};
  padding-vertical: ${(props: IProps) =>
    props.bold
      ? `${Window.heightScale(0.05)}px`
      : `${Window.heightScale(0.025)}px`};
  color: ${color.dark_gray};
`;
