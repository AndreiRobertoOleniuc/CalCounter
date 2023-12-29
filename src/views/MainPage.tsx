import { ScrollView, Text, View, TouchableHighlight, Image, TouchableOpacity} from 'react-native';

import { MaterialCommunityIcons} from '@expo/vector-icons'; 
import { useDispatch, useSelector } from "react-redux";
import { useColorScheme } from "nativewind";

import { setCurrentState, setUtilsPage } from "../state/appStateSlice";
import { RootState } from "../state/Store";
import NavigationProps from "../shared/models/NavigationProp";
import { setScannedOrSearchedFood } from '../state/foodSlice';
import { NativeWindStyleSheet } from "nativewind";


export function MainPage({navigation} : NavigationProps){
    const { colorScheme } = useColorScheme();
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

    const goToDetailPage = (id: number) =>{
        const food = foods[id];
        dispatch(setScannedOrSearchedFood(food));
        dispatch(setUtilsPage("Details"))
        dispatch(setCurrentState("UTILS"));
    }

    const isDarkMode = () => {
        return colorScheme === 'dark';
      }
    return (
        <ScrollView className={`${isDarkMode() ? "bg-slate-800 ": "bg-slate-100 "}`}>
            <View className={`w-full pt-16 ${isDarkMode() ? "bg-slate-800 ": "bg-slate-100 "}`}>
                <View className={`flex-row ml-5 items-center`}>
                    <Text className={`text-3xl font-bold mr-2 ${isDarkMode() ?  'text-slate-100' :'text-slate-800'}`}>Diary</Text>
                    <Text className={`text-3xl mr-2 ${isDarkMode() ?  'text-slate-400' :'text-slate-800'}`}>today</Text>
                    <MaterialCommunityIcons name="menu-down" color={isDarkMode() ? "white": "black"} size={24} />
                </View>
                <View className={`w-11/12 h-40 self-center mt-6 mb-8 rounded-md ${isDarkMode() ?  'bg-slate-700' :'bg-slate-400'}`}></View>
                {sections.map((section, i)=>{
                    return (
                        <View className={`mb-6`} key={i}>
                            <View className={`flex-row justify-between`}>
                                <Text className={`text-lg font-semibold ml-5 mb-5 ${isDarkMode() ?  'text-slate-200' :'text-slate-800'}`}>
                                    {section.sectionName}
                                </Text>
                                <View className={`flex-row mr-5`}>
                                    <Text className={`text-lg font-semibold ${isDarkMode() ?  'text-slate-200' :'text-slate-800'}`}>{getSectionKcal(section.sectionName)} </Text>
                                    <Text className={`text-lg font-light ${isDarkMode() ?  'text-slate-200' :'text-slate-800'}`}> kcal</Text> 
                                </View>
                            </View>
                            {foods.map((food, i)=>{
                                if(food.mealType === section.sectionName){
                                    return (
                                        <TouchableOpacity onPress={()=>{goToDetailPage(i)}}>
                                            <View key={i} className={`mr-5 ml-5 mb-5 flex-row justify-between pb-2`}>
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
                                                <View className={`flex-row justify-between items-center w-4/5`}>
                                                    <View className='w-3/5'>
                                                        <Text className={`w-full font-semibold text-base ${isDarkMode() ?  'text-slate-200' :'text-slate-800'}`}>{food.name}</Text>
                                                        <Text className={`text-xs w-full text-slate-400`}>{food.brand}</Text>
                                                    </View>
                                                    <Text className={`w-1/5 text-right text-base font-medium ${isDarkMode() ?  'text-slate-200' :'text-slate-800'}`}>{food.calories}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            })}
                            <View className={`flex-row items-center`}>
                                <View className={`h-0.5 w-5 ${isDarkMode() ? 'bg-slate-700' : 'bg-slate-300'}`} />
                                <TouchableHighlight  underlayColor="#edc793" className={`w-12 h-7 bg-orange-300 items-center rounded-lg`} onPress={()=>addFood(section.sectionName)}>
                                    <Text className={`font-bold text-lg text-white`}>+</Text>
                                </TouchableHighlight>
                                <View className={`h-0.5 w-5/6 ${isDarkMode() ? 'bg-slate-700' : 'bg-slate-300'}`} />
                            </View>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}

NativeWindStyleSheet.setOutput({
    default: "native",
  });