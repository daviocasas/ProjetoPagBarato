import { Dimensions } from 'react-native';

export const winWidth = Dimensions.get('window').width;
export const winHeight = Dimensions.get('window').height;
export const winFont = Dimensions.get('window').fontScale;

const guidelineBaseWidth = 350;

export const widthScale = (percentage: number) =>
  Dimensions.get('window').width * percentage;
export const heightScale = (percentage: number) =>
  Dimensions.get('window').height * percentage;
export const fontScale = (size: number) =>
  size * (winWidth / guidelineBaseWidth);
