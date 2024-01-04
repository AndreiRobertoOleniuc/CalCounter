import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { setCurrentState } from "../../state/appStateSlice";
import { MaterialCommunityIcons} from '@expo/vector-icons'; 

export default function BackButton({color = "black"}) {
    const dispatch = useDispatch();

    return (
        <TouchableOpacity onPress={()=>dispatch(setCurrentState("HOME"))} className="absolute top-12 left-5 ">
            <MaterialCommunityIcons name="arrow-left" color={color} size={24}/>
        </TouchableOpacity>
    )
}