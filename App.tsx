import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { MaterialCommunityIcons} from '@expo/vector-icons'; 
import { Text } from 'react-native';

import { useAuth } from './src/hooks/useAuth';

import Login from './src/views/auth/Login';
import Register from './src/views/auth/Register';
import Scanner from './src/views/utils/Scanner';
import { store } from './src/state/Store';
import { MainPage } from './src/views/MainPage';
import FoodDetail from './src/views/FoodDetail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const IconColor ="#303d53";
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
                tabBarLabel: ({ focused, color }) => (
                  <Text style={{ color: focused ? IconColor : color }}>Home</Text>
                ),
                tabBarIcon: ({ color, size, focused }) => (
                  <MaterialCommunityIcons
                    name="home"
                    color={focused ? IconColor : color}
                    size={size}
                  />
                ),
              }}>
                {(props) => <MainPage {...props} />}
            </Tab.Screen>
            <Tab.Screen name="Search" options={{
                headerShown: false,
                tabBarLabel: ({ focused, color }) => (
                  <Text style={{ color: focused ? IconColor : color }}>Search</Text>
                ),
                tabBarIcon: ({ color, size, focused }) => (
                  <MaterialCommunityIcons
                    name="magnify"
                    color={focused ? IconColor : color}
                    size={size}
                  />
                ),
                tabBarButton: () => null, // Hide the tab button

              }}>
                {(props) => <Scanner {...props} />}
            </Tab.Screen>
            <Tab.Screen name="Scanner" options={{
                headerShown: false,
                tabBarLabel: ({ focused, color }) => (
                  <Text style={{ color: focused ? IconColor : color }}>Scanner</Text>
                ),
                tabBarIcon: ({ color, size, focused }) => (
                  <MaterialCommunityIcons
                    name="barcode-scan"
                    color={focused ? IconColor : color}
                    size={size}
                  />
                ),
                tabBarButton: () => null, // Hide the tab button
              }}>
                {(props) => <Scanner {...props} />}
            </Tab.Screen>
            <Tab.Screen
              name="Details"
              options={{
                headerShown: false,
                tabBarLabel: ({ focused, color }) => (
                  <Text style={{ color: focused ? IconColor : color }}>Details</Text>
                ),
                tabBarIcon: ({ color, size, focused }) => (
                  <MaterialCommunityIcons
                    name="food"
                    color={focused ? IconColor : color}
                    size={size}
                  />
                ),
                tabBarButton: () => null, // Hide the tab button
              }}
            >
              {(props) => <FoodDetail {...props} />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
