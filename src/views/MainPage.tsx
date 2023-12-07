import NavigationProps from "../shared/models/NavigationProp";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View ,Dimensions} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

export function MainPage({navigation} : NavigationProps){
    const sections: {sectionName: string}[] = [
        {sectionName:"breakfast"},
        {sectionName:"lunch"},
        {sectionName:"dinner"},
        {sectionName:"snacks"},
    ]

    const addFood = () =>{
        navigation.navigate("Scanner")
    }
    return (
        <ScrollView>
            <View style={styles.home}>
                <View style={styles.calorieDashboard}></View>
                {sections.map((section)=>{
                    return (
                        <View>
                            <View style={styles.foodSection}>
                                <Text style={styles.sectionTitle}>{section.sectionName}</Text>
                                <TouchableOpacity style={styles.addFood} onPress={addFood}>
                                    <MaterialIcons name="add-circle" size={32} color="#f5ce98" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    home:{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        backgroundColor:"#fffff9",
    },
    calorieDashboard:{
        width: "90%",
        height: 200,
        backgroundColor:"#333332",
        alignSelf: "center",
        marginTop: 20,
        borderRadius:10,
        marginBottom:20,
    },
    foodSection:{
        marginBottom:10,
        marginHorizontal:"5%",
    },
    addFood:{
        marginTop:10,
        width: 32,
        height: 32,
        alignItems:"center",
        justifyContent:"center",
    },
    addFoodIcon:{
        color:"#ffffff",
        fontWeight:"bold"
    },
    sectionTitle:{
        fontSize:20,
        color:"#211e2c",
        fontWeight:"500",
    },
    horizontalSplit:{
        width:"100%",
        height:1,
        backgroundColor:"#eff1f4",
        marginTop:-25,
        marginBottom:40,
    }
});