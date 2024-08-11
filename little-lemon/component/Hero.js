import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import { colors, themeStyles } from '../theme';
import Icon from 'react-native-vector-icons/Ionicons';

const Hero = ({ onSearch, showSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (text) => {
        setSearchText(text);
        onSearch(text);
    };
    return (
        <View style={styles.container}>
            <Text style={[themeStyles.titleText, styles.primaryColorText]}>Little Lemon</Text>
            <Text style={[themeStyles.subTitleText, styles.whiteText]}>Chicago</Text>
            <View style={styles.rowContainer}>
                <Text style={[themeStyles.leadText, styles.whiteText]}>
                    We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                </Text>
                <Image
                    source={require('../assets/Hero image.png')}
                    style={styles.image}
                />
            </View>
            {showSearch && (
                <View style={styles.searchContainer}>
                    <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        value={searchText}
                        onChangeText={handleSearchChange}
                        placeholderTextColor="#888"
                        autoCapitalize="none"  // Disable auto-capitalization
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'column',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '60%',
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 16,
    },
    whiteText: {
        paddingRight: 30,
        color: '#FFF',
    },
    primaryColorText: {
        color: colors.primary2,
    },
    imageContainer: {
        marginTop: 20,
        width: 100,
        height: 100,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
});

export default Hero;
