import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getMenuFromDB, fetchMenuFromAPI, initDB, filterMenuByCategories, clearTable } from './MenuService';
import { colors, themeStyles } from '../theme';

const MenuList = ({ selectedCategories , searchQuery}) => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        initDB();
        // clearTable('menu', () => {
        //     console.log('Menu table has been cleared');
        // });
        getMenuFromDB(data => {
            if (data.length === 0) {
                fetchMenuFromAPI();
                getMenuFromDB(setMenuItems);
            } else {
                setMenuItems(data);
            }
            console.log(menuItems);
        });
    }, []);

    useEffect(() => {
        filterMenuByCategories(selectedCategories, searchQuery, setMenuItems);
    }, [selectedCategories, searchQuery]);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={themeStyles.cardTitle}>{item.name}</Text>
            <View style={styles.rowContainer}>
                <Text style={[styles.itemDescription, themeStyles.paragraphText]} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
                <Image
                    source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }}
                    style={styles.itemImage}
                />
            </View>
            <Text style={[styles.itemPrice, themeStyles.highlightText]}>${item.price}</Text>
        </View>
    );

    return (
        <FlatList
            data={menuItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
        />
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemContainer: {
        padding:20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    itemPrice: {
        fontSize: 16,
        color: colors.primary1,
        marginTop: -20
    },
    itemDescription: {
        fontSize: 14,
        color: colors.primary1,
        width: '65%',
        marginTop: -40
    },
    itemImage: {
        width: 100,
        height: 100,
        width: '30%'
    },
});

export default MenuList;
