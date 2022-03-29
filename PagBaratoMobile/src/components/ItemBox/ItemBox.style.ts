import styled from 'styled-components/native';

export const IatemContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
    width: 100%;
    height: 40%;
    align-items: center;
    justify-content: center;
    align-self: center;
    elevation: 5;
    flex-direction: row;
    background-color: blue;
  `;

export const ItemContainer = styled.View`
    width: 100%;
    height: 30%;
    align-items: center;
    justify-content: center;
    align-self: center;
    elevation: 5;
    flex-direction: row;
  `;

export const TextContainer = styled.View`
    margin-left: 15%;
    height: 100%;
`;

export const NumberContainer = styled.View`
    height: 100%;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: black;
  text-align: left;
  padding-vertical: 5%;
`;

export const Location = styled.Text`
  font-size: 16px;
  color: black;
  text-align: left;
  padding-vertical: 5%;
`;

export const Price = styled.Text`
    font-size: 32px;
    color: black;
    text-align: center;
    padding: 5%;
`;