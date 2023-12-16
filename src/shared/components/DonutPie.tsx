// @src/App.js
import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { Food } from '../models/Food';

type DonutPieProps = {
  scannedFood: Food;
};

const DonutPie: React.FC<DonutPieProps> = ({scannedFood}) => {
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  const carbs = scannedFood?.carbs || 33;
  const fats = scannedFood?.fats || 33;
  const protein = scannedFood?.protein || 33;
  const total = carbs + fats + protein;

  const carbsPercentage = (carbs / total) * 100;
  const fatsPercentage = (fats / total) * 100;
  const proteinPercentage = (protein / total) * 100;
  
  const carbsStrokeDashoffset =
    circleCircumference - (circleCircumference * carbsPercentage) / 100;
  const fatsStrokeDashoffset =
    circleCircumference - (circleCircumference * fatsPercentage) / 100;
  const proteinStrokeDashoffset =
    circleCircumference - (circleCircumference * proteinPercentage) / 100;

  const carbsAngle = (carbs / total) * 360;
  const fatsAngle = (fats / total) * 360;
  const proteinAngle = carbsAngle + fatsAngle;

  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height="160" width="160" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            { total === 0 ? (
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#F1F6F9"
                fill="transparent"
                strokeWidth="40"
              />
             ) : (
               <>
                 <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#f5cd98"
                  fill="transparent"
                  strokeWidth="20"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={carbsStrokeDashoffset}
                  rotation={0}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                 />
                 <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#53e38c"
                  fill="transparent"
                  strokeWidth="20"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={fatsStrokeDashoffset}
                  rotation={fatsAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                 />
                 <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#f85252"
                  fill="transparent"
                  strokeWidth="20"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={proteinStrokeDashoffset}
                  rotation={proteinAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
               </>
             )
            }
          </G>
        </Svg>
        <View style={styles.labelContainer}>
          <Text style={{fontSize: 22, fontWeight: "700"}}>{total}</Text>
          <Text style={{fontSize: 18, fontWeight: "300"}}>kcal</Text>
        </View>
      </View>
    </View>
  );
};

export default DonutPie ;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer: {
    position: "absolute",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});