// @src/App.js
import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { Food } from '../models/Food';

type DonutPieProps = {
  scannedFood: Food;
};

const DonutPie: React.FC<DonutPieProps> = ({scannedFood}) => {
  const radius = 50;
  const circleWidth = 12;
  const circleCircumference = 2 * Math.PI * radius;

  const carbs = scannedFood?.carbs || 0;
  const fats = scannedFood?.fats || 0;
  const proteins = scannedFood?.protein || 0;
  const total = carbs + fats + proteins;

  const carbsPercentage = (carbs / total) * 100;
  const fatsPercentage = (fats / total) * 100;
  const proteinsPercentage = (proteins / total) * 100;

  const carbsStrokeDashoffset =
    circleCircumference - (circleCircumference * carbsPercentage) / 100;
  const fatsDashoffset =
    circleCircumference - (circleCircumference * fatsPercentage) / 100;
  const proteinStrokeDashoffset =
    circleCircumference - (circleCircumference * proteinsPercentage) / 100;

  const groceriesAngle = (carbs / total) * 360;
  const billsAngle = (fats / total) * 360;
  const regularAngle = groceriesAngle + billsAngle;

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
                strokeWidth={circleWidth}
              />
             ) : (
               <>
                 <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#f5cd98"
                  fill="transparent"
                  strokeWidth={circleWidth}
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
                  stroke="#f85252"
                  fill="transparent"
                  strokeWidth={circleWidth}
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={fatsDashoffset}
                  rotation={groceriesAngle}
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
                  strokeWidth={circleWidth}
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={proteinStrokeDashoffset}
                  rotation={regularAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
               </>
             )
            }
          </G>
        </Svg>
        <View style={styles.label}>
          <Text style={{fontSize: 22, fontWeight: "700"}}>{scannedFood?.calories}</Text>
          <Text style={{fontSize: 18, fontWeight: "400"}}>kcal</Text>
        </View>
      </View>
    </View>
  );
};

export default DonutPie ;


const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});