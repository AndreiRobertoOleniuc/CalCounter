import React,{useState} from "react";
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

export default function Register(){
    const navigation = useNavigation();

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const [fail,setFaile] = useState(null);
    const register = ()=>{
        
    }

    const goToLogin = ()=>{
    }
    return(
        <KeyboardAwareScrollView contentContainerStyle={styles.container} bounces={false}>
            <View>
                <Text style={styles.title}>CalCounter</Text>
            </View>
            <View>
                <Text style={styles.greet}>Register your Account</Text>
                <Text style={styles.describe}>Email</Text>
                <TextInput placeholder="Email" style={styles.input}/>
                <Text style={styles.describe}>Password</Text>
                <TextInput placeholder="Passwort" style={styles.input} secureTextEntry={true}/>  
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.register} onPress={register}>
                    <Text style={styles.whiteText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginContainer}>
                    <Text>Do you already have an account? </Text>
                    <Text style={styles.login}>go to Login</Text>
                </TouchableOpacity>
                <Text style={{color:"red"}}>{(fail==null)?null:fail}</Text>
            </View>
        </KeyboardAwareScrollView>
    )
}

//Styling
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:"column",
        alignItems:"center",
        backgroundColor:"#f5f5f5",        
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop:100,
        marginBottom:50,
    },
    input:{
        height:40,
        width:320,
        borderRadius:10,
        backgroundColor:"#dedcdc",
        padding:12,
        marginBottom:10,
    }, 
    greet:{
        margin:5,
        opacity:0.5,
        fontSize:20,
        marginBottom:30,
    },
    register:{
        borderRadius:20,
        backgroundColor:"black",
        height:40,
        padding:12,
        width:320,
        marginTop:5,
        marginBottom:10,
        alignItems:"center",
    },
    btnContainer:{
        flex:1,
        flexDirection:"column",
        alignItems:"center",
    },  
    whiteText:{
        color:"white",
    },
    loginContainer:{
        flexDirection:"row",
    },
    login:{
        color:"grey",
    },
    describe:{
        margin:5,
        opacity:0.5,
    }
});
