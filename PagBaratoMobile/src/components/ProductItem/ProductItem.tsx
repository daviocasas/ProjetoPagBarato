import React from 'react';
import { Image } from 'react-native';
import { Product } from '../../services/listResults';
import * as S from './ProductItem.style';

export function ProductItem({ name, price, image }: Product) {
    return (
        <>
            <S.ProductContainer>
                <Image style={{ width: 120, height: 100 }} source={image} />
                <S.ContentContainer>
                    <S.DefaultTitle>{name}</S.DefaultTitle>
                    <S.DefaultDescription>Preço mais baixo: </S.DefaultDescription>
                    <S.DefaultPrice>
                        R$ {price}
                    </S.DefaultPrice>
                </S.ContentContainer>
            </S.ProductContainer>
        </>
    );
}