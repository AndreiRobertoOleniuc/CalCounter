import { ScrollView, StyleSheet, Text, View ,Dimensions, TouchableHighlight, Image} from 'react-native';

import { MaterialCommunityIcons} from '@expo/vector-icons'; 
import { useDispatch, useSelector } from "react-redux";

import { setCurrentState, setUtilsPage } from "../state/appStateSlice";
import { RootState } from "../state/Store";
import NavigationProps from "../shared/models/NavigationProp";
import { setScannedOrSearchedFood } from '../state/foodSlice';


export function MainPage({navigation} : NavigationProps){
    const dispatch = useDispatch();
    const foods = useSelector((state: RootState) => state.food.food);

    const sections: {sectionName: string}[] = [
        {sectionName:"breakfast"},
        {sectionName:"lunch"},
        {sectionName:"dinner"},
        {sectionName:"snacks"},
    ]

    const addFood = (mealType: string) =>{
        dispatch(setUtilsPage("Search"))
        dispatch(setCurrentState("UTILS"));
        const emptyFood = {
            name: "",
            brand: "",
            nutriscore: "",
            image: "",
            unit: "",
            calories: "",
            carbs: "",
            fats: "",
            protein: "",
            mealType: mealType,
        };
        dispatch(setScannedOrSearchedFood(emptyFood));
    }

    const getSectionKcal = (sectionName: string) =>{
        let kcal = 0;
        foods.map((food)=>{
            if(food.mealType === sectionName){
                kcal += food.calories;
            }
        })
        return kcal;
    }
    return (
        <ScrollView>
            <View style={styles.home}>
                <View style={styles.homeTitle}>
                    <Text style={styles.titleDiary}>Diary</Text>
                    <Text style={styles.titleDate}>today</Text>
                    <MaterialCommunityIcons name="menu-down" color="black" size={24} />
                </View>
                <View style={styles.calorieDashboard}></View>
                {sections.map((section, i)=>{
                    return (
                        <View style={styles.foodSection} key={i}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>
                                    {section.sectionName}
                                </Text>
                                <View style={styles.sectionKcal}>
                                    <Text style={{fontSize:20, fontWeight:"600"}}>{getSectionKcal(section.sectionName)} </Text>
                                    <Text style={{fontSize:20, color:"#72727d", marginLeft: -8}}> kcal</Text> 
                                </View>
                            </View>
                            {foods.map((food, i)=>{
                                if(food.mealType === section.sectionName){
                                    return (
                                        <View key={i} style={styles.food}>
                                             <Image
                                                style={{
                                                    width: "14%",
                                                    aspectRatio: 1,
                                                    borderRadius: 10,
                                                    marginRight:10,
                                                }}
                                                source={{
                                                uri: food?.image,
                                                }}
                                            />
                                            <View style={{
                                                flexDirection: "row",
                                                justifyContent:"space-between",
                                                alignItems:"center",
                                                width:"80%",
                                            }}>
                                                <View style={{width: "60%"}}>
                                                    <Text style={{
                                                        width: "100%",
                                                        fontSize:15,
                                                        fontWeight:"600",
                                                    }}>{food.name}</Text>
                                                    <Text style={{
                                                        width: "100%",
                                                        fontSize:12,
                                                        color:"#a3a2b5",
                                                    }}>{food.brand}</Text>
                                                </View>
                                                <Text style={{
                                                    width: "20%",
                                                    textAlign:"right",
                                                    fontSize:15,
                                                    fontWeight:"500",
                                                }}>{food.calories}</Text>
                                            </View>
                                        </View>
                                    )
                                }
                            })}
                            <View style={styles.add}>
                                <View style={styles.horizonalSplit1} />
                                <TouchableHighlight  underlayColor="#edc793" style={styles.addFood} onPress={()=>addFood(section.sectionName)}>
                                    <Text style={styles.addFoodIcon}>+</Text>
                                </TouchableHighlight>
                                <View style={styles.horizonalSplit2} />
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
        backgroundColor:"#fffff9",
        paddingTop:60,
        minHeight: Dimensions.get('screen').height - 75,
    },
    homeTitle:{
        flexDirection: 'row', 
        marginHorizontal:"5%",
        alignItems:"center",        
    },
    titleDiary:{
        fontSize:30,
        color:"#211d2b",
        fontWeight:"bold",
        marginRight:10,
    },
    titleDate:{
        fontSize:30,
        color:"#282431",
    },
    calorieDashboard:{
        width: "92%",
        height: 200,
        backgroundColor:"#303d53",
        alignSelf: "center",
        marginTop: 20,
        borderRadius:10,
        marginBottom:20,
    },
    foodSection:{
        marginBottom:30,
    },
    add:{
        flexDirection: 'row', 
        alignItems: 'center'
    },
    addFood:{
        width: 50,
        height: 35,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#f5ce98",
        borderRadius:12,
    },
    addFoodIcon:{
        color:"#fefbf7",
        fontWeight:"bold",  
        fontSize:25,
    },
    horizonalSplit1:{
        flex: 1, 
        height: 2, 
        backgroundColor: '#eff0f5'
    },
    horizonalSplit2:{
        flex: 17, 
        height: 2, 
        backgroundColor: '#eff0f5'
    },
    sectionHeader:{
        flexDirection: 'row', 
        justifyContent:"space-between",
    },
    sectionTitle:{
        fontSize:20,
        color:"#282431",
        fontWeight:"600",
        marginHorizontal:"5%",
        marginBottom:20,
    },
    sectionKcal:{
        flexDirection: 'row',
        fontSize:15,
        color:"#282431",
        fontWeight:"500",
        marginHorizontal:"5%",
        marginBottom:0,
        textAlign:"right",
        verticalAlign:"center",
    },
    horizontalSplit:{
        width:"100%",
        height:1,
        backgroundColor:"#eff1f4",
        marginTop:-25,
        marginBottom:40,
    },
    food: {
        color:"#282431",
        marginHorizontal:"5%",
        flexDirection: 'row',
        justifyContent:"space-between",
        alignItems:"center",   
        marginBottom:12,
        borderColor: "white",
        borderWidth:1,
        paddingBottom:10
    }
});