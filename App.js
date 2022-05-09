import React, {useEffect} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert, KeyboardAvoidingView, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


const uri = 'https://ak.picdn.net/shutterstock/videos/1060308725/thumb/1.jpg'
const profilePicture = 'https://randomuser.me/api/portraits/men/34.jpg'

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

  function LoginScreen() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleCreateAccount = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Account created!')
        const user = userCredential.user;
        console.log(user)
      })
      .catch(error => {
        console.log(error)
        Alert.alert(error.message)
      })
    }

    const handleSignIn = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed in!')
        const user = userCredential.user;
        console.log(user)
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error)
      })
    }


    return (
      
      <View style={styles.container} >
        <Image source={require('./assets/fondoLogin.jpg')} 
               style={[styles.image, StyleSheet.absoluteFill]} />
        <ScrollView contentContainerStyle= {{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>  
         <Image source={require('./assets/logoInpromel.png')}
                style={{marginTop:48, marginBottom:24, borderRadius:5}} />
              <View style={styles.input}>
                <Image source={require('./assets/mail_FILL0_wght400_GRAD0_opsz48.png')}/>
                <TextInput onChangeText={(text) => setEmail(text)}  placeholder="Email" style={{marginStart:10, fontSize:16}}/>
              </View>
              <View style={styles.input}>
                <Image source={require('./assets/vpn_key_FILL0_wght400_GRAD0_opsz48.png')}/>
                <TextInput onChangeText={(text) => setPassword(text)} placeholder="Contraseña" secureTextEntry={true} style={{marginStart:10, fontSize:16}}/>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={handleSignIn} 
                                  style={[styles.loginButton1]}>
                  <Text style={{fontSize: 15, fontWeight: '200', color: 'white'}}>Limpiar Campos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCreateAccount} 
                                  style={styles.loginButton2}>
                  <Text style={{fontSize: 15, fontWeight: '200', color: 'white'}}>Iniciar Sesión</Text>
                </TouchableOpacity>
              </View>  

        </ScrollView>
      </View>
    );
  }

  const Stack = createNativeStackNavigator();
  
  export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" 
                      component={LoginScreen}  
                      options={{headerShown: false}} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Math.round(Dimensions.get('window').height)+50
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  login: {
    width: 350,
    height: 200,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 30
  },
  input: {
    width: 350,
    height: 60,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 8,
    flexDirection:'row',
    alignItems:'center'

  },
  loginButton1: {
    width: 170,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#06198e',
    borderWidth: 1,
    backgroundColor: '#06198e',
    marginEnd:4
  },
  loginButton2: {
    width: 170,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#06198e',
    borderWidth: 1,
    backgroundColor: '#06198e',
    marginStart:4,
    marginBottom:200
  }

});
