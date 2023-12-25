import React, { useState } from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import NavigationProps from '../shared/models/NavigationProp';

export default function Profile({ navigation }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <View style={tw`bg-slate-800 w-full h-full pt-20`}>
      <View style={tw`flex flex-row justify-center items-center`}>
        <Text style={tw`text-white text-3xl font-bold`}>Profile</Text>
      </View>
    </View>
  );
}
