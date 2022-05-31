import React from 'react';
import { Image } from 'react-native';
import { Product } from '../../services/listResults';
import * as S from './ProductItem.style';

export function ProductItem({ name, price, image }: Product) {
    return (
        <>
            <S.ProductContainer>
                <Image style={{ width: 120, height: 100 }} source={image || { uri: 'https://criticalhits.com.br/wp-content/uploads/2022/05/one-piece-yamato.jpg' }} />
                <S.ContentContainer>
                    <S.DefaultTitle>{name}</S.DefaultTitle>
                    <S.DefaultDescription>Preço: </S.DefaultDescription>
                    <S.DefaultPrice>
                        R$ {price.toFixed(2)}
                    </S.DefaultPrice>
                </S.ContentContainer>
            </S.ProductContainer>
        </>
    );
}