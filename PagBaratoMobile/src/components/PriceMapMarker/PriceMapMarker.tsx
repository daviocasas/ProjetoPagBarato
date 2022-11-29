import React, {FunctionComponent} from 'react';

import {TrustingMap, TrustingType} from '../../enum/price';

import * as S from './PriceMapMarker.style';

export interface PriceMapMarker {
  price?: number;
  establishment: any;
  isLowestPrice?: boolean;
  trustingFactor: TrustingType;
}

export const PriceMapMarker: FunctionComponent<PriceMapMarker> = ({
  price,
  isLowestPrice,
  establishment,
  trustingFactor,
}) => {
  const {value: priceTrustingFactor, color: priceTrustingColor} =
    TrustingMap[trustingFactor];

  return (
    <S.MainContainer>
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
};
