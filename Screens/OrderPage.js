import { View, Text, FlatList, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CheckBox from '@react-native-community/checkbox';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import OrderPageCard from '../Components/OrderPageComponent/OrderPageCard';
export default function OrderPage() {
    const [orderArry, setorderArry] = useState([])
    const [uid, setuid] = useState('')





   
    useEffect(() => {

        const subscriber = auth().onAuthStateChanged((user) => {
            setuid(user.uid)
        });
        return subscriber
    }, [])


    useEffect(() => {
        // Get a reference to the document you want to listen for changes
        const documentRef = firestore().collection('UserDetail').doc(uid);

        // Subscribe to real-time updates for the document
        const unsubscribe = documentRef.onSnapshot(snapshot => {
            // Get the updated data from the snapshot
            const updatedData = snapshot.data();
            setorderArry(updatedData.OrderList);
        });

        // Clean up function to unsubscribe from the listener when component unmounts
        return () => unsubscribe();
    }, [uid]);


    return (
        <View>

            <FlatList
                inverted={true}
                data={orderArry}
                renderItem={({ item }) => {
                    return (
                        <>
                            {
                                item == null ? <Text>
                                    Loading
                                </Text> : <OrderPageCard OrderDetail={item} />
                            }

                        </>
                    )
                }}
            />


        </View>
    )
}


