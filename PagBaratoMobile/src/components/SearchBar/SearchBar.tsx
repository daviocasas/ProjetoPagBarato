import * as React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Button from '../Button/Button';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query) => setSearchQuery(query);

    const onPressWhatever = () => {
        const a = "arroz"
        return a
    }

    return (
        <View>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <Button title="Comida" width={0.2} onPress={onPressWhatever} />
            <Button title="Comida" width={0.2} onPress={onPressWhatever} />
            <Button title="Comida" width={0.2} onPress={onPressWhatever} />
        </View>
    );
};

export default SearchBar;