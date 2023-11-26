import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from './src/hooks/useAuth';

import Login from './src/views/Login';
import Register from './src/views/Register';
import Scanner from './src/views/Scanner';

const Stack = createNativeStackNavigator();

export default function App() {
  const { user } = useAuth();
  
  return <Scanner />
  if(!user){
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
  }else{
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Scanner} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
