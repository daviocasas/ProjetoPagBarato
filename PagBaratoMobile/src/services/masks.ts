import Masker from 'vanilla-masker';

const checkInvalid = (numberParam: string) => {
  const cpf = numberParam.toString();
  if (
    cpf.length !== 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  ) {
    return false;
  }
  return true;
};

const checkCPFDV = (numberParam: string, dv: string) => {
  const check = numberParam
    .split('')
    .map((item: any, i) => {
      const res = item * (numberParam.length + 1 - i);
      return res;
    })
    .reduce((x, y) => {
      return x + y;
    });
  let result = 11 - (check % 11);
  if (result === 10 || result === 11) {
    result = 0;
  }
  return result.toString() === dv;
};

export const isCpf = (cpf: string) => {
  if (!cpf) {
    return false;
  }
  cpf = cpf.replace(/\D/g, '');
  if (checkInvalid(cpf)) {
    const numberValue = cpf.toString().slice(0, -2);
    const dv1 = cpf.toString()[9];
    const dv2 = cpf.toString()[10];
    if (checkCPFDV(numberValue, dv1) && checkCPFDV(numberValue + dv1, dv2)) {
      return true;
    }
    return false;
  }
  return false;
};

const checkCNPJDV = (numberParam: string, dv: string) => {
  const check = numberParam
    .split('')
    .reverse()
    .map((item, i) => {
      return ((i % 8) + 2) * parseInt(item, 10);
    })
    .reduce((x, y) => {
      return x + y;
    });
  let result = check % 11;
  if (result < 2) {
    result = 0;
  } else {
    result = 11 - result;
  }
  return result.toString() === dv;
};

const cnpjCheckInvalid = (numberParam: string) => {
  const cnpj = numberParam.toString();
  if (
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999' ||
    cnpj.length !== 14
  ) {
    return false;
  }
  return true;
};

export const isCNPJ = (cnpj: string) => {
  cnpj = cnpj.replace(/\D/g, '');
  if (cnpjCheckInvalid(cnpj)) {
    const numberValue = cnpj.toString().slice(0, -2);
    const dv1 = cnpj.toString()[12];
    const dv2 = cnpj.toString()[13];
    if (checkCNPJDV(numberValue, dv1) && checkCNPJDV(numberValue + dv1, dv2)) {
      return true;
    }
    return false;
  }
  return false;
};

export const maskPhone = (value: string = '') => {
  return value ? Masker.toPattern(value, '(99) 99999-9999') : '';
};

export const maskCpf = (value: string) => {
  return value ? Masker.toPattern(value, '999.999.999-99') : '';
};

export const unmaskField = (value: any) => {
  return value ? value.replace(/\D/g, '') : '';
};

export const maskCnpj = (value: string) => {
  return value ? Masker.toPattern(value, '99.999.999/9999-99') : '';
};

export const maskDate = (value: string | null | undefined) => {
  return value ? Masker.toPattern(value, '99/99/9999') : '';
};

export const maskTime = (value: string | null | undefined) => {
  return value ? Masker.toPattern(value, '99:99') : '';
};

export const maskDateTime = (value: string) => {
  return value ? Masker.toPattern(value, '99/99/9999 99:99') : '';
};
export const maskCep = (value: string) => {
  return value ? Masker.toPattern(value, '99999-999') : '';
};

export const maskCpfOrCnpj = (value: string) =>
  isCpf(value) ? maskCpf(value) : maskCnpj(value);
