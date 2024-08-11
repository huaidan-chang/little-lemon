import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../theme';

export const BackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
    <Icon name="arrow-back-circle" size={25} color={colors.primary1} />
  </TouchableOpacity>
)

export const Logo = () => (
  <View style={{ alignItems: 'center' }}>
    <Image
      source={require('../assets/Logo.png')}
      style={{ width: 120, height: 40 }}
      resizeMode="contain"
    />
  </View>
);

export const AvatarButton = ({ profileImage, firstName, lastName, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ marginRight: 15 }}>
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ) : (
        <View style={styles.profileImagePlaceholder}>
          <Text style={styles.initialsText}>{`${firstName[0] || ''}${lastName[0] || ''}`}</Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 22.5,
  },
  profileImagePlaceholder: {
    width: 25,
    height: 25,
    borderRadius: 22.5,
    backgroundColor: '#43766C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: 'white',
    fontSize: 12
  },
});