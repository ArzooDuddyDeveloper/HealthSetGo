import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AppStack from './AppStack'; // Stack for authenticated users
import AuthStack from './AuthStack'; // Stack for unauthenticated users

const StackNavigator = () => {
  // Access authentication status from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      {/* Conditionally render navigation stacks based on authentication status */}
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default StackNavigator;
