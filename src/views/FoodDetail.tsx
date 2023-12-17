import { View ,Text, Image, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import NavigationProps from "../shared/models/NavigationProp";
import { useSelector } from "react-redux";
import { RootState } from "../state/Store";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons} from '@expo/vector-icons'; 
import DonutPie from "../shared/components/DonutPie";
import HorizontalBarChart from "../shared/components/HorizontalBarChart";
import { Picker } from '@react-native-picker/picker';

export default function FoodDetail({navigation} : NavigationProps) {
    const scannedFood = useSelector((state: RootState) => state.food.scannedOrSearchedFood);
    
    useEffect(()=>{
        console.log(scannedFood);
    },[scannedFood])

    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('unit1');

    if(scannedFood === null){
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
            >
                <DonutPie scannedFood={scannedFood}/>
            </View>
        )
    }else{
        return (
            <View>
                {scannedFood?.image !== undefined ? (
                    <Image
                        style={{
                            width: "100%",
                            aspectRatio: 1,
                        }}
                        source={{
                        uri: scannedFood?.image,
                        }}
                    />
                ): (
                    <Image
                        style={{
                            width: "100%",
                            aspectRatio: 1,
                        }}
                        source={{
                        uri: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                        }}
                    />
                )}
                <View style={styles.foodDetail}>
                    <View style={{
                        flexDirection: "row",
                        marginBottom: 5,
                        flexWrap: "wrap",                      
                    }}>
                        {scannedFood.name.split(" ").map((word, i)=>{
                            return <Text key={i} style={{
                                fontSize: 30,
                                fontWeight: i == 0 ? "bold" : "normal",
                                color: "#303d53",
                            }}>{word}</Text>
                        })}
                    </View>
                    <Text style={{
                        fontSize: 15,
                        color: "#a3a2b5",
                        marginBottom: 10,
                    }}>
                        {scannedFood?.brand}
                    </Text>
                    <View style={{
                        width: "100%",
                        marginBottom: 10,
                        flexDirection: "row",
                        marginTop: -30
                    }}>
                        <HorizontalBarChart scannedFood={scannedFood} target="carbs"/>
                        <HorizontalBarChart scannedFood={scannedFood} target="fats"/>
                        <HorizontalBarChart scannedFood={scannedFood} target="protein"/>
                        <DonutPie scannedFood={scannedFood}/>
                    </View>
                    <View style={styles.actionSection}>
                        <Text style={styles.actionSectionTitle}>
                            serving size
                        </Text>
                        <Text style={styles.actionSectionTitle}>
                            {scannedFood?.unit}
                        </Text>
                    </View>
                    <View style={styles.actionSection}>
                        <Text style={styles.actionSectionTitle}>
                            serving
                        </Text>
                        {isPickerOpen ? (
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 50, width: 50, backgroundColor: "#303d53" }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedValue(itemValue);
                                    setIsPickerOpen(false);
                                }}
                            >
                                <Picker.Item label="Unit 1" value="unit1" />
                                <Picker.Item label="Unit 2" value="unit2" />
                                {/* Add more units as needed */}
                            </Picker>
                        ) : (
                            <TouchableOpacity onPress={() => setIsPickerOpen(true)}>
                                <Text style={styles.actionSectionTitle}>{selectedValue}</Text>
                            </TouchableOpacity>
                        )}                       
                    </View>
                    <View style={styles.actionSection}>
                        <Text style={styles.actionSectionTitle}>
                            meal
                        </Text>
                        <Text style={styles.actionSectionTitle}>
                            breakfast
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{
                        position: "absolute",
                        top: 50,
                        left: 20,
                    }}>
                    <MaterialCommunityIcons name="arrow-left" color="black" size={24}/>
                </TouchableOpacity>
            </View>
        )   
    }
}
const styles = StyleSheet.create({
    foodDetail:{
        marginTop:100,
        width: "100%",
        height: Dimensions.get('screen').height,
        backgroundColor: "#fcfdff",
        borderRadius:30,
        position: "absolute",
        top: 150,
        left: 0,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.55,
        shadowRadius: 3.84,
        elevation: 5,
    },
    actionSection:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        borderColor: "white",
        borderBottomColor: "#e0e0e0",
        borderWidth: 1,
        padding: 10
    },
    actionSectionTitle: {
        fontSize: 15,
                            color: "#303d53",
    }
});
