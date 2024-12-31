import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function EditProfile() {
    const [Uid, setUid] = useState('')
    const [UserData, setUserData] = useState(null)




    useEffect(() => {
        // Get a reference to the document you want to listen for changes
        const documentRef = firestore().collection('UserDetail').doc(Uid);

        // Subscribe to real-time updates for the document
        const unsubscribe = documentRef.onSnapshot(snapshot => {
            // Get the updated data from the snapshot
            const updatedData = snapshot.data();
            setUserData(updatedData);
        });

        // Clean up function to unsubscribe from the listener when component unmounts
        return () => unsubscribe();
    }, [Uid]);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            setUid(user.uid)
        });

    }, [])

    return (
        <View>
            {UserData != null ?

                <View>
                    <View>
                        <View style={{ backgroundColor: '#F6FCF2', height: 100, flexDirection: 'row', padding: 10 }} >


                            <Image source={require('../assert/Image/UserProfile.png')} style={{ borderRadius: 100, height: 120, width: 90, }}></Image>


                            <View style={{ padding: 10 }} >
                                <Text style={{ color: 'black', fontSize: 18 }} >{UserData.Name}</Text>
                                <Text style={{ color: 'black', fontSize: 10 }} > +91  {UserData.Phone}</Text>
                                <Text style={{ color: 'black', fontSize: 10 }} >  {UserData.Email}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-around', padding: 20 }} >
                        <View style={{ borderRightWidth: 1, padding: 10 }}  >
                            <Text style={{ fontSize: 18, color: 'black' }} >
                                Total Order
                            </Text>
                            <Text style={{ fontSize: 18, color: 'black', alignSelf: 'center' }} >
                                {UserData.IsBuy.length}
                            </Text>

                        </View>
                        <View style={{ borderLeftWidth: 1, padding: 10 }}  >
                            <Text style={{ fontSize: 18, color: 'black' }} >
                                Cart Item
                            </Text>
                            <Text style={{ fontSize: 18, color: 'black', alignSelf: 'center' }} >

                                {UserData.OrderList.length}
                            </Text>

                        </View>

                    </View>
                    <Text style={{ fontSize: 20, color: 'black', margin: 10 }} >
                        Address Section
                    </Text>
                    <View style={{ margin: 20, padding: 25, paddingTop: 0 }} >

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                            <Text style={{ fontSize: 20, color: 'black' }} >
                                Area :
                            </Text>

                            <Text style={{ fontSize: 15, color: 'black', alignSelf: 'center' }} >{UserData.UserAddress.area}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                            <Text style={{ fontSize: 20, color: 'black' }} >
                                Flat :
                            </Text>


                            <Text style={{ fontSize: 15, color: 'black', alignSelf: 'center' }} >{UserData.UserAddress.flat}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                            <Text style={{ fontSize: 20, color: 'black' }} >
                                Landmark :
                            </Text>

                            <Text style={{ fontSize: 15, color: 'black', alignSelf: 'center' }} >{UserData.UserAddress.landmark}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                            <Text style={{ fontSize: 20, color: 'black' }} >
                                Pincode :
                            </Text>

                            <Text style={{ fontSize: 15, color: 'black', alignSelf: 'center' }} >{UserData.UserAddress.pincode}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                            <Text style={{ fontSize: 20, color: 'black' }} >
                                State :
                            </Text>

                            <Text style={{ fontSize: 15, color: 'black', alignSelf: 'center' }} >{UserData.UserAddress.state}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                            <Text style={{ fontSize: 20, color: 'black' }} >
                                TownCity :
                            </Text>

                            <Text style={{ fontSize: 15, color: 'black', alignSelf: 'center' }} >{UserData.UserAddress.townCity}</Text>
                        </View>



                    </View>
                </View>
                : <Text>
                    Loding....
                </Text>

            }

        </View>
    )
}