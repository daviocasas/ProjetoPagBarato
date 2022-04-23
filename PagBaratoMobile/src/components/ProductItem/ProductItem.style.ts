import styled from 'styled-components/native';

export const ProductContainer = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7,
})`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2%;
    background-color: #f3f3f3;

  `;

export const ContentContainer = styled.View`
    flex: 1;
    margin-left: 16px;
`;

export const DefaultTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #000;
    margin-bottom: 16px;
`;

export const DefaultDescription = styled.Text`
    font-size: 14px;
    color: #000;
`;

export const DefaultPrice = styled.Text`
    font-size: 16px;
    color: #000;
    font-weight: bold;
`;