import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import Hero from '../component/Hero';
import { colors, themeStyles } from '../theme';

const Onboarding = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isFirstNameValid, setIsFirstNameValid] = useState(false);
    const [isLastNameValid, setIsLastNameValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const validateFirstName = (name) => {
        const isValid = name.trim().length > 0 && /^[a-zA-Z ]*$/.test(name);
        setIsFirstNameValid(isValid);
        setFirstName(name);
    };

    const validateLastName = (name) => {
        const isValid = name.trim().length > 0 && /^[a-zA-Z ]*$/.test(name);
        setIsLastNameValid(isValid);
        setLastName(name);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        setIsEmailValid(isValid);
        setEmail(email);
    };

    const completeOnboarding = async () => {
        await AsyncStorage.setItem('firstName', firstName);
        await AsyncStorage.setItem('lastName', lastName);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('onboardingCompleted', 'true');
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'Home', params: {
                            firstName,
                            lastName,
                        },
                    },
                ],
            })
        );
    };

    return (
        <View style={styles.container}>
            <Hero showSearch={false} />
            <View style={styles.formSection}>
                <Text style={styles.label}>First name *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={validateFirstName}
                    value={firstName}
                />
                <Text style={styles.label}>Last name *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    onChangeText={validateLastName}
                    value={lastName}
                />
                <Text style={styles.label}>E-mail *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    onChangeText={validateEmail}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.button, (!isFirstNameValid || !isLastNameValid || !isEmailValid) && styles.buttonDisabled]}
                    onPress={completeOnboarding}
                    disabled={!isFirstNameValid || !isLastNameValid || !isEmailValid}>
                    <Text style={styles.buttonText}>Register</Text>
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
        backgroundColor: '#fff',
    },
    formSection: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'left',
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    label: {
        alignSelf: 'flex-start',
        //marginLeft: width * 0.1,
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        width: width * 0.9,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f8f8f8',
    },
    footer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#F4CE14',
        paddingVertical: 15,
        paddingHorizontal: 100,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
    },
    buttonText: {
        color: colors.primary1,
        fontSize: 18,
        fontWeight: 'bold',
    },

});

export default Onboarding;
