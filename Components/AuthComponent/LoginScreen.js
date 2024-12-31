import { View, Text, SafeAreaView, TouchableOpacity, Alert, Dimensions, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import InputField from './textArea'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function LoginScreen() {
    const [Email, setEamil] = useState('')
    const [Pass, setPass] = useState('')

    const LoginUser = (Email, Pass) => {
        if (Email.length == 0 && Pass.length == 0) {
            Alert.alert('Please Fill the InputField !!')
        }
        else {

            auth().signInWithEmailAndPassword(Email, Pass).then((userData) => {
                console.log('Login', userData.user.emailVerified)
                console.log(userData.user.uid)
                if (userData.user.emailVerified == false) {
                    Alert.alert('Your Email Is Not verifyed !!! Please Check inbox In Email and verify')
                }
                else {
                    console.log("Login Page your email is verifyed")
                    Navigation.navigate('CreateShop', {
                        UID: userData.user.uid
                    })
                }
            }).catch((err) => {
                if (err.code === 'auth/invalid-credential') {
                    Alert.alert('Please !! Check Something is wrong');
                }


            })
        }
    }
    const windowHeight = Dimensions.get('window').height;
      const Navigation = useNavigation()
    return (
        <SafeAreaView>
            <ScrollView>

                <View
                    style={{
                        padding: 10 * 1, height: windowHeight
                    }}
                >
                    <View
                        style={{
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 60,
                                color: "#1F41BB",
                                fontFamily: "poppins-bold",
                                marginVertical: 10 * 3,
                            }}
                        >
                            Login !
                        </Text>

                    </View>
                    <Image source={require('../../assert/Image/Login.png')} style={{ height: 250, width: 250, alignSelf: 'center' }} >

                    </Image>



                    <View
                        style={{
                            marginVertical: 10 * 3,
                        }}
                    >
                        <InputField placeholder="Email*" onChangeText={text => setEamil(text)} />
                        <InputField placeholder="Password" onChangeText={text => setPass(text)} />
                    </View>

                    <View>
                        <Text
                            style={{
                                fontFamily: "poppins-semiBold",
                                fontSize: 14,
                                color: "#1F41BB",
                                alignSelf: "flex-end",
                            }}
                        >
                            Forgot your password ?
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={{
                            padding: 10 * 2,
                            backgroundColor: "#FCD499",
                            marginVertical: 10 * 3,
                            borderRadius: 10,
                            shadowColor: "#1F41BB",
                            shadowOffset: {
                                width: 0,
                                height: 10,
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: 10,
                        }}
                        onPress={() => {
                            LoginUser(Email, Pass)
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "poppins-bold",
                                color: "black",
                                textAlign: "center",
                                fontSize: 20,
                            }}
                        >
                            Login !!
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                          onPress={() => Navigation.navigate("Register")}
                        style={{
                            padding: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "poppins-semiBold",
                                color: "black",
                                textAlign: "center",
                                fontSize: 14,
                                marginTop:-20
                            }}
                        >
                            Create new account
                        </Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            marginVertical: 10 * 3,
                        }}
                    >


                        <View
                            style={{
                                marginTop: 10,
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                        >

                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView >
    )
}

