import React, {useState} from 'react';
import {font} from '../../config/theme.json';
import {InputType} from '../../enum/inputType';
import * as S from './Input.style';

interface IInput {
  value: string;
  placeholder: string;
  onChangeText?: (value: string) => void;
  type?: any;
  readOnly?: boolean;
  password?: boolean;
  disabled?: boolean;
  maxLength?: number;
  endButton?: boolean;
  endButtonIcon?: any;
  endButtonAction?: () => void;
  autoCapitalized?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search';
}

const Input = ({
  value,
  placeholder,
  onChangeText,
  password,
  endButton,
  endButtonIcon,
  endButtonAction,
  disabled,
  maxLength,
  autoCapitalized,
  keyboardType,
  type,
}: IInput) => {
  const [showPassword, setShowPassword] = useState(false);

  const getTypeInput = (typeIcon: number) => {
    switch (typeIcon) {
      case InputType.EMAIL:
        return <S.IconMail />;
      case InputType.PASSWORD:
        return <S.IconLock />;
      default:
        break;
    }
  };

  return (
    <S.Container>
      <S.WrapperIcon>{getTypeInput(type)}</S.WrapperIcon>
      <S.InputText
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={password && !showPassword}
        autoCapitalize={autoCapitalized}
        keyboardType={keyboardType}
        editable={!disabled}
        maxLength={maxLength}
        ref={ref =>
          ref && ref.setNativeProps({style: {fontFamily: font.regular}})
        }
      />

      {endButton && (
        <S.WrapperButton onPress={endButtonAction}>
          {endButtonIcon}
        </S.WrapperButton>
      )}

      {password && (
        <S.WrapperButton onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <S.IconEye name="eye" />
          ) : (
            <S.IconEye name="eye-off" />
          )}
        </S.WrapperButton>
      )}
    </S.Container>
  );
};

export default Input;
