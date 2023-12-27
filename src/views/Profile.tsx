import React, { useEffect } from 'react';
import { Pressable, Text, View } from "react-native"
import { useColorScheme } from "nativewind";
import NavigationProps from '../shared/models/NavigationProp';
import { MaterialCommunityIcons} from '@expo/vector-icons'; 

import { styled } from "nativewind";
import { useSelector } from 'react-redux';
import { selectUser } from '../state/userSlice';

const StyledPressable = styled(Pressable)
const StyledText = styled(Text)
const StyledView = styled(View)

function Profile({ navigation }: NavigationProps) {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const user = useSelector(selectUser);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <StyledView className="w-full h-full dark:bg-slate-800 pt-20 flex items-center">
      <StyledView className="w-11/12 bg-slate-200 dark:bg-slate-600 rounded-lg shadow-sm p-5 mb-10 flex-row justify-between">
        <StyledView className="w-20 h-20 bg-slate-600 dark:bg-slate-300 rounded-full"/>
        <StyledText className='text-2xl font-bold text-slate-800 dark:text-slate-100 mr-20'>{user.firstName}</StyledText>
        <MaterialCommunityIcons name="cog-outline" color={colorScheme == 'dark' ? 'white': 'black'} size={24}/>
      </StyledView>
      
      <StyledPressable
      onPress={toggleColorScheme}
      className=""
      >
        <MaterialCommunityIcons name="theme-light-dark" color={colorScheme == 'dark' ? 'white': 'black'} size={24}/>
      </StyledPressable>
    </StyledView>
  );
}

export default Profile;