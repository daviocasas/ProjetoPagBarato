import React from 'react';
import * as S from './ItemBox.style'

interface IItemBox {
    title: string;
    price: number;
    location: string;
}

const ItemBox = ({ title, price, location }: IItemBox) => {
    return (
        <S.ItemContainer>
            <S.TextContainer>
                <S.Title>{title}</S.Title>
                <S.Location>{location}</S.Location>
            </S.TextContainer>
            <S.NumberContainer>
                <S.Price>R$ {price}</S.Price>
            </S.NumberContainer>
        </S.ItemContainer>
    );
};

export default ItemBox;
