import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateGameScreen from "../screens/CreateGameScreen"
import JoinScreen from '../screens/JoinScreen';
import InputScreen from '../screens/InputScreen';
import WaitingScreen from '../screens/WaitingScreen';
import GridScreen from '../screens/GridScreen';
import CheckScreen from '../screens/CheckScreen';
import ResultScreen from '../screens/ResultScreen';
import InstructionsScreen from '../screens/Instructions';
import Home from '../screens/Home';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="InstructionsScreen" component={InstructionsScreen} />
        <Stack.Screen name="CreateGameScreen" component={CreateGameScreen} />
        <Stack.Screen name="Join" component={JoinScreen} />
        <Stack.Screen name="Input" component={InputScreen} />
        <Stack.Screen name="Waiting" component={WaitingScreen} />
        <Stack.Screen name="Grid" component={GridScreen} />
        <Stack.Screen name="Check" component={CheckScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;