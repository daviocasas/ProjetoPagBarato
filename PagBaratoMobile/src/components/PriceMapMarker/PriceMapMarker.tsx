import React, {FunctionComponent} from 'react';
import {Marker} from 'react-native-maps';

import {TrustingMap, TrustingType} from '../../enum/price';

import * as S from './PriceMapMarker.style';

export interface PriceMapMarker {
  price?: any;
  establishment: any;
  isLowestPrice?: boolean;
  trustingFactor: TrustingType;
  setSelectedMarker: any;
}

const PriceMapMarker: FunctionComponent<PriceMapMarker> = ({
  price,
  isLowestPrice,
  establishment,
  trustingFactor,
  setSelectedMarker,
}) => {
  const {value: priceTrustingFactor, color: priceTrustingColor} =
    TrustingMap[trustingFactor];

  return (
    <Marker
      identifier={price.id}
      tracksViewChanges={false}
      coordinate={{
        latitude: establishment.latitude,
        longitude: establishment.longitude,
      }}
      onPress={e => {
        setSelectedMarker({
          isLowestPrice,
          priceId: e.nativeEvent.id,
        });
      }}>
      <S.MainContainer>
        <S.MarkerContainer isLowestPrice={isLowestPrice}>
          <S.WrapperMarkerContent>
            <S.EstablishmentTitle>
              {establishment.name || ''}
            </S.EstablishmentTitle>
            <S.ProductValue>
              {price.value
                ? `R$ ${Number(String(price.value))
                    .toFixed(2)
                    .replace('.', ',')}`
                : 'FREE'}
            </S.ProductValue>
          </S.WrapperMarkerContent>
          <S.PriceTrustingContainer priceTrustingColor={priceTrustingColor}>
            <S.PriceTrustingText>Confiabilidade: </S.PriceTrustingText>
            <S.PriceTrustingText>{priceTrustingFactor}</S.PriceTrustingText>
          </S.PriceTrustingContainer>
        </S.MarkerContainer>
      </S.MainContainer>
    </Marker>
  );
};

const MemoizedPriceMapMarker = React.memo(PriceMapMarker);

export default MemoizedPriceMapMarker;
