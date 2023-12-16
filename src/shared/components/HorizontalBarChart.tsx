import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { Food } from '../models/Food';

type DonutPieProps = {
    scannedFood: Food;
    target: string;
  };

const HorizontalBarChart: React.FC<DonutPieProps> = ({scannedFood,target}) => {
    return (
        <View style={styles.container}>
            <Text>b</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ddd',
    },
});

export default HorizontalBarChart ;
