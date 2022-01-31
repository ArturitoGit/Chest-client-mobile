import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pages
import { HomeScreen } from './pages/home' ;
import { ProfileScreen } from './pages/profile' ;
import { LoginScreen } from './pages/login' ;
import { AccountsScreen } from './pages/accounts';
import { AccountScreen } from './pages/account';
import { accountEditScreen } from './pages/account_edit';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          options={{
            title: 'Enter your information',
          }} 
          component={LoginScreen} 
        />
        <Stack.Screen 
          name="Accounts" 
          component={AccountsScreen}
          options={{
            // Disable back gesture and header button
            headerBackVisible: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen name="Account" options={{ title: "..."}} component={AccountScreen} />
        <Stack.Screen name="Account_Edit" options={{ title: ""}} component={accountEditScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;