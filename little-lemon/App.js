import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Logo, BackButton, AvatarButton } from './component/Header';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Onboarding from './screens/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './screens/SplashScreen';
import { loadFonts } from './theme';

const Stack = createNativeStackNavigator();

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
    loadData();
  }, []);

  const loadData = async () => {
    const storedFirstName = await AsyncStorage.getItem('firstName');
    const storedLastName = await AsyncStorage.getItem('lastName');
    const storedImage = await AsyncStorage.getItem('profileImage');
    setFirstName(storedFirstName || '');
    setLastName(storedLastName || '');
    setProfileImage(storedImage);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const hasCompletedOnboarding = await AsyncStorage.getItem('onboardingCompleted');
      setIsOnboardingCompleted(hasCompletedOnboarding === 'true');
      setIsLoading(false);
    };

    checkOnboardingStatus();
  }, []);

  if (isLoading || !fontsLoaded) {
    return <SplashScreen />;
  }

  const updateProfile = (newFirstName, newLastName, newProfileImage) => {
    setFirstName(newFirstName);
    setLastName(newLastName);
    setProfileImage(newProfileImage);
  };

  return (
   // <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isOnboardingCompleted ? "Home" : "Onboarding"}>
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            headerTitle: () => <Logo />,
            headerLeft: null
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation, route }) => ({
            headerTitle: () => <Logo />,
            headerRight: () => <AvatarButton profileImage={profileImage} firstName={route.params?.firstName || firstName} lastName={route.params?.lastName || lastName} onPress={() => navigation.navigate('Profile')} />
          })}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={({ navigation }) => ({
            headerTitle: () => <Logo />,
            headerLeft: () => <BackButton onPress={() => navigation.goBack()} />
          })}
          initialParams={{ updateProfile }}
        />
      </Stack.Navigator>
    </NavigationContainer>
   // </UserProvider>
  );
}

export default App;