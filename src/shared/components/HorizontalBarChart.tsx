import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { Food } from '../models/Food';

type DonutPieProps = {
    scannedFood: Food;
    target: string;
  };

const HorizontalBarChart: React.FC<DonutPieProps> = ({scannedFood,target}) => {
    const data = Object.entries(scannedFood).find(([key, value]) => key === target);
    const total = scannedFood.carbs + scannedFood.fats + scannedFood.protein;
    const color = target === "carbs" ? "#f5cd98" : target === "fats" ? "#f85252" : "#53e38c";
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 18, fontWeight: '600', color: '#221f2c', marginBottom: 2}}>{data[1]}g</Text>
            <Text style={{fontSize: 12, fontWeight: '400', color: '#a1a2a9'}}>{target.charAt(0).toUpperCase() + target.slice(1)}</Text>
            {/* Add Progress bar with percentage make it only 70 width*/}
            <View style={{width: 65, height: 10, backgroundColor: '#ddd', borderRadius: 20, marginTop: 5, marginBottom: 5}}>
                <View style={{width: Math.floor(data[1] / total * 65), height: 10, backgroundColor: color, borderRadius: 20}}></View>
            </View>
            <Text style={{fontSize: 12, fontWeight: '400', color: '#a1a0a7'}}>{Math.floor(data[1] / total * 100)} %</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
});

export default HorizontalBarChart ;
