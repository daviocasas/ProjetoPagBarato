import React from 'react';
import { StyleSheet } from "react-native";

import { color } from '../../config/theme.json';

import * as S from './Button.style';

interface IButton {
    width: number;
    title: string;
    onPress: () => void;
    disabled?: any;
}

const Button = ({ title, width, onPress, disabled }: IButton) => {
    return (
        <S.ButtonContainer
            onPress={onPress}
            disabled={disabled}
            width={width}
            style={disabled ? styles.disabled : styles.enabled}
        >
            <S.Title>{disabled ? '' : title}</S.Title>
        </S.ButtonContainer>
    );
};

const styles = StyleSheet.create({
    disabled: {
        backgroundColor: "transparent",
        elevation: 0,
    },
    enabled: {
        backgroundColor: `${color.primary}`,
    },
});

export default Button;
