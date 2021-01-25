import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/LoginScreen';
import {RegistrationScreen} from '../screens/RegistrationScreen';
import {ConfirmationScreen} from '../screens/ConfirmationScreen';

const AuthStack = createStackNavigator();

export function AuthStackNavigator() {
  return (
      <AuthStack.Navigator
      	screenOptions={{
      		headerShown: false
      	}}>
        <AuthStack.Screen name={'Login'} component={LoginScreen} />
        <AuthStack.Screen name={'Registration'} component={RegistrationScreen} />
        <AuthStack.Screen name={'Confirmation'} component={ConfirmationScreen} />
      </AuthStack.Navigator>
  );
}