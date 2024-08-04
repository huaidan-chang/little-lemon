import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Image, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaskedTextInput } from 'react-native-mask-text';
import * as ImagePicker from 'expo-image-picker';
import { themeStyles, colors } from '../theme';
import Checkbox from 'expo-checkbox';

const Profile = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [receiveOrderUpdates, setReceiveOrderUpdates] = useState(false);
    const [receivePasswordChangeNotification, setReceivePasswordChangeNotification] = useState(false);
    const [receiveSpecialOffers, setReceiveSpecialOffers] = useState(false);
    const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const storedFirstName = await AsyncStorage.getItem('firstName');
        const storedLastName = await AsyncStorage.getItem('lastName');
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
        const storedImage = await AsyncStorage.getItem('profileImage');
        const storedOrderUpdates = await AsyncStorage.getItem('receiveOrderUpdates') === 'true';
        const storedPasswordNotification = await AsyncStorage.getItem('receivePasswordChangeNotification') === 'true';
        const storedSpecialOffers = await AsyncStorage.getItem('receiveSpecialOffers') === 'true';
        const storedNewsletter = await AsyncStorage.getItem('subscribeToNewsletter') === 'true';
        setFirstName(storedFirstName || '');
        setLastName(storedLastName || '');
        setEmail(storedEmail || '');
        setPhoneNumber(storedPhoneNumber || '');
        setProfileImage(storedImage);
        setReceiveOrderUpdates(storedOrderUpdates);
        setReceivePasswordChangeNotification(storedPasswordNotification);
        setReceiveSpecialOffers(storedSpecialOffers);
        setSubscribeToNewsletter(storedNewsletter);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
            await AsyncStorage.setItem('profileImage', result.assets[0].uri);
        }
    };

    const saveChanges = async () => {
        await AsyncStorage.setItem('firstName', firstName);
        await AsyncStorage.setItem('lastName', lastName);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('phoneNumber', phoneNumber);
        await AsyncStorage.setItem('receiveOrderUpdates', JSON.stringify(receiveOrderUpdates));
        await AsyncStorage.setItem('receivePasswordChangeNotification', JSON.stringify(receivePasswordChangeNotification));
        await AsyncStorage.setItem('receiveSpecialOffers', JSON.stringify(receiveSpecialOffers));
        await AsyncStorage.setItem('subscribeToNewsletter', JSON.stringify(subscribeToNewsletter));
        alert('Changes saved successfully!');
    };

    const logout = async () => {
        await AsyncStorage.clear();
        navigation.navigate('Onboarding');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeader}>
                {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                ) : (
                    <View style={styles.profileImagePlaceholder}>
                        <Text style={styles.initialsText}>{`${firstName[0] || ''}${lastName[0] || ''}`}</Text>
                    </View>
                )}
                <View style={styles.buttonContainer}>
                    <Button title="Change" onPress={pickImage} />
                    <Button title="Remove" onPress={() => setProfileImage(null)} />
                </View>
            </View>
            <Text style={{fontFamily: 'Karla-ExtraBold'}}>First name</Text>
            <TextInput style={styles.input} placeholder="First name" value={firstName} onChangeText={setFirstName} />
            <Text>Last name</Text>
            <TextInput style={styles.input} placeholder="Last name" value={lastName} onChangeText={setLastName} />
            <Text>Email</Text>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <Text>Phone number</Text>
            <MaskedTextInput
                style={styles.input}
                mask="(999) 999-9999"
                placeholder="Phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="numeric"
            />
              <View style={styles.notificationsSection}>
                <Text style={styles.sectionTitle}>Email Notifications</Text>
                <View style={styles.switchRow}>
                    <Checkbox
                        value={receiveOrderUpdates}
                        onValueChange={newValue => setReceiveOrderUpdates(newValue)}
                        color={receiveOrderUpdates ? colors.primary1 : undefined}
                    />
                    <Text style={styles.label}>Order statuses</Text>
                </View>
                <View style={styles.switchRow}>
                    <Checkbox
                        value={receivePasswordChangeNotification}
                        onValueChange={newValue => setReceivePasswordChangeNotification(newValue)}
                        color={receivePasswordChangeNotification ? colors.primary1 : undefined}
                    />
                    <Text style={styles.label}>Password changes</Text>
                </View>
                <View style={styles.switchRow}>
                    <Checkbox
                        value={receiveSpecialOffers}
                        onValueChange={newValue => setReceiveSpecialOffers(newValue)}
                        color={receiveSpecialOffers ? colors.primary1 : undefined}
                    />
                    <Text style={styles.label}>Special offers</Text>
                </View>
                <View style={styles.switchRow}>
                    <Checkbox
                        value={subscribeToNewsletter}
                        onValueChange={newValue => setSubscribeToNewsletter(newValue)}
                        color={subscribeToNewsletter ? colors.primary1 : undefined}
                    />
                    <Text style={styles.label}>Newsletter</Text>
                </View>
            </View>
            <TouchableOpacity style={themeStyles.logOutButton} onPress={logout}>
                <Text style={themeStyles.logOutButtonText}>Log Out</Text>
            </TouchableOpacity>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={themeStyles.buttonWhite} onPress={loadData}>
                    <Text style={themeStyles.buttonWhiteText}>Discard Changes</Text>
                </TouchableOpacity>
                <View style={{ width: 30 }} />
                <TouchableOpacity style={themeStyles.buttonPrimary} onPress={saveChanges} >
                    <Text style={themeStyles.buttonPrimaryText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF',
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    profileImagePlaceholder: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#43766C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    initialsText: {
        fontSize: 32,
        color: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 5
    },
    notificationsSection: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',  // Aligns items to the start of the row
        alignItems: 'center',         // Keeps items vertically centered
        marginBottom: 10,
        paddingRight: 10,             // Right padding for some spacing at the end
    },
    label: {
        fontSize: 16,
        marginLeft: 10,               // Adds some margin left to the label to bring it closer to the checkbox
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
});

export default Profile;
