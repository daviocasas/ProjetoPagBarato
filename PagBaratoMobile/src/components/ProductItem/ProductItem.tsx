import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {color} from '../../config/theme.json';

import * as S from './ProductItem.style';

export interface Product {
  id: string;
  name: string;
  establishment: string;
  price: number;
  isProductWithNearExpirationDate: boolean;
  onPress: () => void;
}

export function ProductItem({
  name,
  price,
  establishment,
  isProductWithNearExpirationDate,
  onPress,
}: Product) {
  return (
    <>
      <S.ProductContainer onPress={onPress}>
        <S.ContentContainer>
          <S.TitleContainer>
            <S.DefaultTitle>{name}</S.DefaultTitle>
            <Feather
              name="chevrons-right"
              size={20}
              color={color['mid-orange']}
            />
          </S.TitleContainer>

          <S.DefaultDescription>
            Estabelecimento: {establishment}
          </S.DefaultDescription>
          <S.DefaultDescription>
            Produto próximo da validade?{' '}
            {isProductWithNearExpirationDate ? 'SIM' : 'NÃO'}
          </S.DefaultDescription>
          <S.DefaultPrice>
            Menor preço:{' '}
            <S.DefaultPriceValue>
              R$ {price.toFixed(2).replace('.', ',')}
            </S.DefaultPriceValue>
          </S.DefaultPrice>
        </S.ContentContainer>
      </S.ProductContainer>
    </>
  );
}
