import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {color} from '../../config/theme.json';
import {PriceType, TrustingMap, TrustingType} from '../../enum/price';
import {ProductUnitAbbrevMap, ProductUnitType} from '../../enum/product';

import * as S from './ProductItem.style';

Feather.loadFont();

export interface Product {
  id: string;
  name: string;
  unit: ProductUnitType;
  lowestPrice: number;
  lowestPriceEstablishment: string;
  lowestPriceTrustingFactor: TrustingType;
  isProductWithNearExpirationDate: boolean;
  onPress: () => void;
}

export function ProductItem({
  name,
  unit,
  lowestPrice,
  lowestPriceEstablishment,
  lowestPriceTrustingFactor,
  isProductWithNearExpirationDate,
  onPress,
}: Product) {
  const {value: priceTrustingFactor, color: priceTrustingColor} =
    TrustingMap[lowestPriceTrustingFactor];

  return (
    <>
      <S.ProductContainer>
        <S.ContentContainer>
          <S.InlineContainer>
            <S.DefaultTitle>{name}</S.DefaultTitle>
            <S.OpenProductIconButton onPress={onPress}>
              <Feather name="map-pin" size={14} color={color.cream} />
            </S.OpenProductIconButton>
          </S.InlineContainer>

          <S.DefaultDescription>
            Em: {lowestPriceEstablishment}
          </S.DefaultDescription>
          <S.DefaultDescription>
            Produto próx. da validade?{' '}
            <Feather
              name={isProductWithNearExpirationDate ? 'check' : 'x'}
              size={14}
              color={color.black}
            />
          </S.DefaultDescription>

          <S.BottomContentContainer>
            <S.RatingChipContainer>
              <S.DefaultLabel>Confiabilidade: </S.DefaultLabel>
              <S.RatingChip priceTrustingColor={priceTrustingColor}>
                <S.RatingChipText>{priceTrustingFactor}</S.RatingChipText>
              </S.RatingChip>
            </S.RatingChipContainer>

            <S.PriceContainer>
              <S.DefaultLabel bold>
                Menor preço:{' '}
                <S.DefaultPriceValue>
                  R$ {lowestPrice.toFixed(2).replace('.', ',')}
                </S.DefaultPriceValue>
                /{ProductUnitAbbrevMap[unit]}
              </S.DefaultLabel>
            </S.PriceContainer>
          </S.BottomContentContainer>
        </S.ContentContainer>
      </S.ProductContainer>
    </>
  );
}
