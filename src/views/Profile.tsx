import React, { useEffect } from 'react';
import { Text, View, Image, Switch } from "react-native"
import { useColorScheme } from "nativewind";
import NavigationProps from '../shared/models/NavigationProp';
import { MaterialCommunityIcons} from '@expo/vector-icons'; 

import { useSelector } from 'react-redux';
import { selectUser } from '../state/userSlice';
import { User } from '../shared/models/User';


export default function Profile({ navigation }: NavigationProps) {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const user: User = useSelector(selectUser);
  useEffect(() => {
  }, [user, colorScheme]);

  const isDarkMode = () => {
    return colorScheme === 'dark';
  }
  return (
    <View className={`w-full h-full ${isDarkMode() ? "bg-slate-800 ": "bg-slate-100 "}pt-20 flex items-center`}>
      <View className={`w-11/12  ${isDarkMode() ? "bg-slate-600  ": "bg-slate-300 "}rounded-lg shadow-sm p-5 mb-10 flex-row justify-between`}>
        <Image source={{uri: user?.img,}} className="w-20 h-20 rounded-full"/>
        <View className='mr-10 flex-col'>
          <Text className={`text-2xl font-bold ${isDarkMode() ?  'text-slate-100' :'text-slate-800'} `}>
            {user.firstName}
          </Text>
          <Text className={`text-sm font-light ${isDarkMode() ? 'text-slate-100' : 'text-slate-800'}`}>
            {user.weight} kg - {user.height} cm
          </Text>
        </View>
        <MaterialCommunityIcons name="cog-outline" color={colorScheme == 'dark' ? 'white': 'black'} size={24}/>
      </View>

      
      <Switch
        value={isDarkMode()}
        onValueChange={toggleColorScheme}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkMode() ? "#f5dd4b" : "#f4f3f4"}
        className=""
      />
      <Text className={`text-2xl font-bold mt-5 ${isDarkMode() ?  'text-slate-100' :'text-slate-800'} `}>
        Dark Mode
      </Text>
    </View>
  );
}