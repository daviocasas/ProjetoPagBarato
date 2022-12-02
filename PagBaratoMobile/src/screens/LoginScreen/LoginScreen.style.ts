import styled from 'styled-components/native';

import {color, font} from '../../config/theme.json';
import * as Dimension from '../../services/dimensionsService';

interface IProps {
  bold?: boolean;
  link?: boolean;
}

export const LogoContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const WrapperLogo = styled.View`
  width: ${Dimension.widthScale(1)}px;
  height: ${Dimension.heightScale(0.3)}px;
  justify-content: center;
  align-items: center;
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
  align-self: center;
  flex-direction: column;
  justify-content: center;
  width: ${Dimension.widthScale(0.8)}px;
  padding-bottom: ${Dimension.heightScale(0.01)}px;
`;

export const WrapperLink = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  padding-left: ${Dimension.heightScale(0.02)}px;
  padding-right: ${Dimension.heightScale(0.02)}px;
`;

export const WrapperFormLink = styled.View`
  width: ${Dimension.widthScale(0.54)}px;
  align-self: flex-end;
  flex-direction: row;
  justify-content: center;
`;

export const TextButtonLink = styled.Text`
  font-family: ${font.semiBold};
  font-size: ${(props: IProps) =>
    props.bold ? `${Dimension.fontScale(20)}px` : `${Dimension.fontScale(12)}px`};
  text-decoration: ${(props: IProps) => (props.link ? 'underline' : 'none')};
  text-align: center;
  font-weight: ${(props: IProps) => (props.bold ? 700 : 400)};
  padding-vertical: ${(props: IProps) =>
    props.bold
      ? `${Dimension.heightScale(0.05)}px`
      : `${Dimension.heightScale(0.025)}px`};
  color: ${color.dark_gray};
`;
