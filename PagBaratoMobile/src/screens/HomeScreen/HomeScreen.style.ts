import styled from 'styled-components/native';



export const DefaultInput = styled.Input`
    flex: 1;
    height: 50;
    backgroundColor: #363636;
    margin: 30;
    borderRadius: 5;
    fontSize: 19;
    paddingLeft: 15;
    paddingRight: 15;
    color: #FFFFFF;
`;

export const DeafultSafeArea = styled.View`
    flexDirection: row;
    alignItems: center;
`;

export const DefaultContainer = styled.SafeAreaView`
    flex: 1;
    backgroundColor: #242425;
`;

export const OrderButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7,
})`
        width: 32;
        marginRight: 30;
`;

export const List = styled.Flatlist`
    flex: 1;
`;
