import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

import {color} from '../../config/theme.json';
import {TrustingMap, TrustingType} from '../../enum/price';

import * as S from './PriceMapMarker.style';

export interface PriceMapMarker {
  price?: number;
  establishment: any;
  isLowestPrice?: boolean;
  trustingFactor: TrustingType;
}

export function PriceMapMarker({
  price,
  isLowestPrice,
  establishment,
  trustingFactor,
}: PriceMapMarker) {
  const {value: priceTrustingFactor, color: priceTrustingColor} =
    TrustingMap[trustingFactor];

  const handleClick = event => {
    event.preventDefault();
    console.log('Entrou');
  };

  return (
    <S.MainContainer>
      <S.InlineThumbsContainer>
        <S.ThumbsIconButton
          isLowestPrice={isLowestPrice}
          onPress={event => handleClick(event)}>
          <Feather size={14} name="thumbs-up" color={color.cream} />
        </S.ThumbsIconButton>
        <S.ThumbsIconButton
          isLowestPrice={isLowestPrice}
          onPress={event => handleClick(event)}>
          <Feather size={14} name="thumbs-down" color={color.cream} />
        </S.ThumbsIconButton>
      </S.InlineThumbsContainer>

      <S.MarkerContainer isLowestPrice={isLowestPrice}>
        <S.WrapperMarkerContent>
          <S.EstablishmentTitle>
            {establishment.name || ''}
          </S.EstablishmentTitle>
          <S.ProductValue>
            {price
              ? `R$ ${Number(String(price)).toFixed(2).replace('.', ',')}`
              : 'FREE'}
          </S.ProductValue>
        </S.WrapperMarkerContent>
        <S.PriceTrustingContainer priceTrustingColor={priceTrustingColor}>
          <S.PriceTrustingText>Confiabilidade: </S.PriceTrustingText>
          <S.PriceTrustingText>{priceTrustingFactor}</S.PriceTrustingText>
        </S.PriceTrustingContainer>
      </S.MarkerContainer>
    </S.MainContainer>
  );
}
