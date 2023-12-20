import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import NavigationProps from '../shared/models/NavigationProp';

const Profile = ({navigation}: NavigationProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');

  return (
    <View>
      <Text>Name:</Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text>Weight:</Text>
      <TextInput
        value={weight}
        onChangeText={(text) => setWeight(text)}
      />

      <Text>Height:</Text>
      <TextInput
        value={height}
        onChangeText={(text) => setHeight(text)}
      />

      <Text>Gender:</Text>
      <TextInput
        value={gender}
        onChangeText={(text) => setGender(text)}
      />

      <Button title="Save Profile" onPress={() => {}} />
    </View>
  );
};

export default Profile;