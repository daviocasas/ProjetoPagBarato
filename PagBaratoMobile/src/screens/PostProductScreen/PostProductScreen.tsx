import React, {useState, useEffect} from 'react';
import {Switch, StyleSheet, LogBox} from 'react-native';

import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import CurrencyInput from 'react-native-currency-input';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-toast-message';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale';

import * as S from './PostProductScreen.style';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import api from '../../services/api';

import {color, font} from '../../config/theme.json';
import * as Dimension from '../../services/dimensionsService';
import {getItem, StorageItems} from '../../services/storage';

Feather.loadFont();

const PriceTypeList = [
  {
    id: 'COMMON',
    title: 'Comum',
  },
  {
    id: 'DEAL',
    title: 'Oferta',
  },
];

export function PostProductScreen({navigation}) {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested inside']);

  const [productName, setProductName] = useState('');
  const [value, setValue] = useState<number | null>(0);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [isProductWithNearExpirationDate, setIsProductWithNearExpirationDate] =
    useState(false);

  const [toFetch, setToFetch] = useState(true);

  const [establishmentList, setEstablishmentList] = useState([]);
  const [selectedEstablishment, setSelectedEstablishment] = useState<any>(null);

  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [priceTypeList, _setPriceTypeList] = useState(PriceTypeList);
  const [selectedPriceType, setSelectedPriceType] = useState<any>(null);

  const [dateModalOpen, setDateModalOpen] = useState(false);

  const toggleProductWithNearExpirationDate = () => {
    setIsProductWithNearExpirationDate(!isProductWithNearExpirationDate);
  };

  const fetchProducts = async () => {
    const token = await getItem(StorageItems.ACCESS_TOKEN);

    const {data: response} = await api.get(
      '/api/product?paginate=false&priceFiltering=false',
      {headers: {Authorization: `Bearer ${token}`}},
    );

    if (!response) return;

    const formattedData = response.data.map((item: {id: any; name: any}) => ({
      id: item.id,
      title: item.name,
    }));

    return setProductList(formattedData);
  };

  const fetchEstablishments = async () => {
    const token = await getItem(StorageItems.ACCESS_TOKEN);

    const {data: response} = await api.get(
      '/api/establishment?paginate=false',
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    if (!response) return;

    const formattedData = response.data.map((item: {id: any; name: any}) => ({
      id: item.id,
      title: item.name,
    }));

    return setEstablishmentList(formattedData);
  };

  const postProductPrice = async () => {
    try {
      if (
        value === null ||
        selectedPriceType === '' ||
        selectedEstablishment === '' ||
        (productName === '' && !selectedProduct)
      ) {
        Toast.show({
          type: 'error',
          text1: 'Preencha todos os campos!',
          text2: 'Não é permitido nenhum campo vazio.',
        });

        return;
      }

      const token = await getItem(StorageItems.ACCESS_TOKEN);

      const res = await api.post(
        `/api/price`,
        {
          value,
          expiresAt,
          isProductWithNearExpirationDate,
          establishmentId: selectedEstablishment.id,
          type: selectedPriceType.id,
          ...(selectedProduct?.id
            ? {productId: selectedProduct.id}
            : {productName}),
        },
        {headers: {Authorization: `Bearer ${token}`}},
      );

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Preço criado com sucesso!',
        text2: 'Agora você já pode visualizá-lo na busca :)',
      });

      navigation.navigate('HomeScreen');

      return res.data;
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    if (toFetch) {
      (async () => {
        await Promise.all([fetchEstablishments(), fetchProducts()]);
        setToFetch(false);
      })();
    }
  }, []);

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: color.cream,
      }}>
      <S.MainContainer>
        <S.TitleText bold>PUBLICAR PREÇO</S.TitleText>
        <S.DescriptionText>
          Publique um preço preenchendo a seguir:
        </S.DescriptionText>
        <S.WrapperForm>
          <S.WrapperSelectBox>
            <AutocompleteDropdown
              debounce={400}
              loading={toFetch}
              closeOnBlur={true}
              clearOnFocus={false}
              closeOnSubmit={false}
              onChangeText={setProductName}
              onSelectItem={setSelectedProduct}
              dataSet={productList}
              emptyResultText="Nenhum produto encontrado."
              inputContainerStyle={styles.autocompleteInputContainer}
              textInputProps={{
                placeholderTextColor: color.baby_gray,
                placeholder: 'Insira um produto...',
                style: styles.autocompleteTextInput,
              }}
            />
          </S.WrapperSelectBox>

          <S.WrapperSelectBox>
            <AutocompleteDropdown
              debounce={400}
              loading={toFetch}
              closeOnBlur={false}
              clearOnFocus={false}
              closeOnSubmit={false}
              onSelectItem={setSelectedEstablishment}
              dataSet={establishmentList}
              emptyResultText="Nenhum estabelecimento encontrado."
              inputContainerStyle={styles.autocompleteInputContainer}
              textInputProps={{
                placeholderTextColor: color.baby_gray,
                placeholder: 'Pesquise um estabelecimento...',
                style: styles.autocompleteTextInput,
              }}
            />
          </S.WrapperSelectBox>

          <CurrencyInput
            value={value}
            onChangeValue={setValue}
            prefix="R$"
            delimiter="."
            separator=","
            precision={2}
            minValue={0}
            renderTextInput={textInputProps => (
              <Input {...textInputProps} placeholder="Preço do produto" />
            )}
          />

          <S.WrapperSelectBox>
            <AutocompleteDropdown
              debounce={400}
              loading={toFetch}
              closeOnBlur={false}
              clearOnFocus={false}
              closeOnSubmit={false}
              onSelectItem={setSelectedPriceType}
              dataSet={priceTypeList}
              emptyResultText="Nenhum tipo de preço encontrado."
              inputContainerStyle={styles.autocompleteInputContainer}
              textInputProps={{
                editable: false,
                placeholderTextColor: color.baby_gray,
                placeholder: 'Selecione o tipo de preço...',
                style: styles.autocompleteTextInput,
              }}
            />
          </S.WrapperSelectBox>

          {selectedPriceType?.id === 'DEAL' ? (
            <Input
              value={
                expiresAt ? format(expiresAt, 'dd/MM/yyyy', {locale: ptBR}) : ''
              }
              placeholder="Data de término da oferta"
              disabled={true}
              endButton={true}
              endButtonAction={() => setDateModalOpen(true)}
              endButtonIcon={
                <Feather name="calendar" size={20} color={color.dark_gray} />
              }
            />
          ) : (
            <></>
          )}

          <DatePicker
            modal
            open={dateModalOpen}
            date={expiresAt || new Date()}
            mode="date"
            locale="pt_BR"
            cancelText="Limpar"
            confirmText="Confirmar"
            title="Oferta válida até"
            onCancel={() => {
              setExpiresAt(null);
              setDateModalOpen(false);
            }}
            onConfirm={date => {
              setExpiresAt(date);
              setDateModalOpen(false);
            }}
          />

          <S.WrapperSwitchSelector>
            <S.WrapperSwitchForm>
              <S.TextSwitch>
                Produto próximo da data de vencimento?
              </S.TextSwitch>
              <Switch
                trackColor={{false: '#3e3e3e', true: color.dark_gray}}
                thumbColor={
                  isProductWithNearExpirationDate ? color.primary : '#f4f4f4'
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleProductWithNearExpirationDate}
                value={isProductWithNearExpirationDate}
              />
            </S.WrapperSwitchForm>
          </S.WrapperSwitchSelector>
        </S.WrapperForm>
        <S.WrapperForm>
          <Button
            title="Publicar preço"
            width={0.75}
            onPress={postProductPrice}
          />
        </S.WrapperForm>
      </S.MainContainer>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  autocompleteInputContainer: {
    backgroundColor: 'transparent',
    borderColor: color.little_gray,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: '5.5%',
  },
  autocompleteTextInput: {
    marginTop: '2%',
    color: color.dark_gray,
    fontFamily: font.regular,
    fontSize: Dimension.fontScale(12),
  },
});
