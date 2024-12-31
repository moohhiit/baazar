import { View, Text, SafeAreaView, TouchableOpacity, Alert, ScrollView, ProgressBarAndroid, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputField from './textArea'
import { useNavigation } from '@react-navigation/native';
import validator from "email-validator";
import auth, { sendEmailVerification } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';


export default function Register() {
    const [Email, setEamil] = useState("")
    const [Pass, setPass] = useState("")
    const [Name, setName] = useState("")
    const [Phone, setPhone] = useState('')
    const [emailcheck, setemailcheck] = useState(false)


    const Navigation = useNavigation()


    function RegisterAccount(e, p, n) {
        if (e.length == 0 && p.length == 0 && n.length == 0) {
            console.log("Fill All Field")
        }
        else {

            auth()
                .createUserWithEmailAndPassword(e, p)
                .then(async (userCred) => {
                    console.log('User account created & signed in!');
                    const user = userCred.user
                    await sendEmailVerification(user)
                    console.log("SucessFull Link Sned")
                    CreateDataBase(user.uid)


                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        Alert.alert('That email address is invalid!');
                    }
                });

        }
    }






    const CreateDataBase = (uid) => {

        firestore().collection('UserDetail').doc(uid).set({
            Name: Name,
            Email: Email,
            Phone: Phone,
            OrderList: [],
            IsBuy: [],
            UID: uid
        }).then(() => {
            console.log('DataBase Create')
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <SafeAreaView>
            <ScrollView>
                <View
                    style={{
                        padding: 10 * 2,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 60,
                            color: "#1F41BB",
                            fontFamily: "poppins-bold",
                            marginVertical: 10 * 3,
                            alignSelf: 'center'
                        }}
                    >
                        Resister!!!
                    </Text>
                    <Image source={require('../../assert/Image/Register.png')} style={{ height: 201, width: 250, alignSelf: 'center', margin: 10 }} />




                    <View
                        style={{
                            marginVertical: 10 * 3,
                        }}
                    >



                        <InputField placeholder="Name*" onChangeText={text => setName(text)} />
                        <InputField placeholder="Email*" onChangeText={text => {
                            setEamil(text)
                            let ev = validator.validate(text)
                            setemailcheck(ev)
                        }}
                        />
                        <InputField placeholder="Password*" onChangeText={text => setPass(text)} />
                        <InputField placeholder="Phone-Number*" onChangeText={text => setPhone(text)} maxLength={10} inputMode='tel' />

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
                        disabled={!emailcheck}
                        onPress={() => {
                            if (Email.length == 0 && Pass.length == 0 && Name.length == 0 && Phone.length == 0) {
                                Alert.alert("Please Fill All The Field")
                            }
                            else {
                                RegisterAccount(Email, Pass)
                                if (Error.length >= 0) {
                                    console.log(Error)
                                }
                                else {

                                }
                            }

                        }}

                    >

                        <Text
                            style={{
                                fontFamily: "poppins-bold",
                                color: "white",
                                textAlign: "center",
                                fontSize: 20,
                            }}
                        > Resister!!</Text>


                    </TouchableOpacity>


                    <TouchableOpacity

                        onPress={() => {
                            Navigation.goBack()
                        }}
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
                            }}
                        >
                            Login !
                        </Text>
                    </TouchableOpacity>


                </View>
            </ScrollView>
        </SafeAreaView>
    )
}