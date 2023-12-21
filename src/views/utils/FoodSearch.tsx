import { Text, View , TouchableHighlight} from 'react-native';
import NavigationProps from '../../shared/models/NavigationProp';
import BackButton from '../../shared/components/BackButton';


export default function Search({navigation} : NavigationProps) {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text>Search</Text>
            <TouchableHighlight onPress={() => navigation.navigate("Scanner")}>
                <Text>Scanner</Text>
            </TouchableHighlight>

            <BackButton/>
        </View>
    );
}