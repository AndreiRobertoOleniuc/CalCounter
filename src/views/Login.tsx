import { StyleSheet, Text, View,TextInput,TouchableOpacity } from "react-native";
import React,{useState} from "react";
import NavigationProps from "../shared/types/NavigationProp";

export default function Login({navigation} : NavigationProps){
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const login = ()=>{
    }
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>CalCounter</Text>
            </View>
            <View>
                <Text style={styles.greet}>Welcome</Text>
                <TextInput placeholder="Email" style={styles.input}/>
                <TextInput placeholder="Passwort" style={styles.input} secureTextEntry={true}/>  
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.login} >
                    <Text style={styles.whiteText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpContainer}>
                    <Text>No Account? </Text>
                    <Text style={styles.signUp} onPress={()=>{navigation.navigate("Register")}}>Register</Text>
                </TouchableOpacity>
                <Text style={{color:"red"}}></Text>
            </View>
        </View>
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
        marginBottom:150,
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
        alignSelf:"center",
        marginBottom:50,
    },
    login:{
        borderRadius:20,
        backgroundColor:"black",
        height:40,
        padding:12,
        width:320,
        marginTop:10,
        marginBottom:10,
        alignItems:"center"
    },
    btnContainer:{
        flex:1,
        flexDirection:"column",
        alignItems:"center",
    },  
    whiteText:{
        color:"white",
    },
    signUpContainer:{
        flexDirection:"row",
    },
    signUp:{
        color:"blue",
    }
});
