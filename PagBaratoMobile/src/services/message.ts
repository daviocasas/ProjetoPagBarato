import SnackBar from 'react-native-snackbar';
import { font, color } from '@mobile/config/theme.json';

export const message = (messageNormal: string) =>
  SnackBar.show({
    text: messageNormal,
    duration: SnackBar.LENGTH_LONG,
    textColor: color.cream,
    backgroundColor: color.primary,
    fontFamily: font.medium,
  });

export const warning = (messageWarning: string) =>
  SnackBar.show({
    text: messageWarning,
    duration: SnackBar.LENGTH_LONG,
    textColor: color.cream,
    backgroundColor: color.primary,
    fontFamily: font.medium,
  });

export const error = (messageError: string) =>
  SnackBar.show({
    text: messageError,
    duration: SnackBar.LENGTH_LONG,
    textColor: color.cream,
    backgroundColor: color.primary,
    fontFamily: font.medium,
  });
