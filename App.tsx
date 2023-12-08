import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { MaterialCommunityIcons} from '@expo/vector-icons'; 

import { useAuth } from './src/hooks/useAuth';

import Login from './src/views/auth/Login';
import Register from './src/views/auth/Register';
import Scanner from './src/views/utils/Scanner';
import { store } from './src/state/Store';
import { MainPage } from './src/views/MainPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const { user } = useAuth();
  
  if(false){
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
          <Tab.Navigator>
            <Tab.Screen name="Home" options={{
                headerShown: false,
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
              }}>
                {(props) => <MainPage {...props} />}
            </Tab.Screen>
            <Tab.Screen name="Profile" options={{
                headerShown: false,
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
              }}>
                {(props) => <Scanner {...props} />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
