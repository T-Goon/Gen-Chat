import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import FeedScreen from './src/screens/FeedScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AddPostScreen from './src/screens/AddPostScreen';
import RegisterScreen from './src/screens/RegisterScreen';
 
import ContextProvider from './src/Context';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'
          screenOptions={{
            headerShown: false
          }}
          scr >
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='Feed' component={FeedScreen} />
          <Stack.Screen name='Settings' component={SettingsScreen} options={{ headerShown: true, headerTitleStyle: styles.header }} />
          <Stack.Screen name='Add Post' component={AddPostScreen} options={{ headerShown: true, headerTitleStyle: styles.header }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold'
  },
});
