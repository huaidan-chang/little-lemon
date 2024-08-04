import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

const Onboarding = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [isFirstNameValid, setIsFirstNameValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const validateFirstName = (name) => {
        const isValid = name.trim().length > 0 && /^[a-zA-Z ]*$/.test(name);
        setIsFirstNameValid(isValid);
        setFirstName(name);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        setIsEmailValid(isValid);
        setEmail(email);
    };

    const completeOnboarding = async () => {
        await AsyncStorage.setItem('firstName', firstName);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('onboardingCompleted', 'true');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Profile' },
            ],
          })
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require('../assets/Logo.png')}
                />
            </View>
            <View style={styles.formSection}>
                <Text style={styles.description}>Let us get to know you</Text>
                <Text>First Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={validateFirstName}
                    value={firstName}
                />
                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={validateEmail}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={completeOnboarding}
                    disabled={!isFirstNameValid || !isEmailValid}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width,
        flex: 1,
        backgroundColor: '#fff', // Default background
    },
    header: {
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
        paddingBottom: 30
    },
    logo: {
        height: 50,
    },
    formSection: {
        flex: 0.85,
        backgroundColor: '#c0c0c0',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingHorizontal: 20,
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginBottom: 200,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: width * 0.8,
        marginBottom: 12,
        padding: 10,
        borderRadius: 5,
    },
    footer: {
        flex: 0.15,
        backgroundColor: '#f0f0f0',
        alignItems: 'flex-end', // Align button to the right
        justifyContent: 'center', // Center button vertically
        paddingRight: 20, // Padding right for some spacing from the edge
    },
    button: {
        backgroundColor: '#c0c0c0', // Set your desired color
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white', // Set text color for visibility
        fontSize: 16,
    },

});

export default Onboarding;
