import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'MarkaziText-Medium': require('./Fonts/MarkaziText-Medium.ttf'),
    'MarkaziText-Regular': require('./Fonts/MarkaziText-Regular.ttf'),
    'Karla-Medium': require('./Fonts/Karla-Medium.ttf'),
    'Karla-ExtraBold': require('./Fonts/Karla-ExtraBold.ttf'),
    'Karla-Bold': require('./Fonts/Karla-Bold.ttf'),
    'Karla-Regular': require('./Fonts/Karla-Regular.ttf'),
  });
};

export const colors = {
    primary1: '#495859',
    primary2: '#F4CE13',
    secondary1: '#FC9470',
    secondary2: '#D8D7D3',
    secondary3: '#ECEDED',
    secondary4: '#333333',
};

export const themeStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF',
    },
    cardTitle: {
        fontFamily: 'Karla-Bold',
        fontSize: 16,
    },
    titleText: {
        fontFamily: 'MarkaziText-Medium',
        fontSize: 64,
    },
    subTitleText: {
        fontFamily: 'MarkaziText-Regular',
        fontSize: 40,
    },
    leadText: {
        fontFamily: 'Karla-Medium',
        fontSize: 18,
    },
    sectionTitle: {
        fontFamily: 'Karla-ExtraBold',
        fontSize: 20,
    },
    sectionCategories: {
        fontFamily: 'Karla-ExtraBold',
        fontSize: 16,
    },
    paragraphText: {
        fontFamily: 'Karla-Regular',
        fontSize: 16,
    },
    highlightText: {
        fontFamily: 'Karla-Medium',
        fontSize: 16,
    },
    buttonPrimary: {
        backgroundColor: colors.primary1,
        padding: 13,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.primary1,
        maxWidth: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    buttonWhite: {
        backgroundColor: '#FFF',
        padding: 13,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.primary1,
        maxWidth: '50%',
    },
    buttonWhiteText: {
        fontFamily: 'Karla-ExtraBold',
        fontSize: 16,
        color: colors.primary1,
    },
    buttonPrimaryText: {
        color: '#FFFFFF',
        fontFamily: 'Karla-ExtraBold',
        fontSize: 16,
    },
    logOutButton: {
        backgroundColor: colors.primary2,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    logOutButtonText: {
        color: colors.primary1,
        fontFamily: 'Karla-ExtraBold',
        fontSize: 16,
    }
});
