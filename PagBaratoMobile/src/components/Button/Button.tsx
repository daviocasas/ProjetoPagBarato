import React from 'react';
import * as S from './Button.style';

interface IButton {
    width: number;
    title: string;
    onPress: () => void;
    disabled?: any;
}

const Button = ({ title, width, onPress, disabled }: IButton) => {
    return (
        <S.ButtonContainer onPress={onPress} disabled={disabled} width={width}>
            {disabled ? (
                <S.Title></S.Title>
            ) : (
                <S.Title>{title}</S.Title>
            )}
        </S.ButtonContainer>
    );
};

export default Button;
