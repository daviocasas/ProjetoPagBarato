import React from 'react';
import { Image } from 'react-native';



import * as S from './SplashScreen.style';

export function SplashScreen() {

    return (
        <>
            <S.Container>
                <Image source={require('../../assets/logo/PagBarato_Classic.png')} />
            </S.Container>
        </>
    );
};
