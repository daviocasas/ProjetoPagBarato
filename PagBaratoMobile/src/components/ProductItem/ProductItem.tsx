import React from 'react';
import {Image, ImageProps} from 'react-native';

import * as S from './ProductItem.style';

export interface Product {
  id: string;
  name: string;
  establishment: string;
  price: number;
  image: ImageProps['source'];
  isProductWithNearExpirationDate: boolean;
  onPress: () => void;
}

export function ProductItem({
  name,
  price,
  establishment,
  image,
  isProductWithNearExpirationDate,
  onPress,
}: Product) {
  return (
    <>
      <S.ProductContainer onPress={onPress}>
        <Image
          style={{width: 120, height: 100}}
          source={
            image || {
              uri: 'https://cdn-icons-png.flaticon.com/512/2424/2424721.png',
            }
          }
        />
        <S.ContentContainer>
          <S.DefaultTitle>{name}</S.DefaultTitle>
          <S.DefaultDescription>
            Estabelecimento: {establishment}
          </S.DefaultDescription>
          <S.DefaultDescription>
            Produto próximo da validade? {isProductWithNearExpirationDate}
          </S.DefaultDescription>
          <S.DefaultDescription>
            Preço mais baixo encontrado:{' '}
          </S.DefaultDescription>
          <S.DefaultPrice>R$ {price.toFixed(2)}</S.DefaultPrice>
        </S.ContentContainer>
      </S.ProductContainer>
    </>
  );
}
