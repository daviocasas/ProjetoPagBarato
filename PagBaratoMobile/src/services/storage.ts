import Storage from 'react-native-sensitive-info';

const options: Storage.RNSensitiveInfoOptions = {};

export const getItem = async (key: string) => Storage.getItem(key, options);

export const setItem = async (key: string, value: any) => {
  await Storage.setItem(key, value, options);
};

export const setAuthTokens = async (
  accessToken: string | null,
  refreshToken: string | null
) => {
  await Storage.setItem('accessToken', accessToken || '', options);
  await Storage.setItem('refreshToken', refreshToken || '', options);
};

export const deleteAuthTokens = async () => {
  await Storage.deleteItem('accessToken', options);
  await Storage.deleteItem('refreshToken', options);
  await Storage.deleteItem('auth', options);
};

export const removeItem = async (key: string) => {
  await Storage.deleteItem(key, options);
};

export const getAll = async () => Storage.getAllItems(options);
