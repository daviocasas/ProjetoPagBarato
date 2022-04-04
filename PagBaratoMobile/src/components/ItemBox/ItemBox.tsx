import React from 'react';
import * as S from './ItemBox.style'

interface IItemBox {
    title: string;
    price: number;
}

const ItemBox = ({ title, price }: IItemBox) => {
    return (
        <S.ItemContainer>
            <S.TextContainer>
                <S.Title>{title}</S.Title>
            </S.TextContainer>
            <S.NumberContainer>
                <S.Price>R$ {price}</S.Price>
            </S.NumberContainer>
        </S.ItemContainer>
    );
};

export default ItemBox;
