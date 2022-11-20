import React, {useState, useEffect} from 'react';
import {Switch, StyleSheet} from 'react-native';

import SelectBox from 'react-native-multi-selectbox';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-toast-message';

import * as S from './PostProductScreen.style';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import api from '../../services/api';

import {color, font} from '../../config/theme.json';
import * as Window from '../../services/dimensionsService';
import {getItem, StorageItems} from '../../services/storage';

const PriceTypeEnum = [
  {
    item: 'Comum',
    id: 'COMMON',
  },
  {
    item: 'Oferta',
    id: 'DEAL',
  },
];

export function PostProductScreen({navigation}) {
  const [productName, setProductName] = useState('');
  const [value, setValue] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);

  const [selectedItem, setSelectedItem] = useState<any>({});
  const [establishmentList, setEstablishmentList] = useState([]);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [priceType, setPriceType] = useState<any>({});

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  const fetchData = async () => {
    const token = await getItem(StorageItems.ACCESS_TOKEN);

    const {data} = await api.get('/api/establishment?paginate=false', {
      headers: {Authorization: `Bearer ${token}`},
    });

    const formatedData = data.data.map((item: {id: any; name: any}) => ({
      ...item,
      id: item.id,
      item: item.name,
    }));

    return setEstablishmentList(formatedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const postProductPrice = async () => {
    try {
      if (
        productName === '' ||
        value === '' ||
        selectedItem === '' ||
        priceType === ''
      ) {
        Toast.show({
          type: 'error',
          text1: 'Preencha todos os campos!',
          text2: 'Não é permitido nenhum campo vazio.',
        });

        return;
      }
      console.log({
        productName,
        establishmentId: selectedItem.id,
        value,
        isProductWithNearExpirationDate: isEnabled,
        type: priceType.id,
        expiresAt: date,
      });

      const token = await getItem(StorageItems.ACCESS_TOKEN);
      const res = await api.post(
        `/api/price`,
        {
          productName,
          establishmentId: selectedItem.id,
          value,
          isProductWithNearExpirationDate: isEnabled,
          type: priceType.id,
          expiresAt: date,
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
      console.log(error.response.data);
    }
  };

  function onChangeVal() {
    return (val: any) => setSelectedItem(val);
  }

  function onChangeValPriceType() {
    return (val: any) => setPriceType(val);
  }

  return (
    <>
      <S.Container>
        <S.WrapperContainer>
          <S.SubContainer>
            <S.TextLogo bold>Poste um preço de produto!</S.TextLogo>
            <S.WrapperForm>
              <Input
                value={productName}
                onChangeText={setProductName}
                placeholder="Nome do produto"
                autoCapitalized="none"
                keyboardType="default"
                maxLength={120}
              />
              <S.WrapperSelectBox>
                <SelectBox
                  label=""
                  options={establishmentList}
                  value={selectedItem}
                  onChange={onChangeVal()}
                  labelStyle={{display: 'none'}}
                  containerStyle={{
                    borderColor: color.little_gray,
                    borderWidth: 1,
                    borderRadius: 4,
                    color: color.dark_gray,
                    fontSize: Window.widthScale(0.0325),
                    width: Window.widthScale(0.8),
                    fontFamily: font.regular,
                    paddingLeft: '6%',
                  }}
                  inputFilterStyle={{
                    ...styles.selectInputText,
                    fontSize: Window.widthScale(0.0275),
                  }}
                  optionsLabelStyle={styles.selectInputText}
                  optionContainerStyle={styles.selectInputText}
                  multiListEmptyLabelStyle={styles.selectInputText}
                  multiOptionContainerStyle={styles.selectInputText}
                  selectedItemStyle={{...styles.selectInputText, padding: '3%'}}
                  hideInputFilter={false}
                  inputPlaceholder="Selecione o estabelecimento"
                  listEmptyText="Nenhum estabelecimento encontrado"
                  arrowIconColor={color.mid_green}
                  searchIconColor={color.mid_green}
                  toggleIconColor={color.mid_green}
                />
              </S.WrapperSelectBox>
              <Input
                value={value}
                onChangeText={setValue}
                placeholder="Preço do produto"
                autoCapitalized="none"
                keyboardType="numeric"
                maxLength={120}
              />

              <S.WrapperSelectBox>
                <SelectBox
                  label=""
                  labelStyle={{display: 'none'}}
                  containerStyle={{
                    borderColor: color.little_gray,
                    borderWidth: 1,
                    borderRadius: 4,
                    color: color.dark_gray,
                    fontSize: Window.widthScale(0.0325),
                    width: Window.widthScale(0.8),
                    fontFamily: font.regular,
                    paddingLeft: '6%',
                  }}
                  inputFilterStyle={{
                    ...styles.selectInputText,
                    fontSize: Window.widthScale(0.0275),
                  }}
                  optionsLabelStyle={styles.selectInputText}
                  optionContainerStyle={styles.selectInputText}
                  multiListEmptyLabelStyle={styles.selectInputText}
                  multiOptionContainerStyle={styles.selectInputText}
                  selectedItemStyle={{...styles.selectInputText, padding: '3%'}}
                  inputPlaceholder="Selecione o tipo de preço"
                  options={PriceTypeEnum}
                  value={priceType}
                  onChange={onChangeValPriceType()}
                  hideInputFilter={true}
                  arrowIconColor={color.mid_green}
                />
              </S.WrapperSelectBox>

              {priceType.id === 'DEAL' ? (
                <Button
                  title="Data da oferta"
                  width={0.4}
                  onPress={() => setOpen(true)}
                />
              ) : (
                <></>
              )}

              <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <S.WrapperSwitchSelector>
                <S.WrapperSwitchForm>
                  <S.TextSwitch>
                    Produto próximo da data de vencimento?{' '}
                  </S.TextSwitch>
                  <Switch
                    trackColor={{false: '#3e3e3e', true: color.mid_green}}
                    thumbColor={isEnabled ? color.secondary : '#f4f4f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </S.WrapperSwitchForm>
              </S.WrapperSwitchSelector>
            </S.WrapperForm>
            <S.WrapperForm>
              <Button
                title="Publicar preço"
                width={0.6}
                onPress={postProductPrice}
              />
            </S.WrapperForm>
          </S.SubContainer>
        </S.WrapperContainer>
      </S.Container>
    </>
  );
}

const styles = StyleSheet.create({
  selectInputText: {
    color: color.dark_gray,
    fontSize: Window.widthScale(0.0325),
    fontFamily: font.regular,
  },
});
