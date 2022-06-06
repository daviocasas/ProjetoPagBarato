import React from 'react';
import { Image, ImageProps } from 'react-native';
import * as S from './ProductItem.style';

export interface Product {
    id: string;
    name: string;
    establishment: string;
    price: number;
    image: ImageProps["source"];
}

export function ProductItem({ name, price, establishment, image }: Product) {
    return (
        <>
            <S.ProductContainer>
                <Image style={{ width: 120, height: 100 }} source={image || { uri: 'https://criticalhits.com.br/wp-content/uploads/2022/05/one-piece-yamato.jpg' }} />
                <S.ContentContainer>
                    <S.DefaultTitle>{name}</S.DefaultTitle>
                    <S.DefaultDescription>Estabelecimento: {establishment}</S.DefaultDescription>
                    <S.DefaultDescription>Preço mais baixo encontrado: </S.DefaultDescription>
                    <S.DefaultPrice>
                        R$ {price.toFixed(2)}
                    </S.DefaultPrice>
                </S.ContentContainer>
            </S.ProductContainer>
        </>
    );
}