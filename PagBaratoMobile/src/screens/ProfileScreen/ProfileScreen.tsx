import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { Slider } from '@miblanchard/react-native-slider';



import * as S from './ProfileScreen.style';


export function ProfileScreen(): JSX.Element {
    const [name, setName] = useState('Davi');
    const [distance, setDistance] = useState(0);



    return (
        <>
            <S.Container>
                <S.WrapperContainer>
                    <S.SubContainer>
                        <S.TextLogo bold>Olá, {name}</S.TextLogo>
                        <S.WrapperForm>
                            <S.DefaultText> Distancia (km): {Math.floor(distance)} </S.DefaultText>
                            <Slider
                                minimumValue={1}
                                maximumValue={20}
                                thumbTintColor="#47E181"
                                value={distance}
                                onValueChange={(value) => setDistance(value)}
                            />
                        </S.WrapperForm>
                        <S.WrapperForm>
                            <Button
                                title="Salvar"
                                width={0.3}
                            />
                        </S.WrapperForm>
                    </S.SubContainer>
                </S.WrapperContainer>
            </S.Container>
        </>
    );
};
