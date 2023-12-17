import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useSelector } from 'react-redux';
import { MaterialCommunityIcons} from '@expo/vector-icons'; 
import { Text } from 'react-native';

import Login from './src/views/auth/Login';
import Register from './src/views/auth/Register';
import Scanner from './src/views/utils/Scanner';
import { RootState, store } from './src/state/Store';
import { MainPage } from './src/views/MainPage';
import FoodDetail from './src/views/FoodDetail';
import Search from './src/views/utils/FoodSearch';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const IconColor ="#303d53";

function App() {
  const currentState = useSelector((state: RootState) => state.appState.currentState);
  const utilSector = useSelector((state: RootState) => state.appState.utilsPage);

  useEffect(() => {
  }, [currentState,utilSector]);

  switch (currentState) {
    case "HOME":
      return (
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
          </Tab.Navigator>
        </NavigationContainer>
      )
    case "LOGIN":
      return (
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
      )
    case "UTILS":
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={utilSector}>
            <Stack.Screen name="Search" options={{
                headerShown: false,
              }}>
                {(props) => <Search {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Scanner" options={{
                headerShown: false
              }}>
                {(props) => <Scanner {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Details"
              options={{
                headerShown: false,
              }}
            >
              {(props) => <FoodDetail {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      )
  }
}


export default function AppWithStore() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}