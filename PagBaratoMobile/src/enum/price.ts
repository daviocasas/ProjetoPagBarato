import {color} from '../config/theme.json';

export const PriceType: {[x: string]: 'COMMON' | 'DEAL'} = {
  COMMON: 'COMMON',
  DEAL: 'DEAL',
};

export type PriceType = typeof PriceType[keyof typeof PriceType];

export const PriceTypeMap = [
  [PriceType.COMMON, 'Comum'],
  [PriceType.DEAL, 'Oferta'],
];

export const TrustingType: {
  [x: string]: 'VERY_LOW' | 'LOW' | 'NEUTRAL' | 'HIGH' | 'VERY_HIGH';
} = {
  VERY_LOW: 'VERY_LOW',
  LOW: 'LOW',
  NEUTRAL: 'NEUTRAL',
  HIGH: 'HIGH',
  VERY_HIGH: 'VERY_HIGH',
};

export type TrustingType = typeof TrustingType[keyof typeof TrustingType];

export const TrustingMap = {
  [TrustingType.VERY_LOW]: {value: 'Muito baixa', color: color.error},
  [TrustingType.LOW]: {value: 'Baixa', color: color.mid_orange},
  [TrustingType.NEUTRAL]: {value: 'Neutra', color: color.dark_gray},
  [TrustingType.HIGH]: {value: 'Alta', color: color.brighter_green},
  [TrustingType.VERY_HIGH]: {value: 'Muito alta', color: color.mid_green},
};
