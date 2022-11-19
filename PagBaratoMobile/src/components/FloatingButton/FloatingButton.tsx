import React from 'react';
import {StyleSheet} from 'react-native';

import {color} from '../../config/theme.json';

import * as S from './FloatingButton.style';

interface IFloatingButton {
  width: number;
  title: string;
  onPress: () => void;
  disabled?: any;
}

const FloatingButton = ({title, width, onPress, disabled}: IFloatingButton) => {
  return (
    <S.FloatingButtonContainer
      onPress={onPress}
      disabled={disabled}
      width={width}
      style={disabled ? styles.disabled : styles.enabled}>
      <S.Title>{disabled ? '' : title}</S.Title>
    </S.FloatingButtonContainer>
  );
};

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  enabled: {
    backgroundColor: `${color.primary}`,
  },
});

export default FloatingButton;
