import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from './src/hooks/useAuth';

import Login from './src/views/auth/Login';
import Register from './src/views/auth/Register';
import Scanner from './src/views/utils/Scanner';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/state/Store';

const Stack = createNativeStackNavigator();

export default function App() {
  const { user } = useAuth();
  
  if(!user){
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {(props) => <Login {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Register" options={{ headerShown: false }}>
              {(props) => <Register {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }else{
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Scanner " component={Scanner} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
