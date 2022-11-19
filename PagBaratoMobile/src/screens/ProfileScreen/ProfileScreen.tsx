import React, {useState} from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import {Slider} from '@miblanchard/react-native-slider';

import * as S from './ProfileScreen.style';

export function ProfileScreen({navigation}) {
  //const [name, setName] = useState('Davi');
  const [distance, setDistance] = useState(0);

  return (
    <>
      <S.Container>
        <S.WrapperContainer>
          <S.SubContainer>
            <S.TextLogo bold>Olá, determine a distância!</S.TextLogo>
            <S.WrapperForm>
              <S.DefaultText>
                {' '}
                Distância (km): {Math.floor(distance)}{' '}
              </S.DefaultText>
              <Slider
                minimumValue={1}
                maximumValue={20}
                thumbTintColor="#367315 "
                value={distance}
                onValueChange={value => setDistance(value)}
              />
            </S.WrapperForm>
            <S.WrapperForm>
              <Button
                title="Salvar"
                width={0.3}
                onPress={() =>
                  navigation.navigate('HomeScreen', {
                    item: distance,
                  })
                }
              />
            </S.WrapperForm>
          </S.SubContainer>
        </S.WrapperContainer>
      </S.Container>
    </>
  );
}
