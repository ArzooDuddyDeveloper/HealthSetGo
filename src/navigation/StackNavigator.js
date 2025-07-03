import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import Splash from '../screens/Splash/Splash';

const StackNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? <Splash /> : isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default StackNavigator;
