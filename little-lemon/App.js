import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './screens/SplashScreen';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import { loadFonts } from './theme';

const Stack = createNativeStackNavigator();


function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isOnboardingCompleted ? "Profile" : "Onboarding"}>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;