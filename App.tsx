import { Button, StyleSheet, Text, View } from 'react-native';

import { useAuth, auth } from './src/hooks/useAuth';
import { createUserWithEmailAndPassword } from "firebase/auth";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/views/Login';
import Register from './src/views/Register';

const Stack = createNativeStackNavigator();

export default function App() {
  const { user } = useAuth();

  const createUser = () => {
    createUserWithEmailAndPassword(auth, "andreioleniucroberto@gmail.com", "123456")
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => { 
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    }
    );
  }
  
  if(!user){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login"  component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }else{
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
