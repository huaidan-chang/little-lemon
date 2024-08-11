import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, themeStyles } from '../theme';

const categories = ['Starters', 'Mains', 'Desserts', 'Drinks', 'Specials'];

const CategoryList = ({ selectedCategories, setSelectedCategories }) => {

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(item => item !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const renderItem = ({ item }) => {
        const isSelected = selectedCategories.includes(item);
        return (
            <TouchableOpacity
                style={[styles.categoryItem, isSelected && styles.selectedCategory]}
                onPress={() => toggleCategory(item)}
            >
                <Text style={[styles.categoryText, themeStyles.sectionCategories, isSelected && styles.selectedText]}>{item}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <>
        <Text style={[themeStyles.sectionTitle, styles.title]}>ORDER FOR DELIVERY!</Text>
        <View style={styles.listContainer}>
            <FlatList
                data={categories}
                horizontal
                renderItem={renderItem}
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
            />
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    title:{
        paddingTop: 20,
        paddingHorizontal: 12,
        color: colors.secondary4
    },
    listContainer: {
        backgroundColor: '#f8f8f8',
        paddingVertical: 10,
    },
    container: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    categoryItem: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    selectedCategory: {
        backgroundColor: colors.primary1,
    },
    categoryText: {
        color: colors.primary1,
        fontSize: 16,
    },
    selectedText: {
        color: '#fff',
    },
});

export default CategoryList;
