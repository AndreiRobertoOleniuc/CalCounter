import React,{useState} from "react";
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationProps from "../../shared/models/NavigationProp"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

export default function Register({navigation} : NavigationProps){

    const [email,setEmail] = useState<string>();
    const [password,setPassword] = useState<string>();

    const [fail,setFaile] = useState(null);

    const register = () => {
        if(email == null || password == null) {
            setFaile("Please enter a valid email and password");
        } else {
            createUserWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                const errorMessage = error.message;
                setFaile(errorMessage);
            });
        }
    }
    return(
        <KeyboardAwareScrollView contentContainerStyle={styles.container} bounces={false}>
            <View>
                <Text style={styles.title}>CalCounter</Text>
            </View>
            <View>
                <Text style={styles.greet}>Register your Account</Text>
                <Text style={styles.describe}>Email</Text>
                <TextInput placeholder="Email" style={styles.input} onChangeText={(value)=>{setEmail(value)}}/>
                <Text style={styles.describe}>Password</Text>
                <TextInput placeholder="Passwort" style={styles.input} secureTextEntry={true} onChangeText={(value)=>{setPassword(value)}}/>  
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.register} onPress={register}>
                    <Text style={styles.whiteText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginContainer}>
                    <Text>Do you already have an account? </Text>
                    <Text style={styles.login} onPress={()=>{navigation.goBack()}}>go to Login</Text>
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
        marginBottom:100,
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
        marginBottom:50,
        alignSelf:"center"
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
        color:"blue",
    },
    describe:{
        margin:5,
        opacity:0.5,
    }
});
