import { View ,Text, Image, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import NavigationProps from "../shared/models/NavigationProp";
import { useSelector } from "react-redux";
import { RootState } from "../state/Store";
import { useEffect } from "react";
import { MaterialCommunityIcons} from '@expo/vector-icons'; 
import DonutPie from "../shared/components/DonutPie";
import HorizontalBarChart from "../shared/components/HorizontalBarChart";

export default function FoodDetail({navigation} : NavigationProps) {
    const scannedFood = useSelector((state: RootState) => state.food.scannedOrSearchedFood);
    useEffect(()=>{
        console.log(scannedFood);
    },[])

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
                        justifyContent: "flex-end",
                        borderColor: "#a3a2b5",
                        borderWidth: 1,
                    }}>
                        <HorizontalBarChart scannedFood={scannedFood} target="carbs"/>
                        <HorizontalBarChart scannedFood={scannedFood} target="fat"/>
                        <HorizontalBarChart scannedFood={scannedFood} target="protein"/>
                        <DonutPie scannedFood={scannedFood}/>
                    </View>
                    {/* <Text>{scannedFood?.nutriscore}</Text> */}
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
        height: Dimensions.get('screen').height - 280,
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
});
