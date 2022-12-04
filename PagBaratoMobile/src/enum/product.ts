export const ProductUnitType: {[x: string]: 'G' | 'KG' | 'EA' | 'BOX' | 'DZ'} =
  {
    G: 'G',
    KG: 'KG',
    EA: 'EA',
    BOX: 'BOX',
    DZ: 'DZ',
  };

export type ProductUnitType =
  typeof ProductUnitType[keyof typeof ProductUnitType];

export const ProductUnitAbbrevMap = {
  [ProductUnitType.G]: 'g',
  [ProductUnitType.KG]: 'kg',
  [ProductUnitType.EA]: 'un',
  [ProductUnitType.BOX]: 'cx',
  [ProductUnitType.DZ]: 'dz',
};

export const ProductUnitMap = {
  [ProductUnitType.G]: '(G) Grama',
  [ProductUnitType.KG]: '(KG) Quilograma',
  [ProductUnitType.EA]: '(UN) Unidade',
  [ProductUnitType.BOX]: '(CX) Caixa',
  [ProductUnitType.DZ]: '(DZ) Dúzia',
};
