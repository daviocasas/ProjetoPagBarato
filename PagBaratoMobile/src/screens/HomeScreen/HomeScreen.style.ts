import styled from 'styled-components/native';

import {font} from '../../config/theme.json';
import * as Dimension from '../../services/dimensionsService';

interface IProps {
  bold?: boolean;
  link?: boolean;
}

export const EmptyStateContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: ${Dimension.widthScale(0.9)}px;
  height: ${Dimension.heightScale(0.6)}px;
`;

export const EmptyStateText = styled.Text`
  font-family: ${font.medium};
  font-size: ${(props: IProps) =>
    props.bold
      ? `${Dimension.fontScale(14)}px`
      : `${Dimension.fontScale(10)}px`};
`;
