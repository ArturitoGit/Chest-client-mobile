import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pages
import { HomeScreen } from './pages/home' ;
import { ProfileScreen } from './pages/profile' ;
import { LoginScreen } from './pages/login' ;

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{title: 'Enter your information'}} component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" options={{ title: 'Profile 2' }} component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;