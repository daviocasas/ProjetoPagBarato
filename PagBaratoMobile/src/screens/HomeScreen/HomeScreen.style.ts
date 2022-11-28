import styled from 'styled-components/native';

import {font} from '../../config/theme.json';
import * as Window from '../../services/dimensionsService';

interface IProps {
  bold?: boolean;
  link?: boolean;
}

export const EmptyStateContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: ${Window.widthScale(0.9)}px;
  height: ${Window.heightScale(0.6)}px;
`;

export const EmptyStateText = styled.Text`
  font-family: ${font.medium};
  font-size: ${(props: IProps) =>
    props.bold ? `${Window.fontScale(14)}px` : `${Window.fontScale(10)}px`};
`;
