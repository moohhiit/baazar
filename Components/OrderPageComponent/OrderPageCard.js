import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';


export default function OrderPageCard({ OrderDetail }) {
    const [OrderDetailData, setOrderDetailData] = useState(null)
    const [OrderItem, setOrderItem] = useState()
    const Navigation = useNavigation()


    const SliceOrderItem = (od) => {
        if (od.length >= 2) {
            const slicedData = od.slice(0, 2);
            setOrderItem(slicedData)
        }
        else {
            setOrderItem(od)
        }
    }

    const FeatchOrderDetail = () => {
        const userRef = database().ref(`order/${OrderDetail}`);

        userRef.on('value', snapshot => {
            // Push the fetched user data into the fetchedUsers array
            setOrderDetailData(snapshot.val())



        });
    }


    useEffect(() => {
        if (OrderDetailData != null) {

            SliceOrderItem(OrderDetailData.ProductDetail)
        }
        else {

            console.log("UseEffect")
        }
    }, [OrderDetailData])


    useEffect(() => {
        FeatchOrderDetail()
    }, [])
    return (


        <View>

            {
                
            
            
            OrderDetailData != null ?
                <View style={{ margin: 5, padding: 10, borderRadius: 10, borderWidth: 1, flexDirection: "row", justifyContent: "space-between" }} >

                    <View>

                        <FlatList
                            data={OrderItem}
                            renderItem={({ item }) => {
                                return (
                                    <View >
                                        <Image source={{ uri: item.data.ImageUrl }} style={{ height: 50, width: 50, borderRadius: 5 }} />
                                    </View>
                                )
                            }}
                            horizontal={true}
                        />

                        <View>

                        </View>

                        <Text style={{ fontWeight: 'bold' }} > ₹ {OrderDetailData.PriceDetail.TotalPrice + OrderDetailData.PriceDetail.DelaviryCharge}</Text>

                    </View>
                    <View  >
                        <Text style={{ margin: 10, fontSize: 15, marginTop: 0 }} >

                            Order Date :    {OrderDetailData.OrderDate}
                        </Text>


                        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }} >
                            <View>
                                <MaterialCommunityIcons
                                    name='package-variant'
                                    size={25}
                                    color={OrderDetailData.isShiping ? '#4CCD99' : 'black'}
                                    style={{ alignSelf: "center" }}

                                />
                                <Text style={{ fontSize: 10 }} >
                                    Packed
                                </Text>
                            </View>
                            <View>
                                <MaterialCommunityIcons
                                    name='bike'
                                    size={25}
                                    color={OrderDetailData.isForDelaviry ? '#4CCD99' : 'black'}
                                    style={{ alignSelf: "center" }}

                                />
                                <Text style={{ fontSize: 10 }} >
                                    out of delivery
                                </Text>
                            </View>
                            <View>
                                <MaterialCommunityIcons
                                    name='shopping'
                                    size={25}
                                    color={OrderDetailData.isDelaverd ? '#4CCD99' : 'black'}
                                    style={{ alignSelf: "center" }}

                                />
                                <Text style={{ fontSize: 10 }} >
                                    delivered
                                </Text>
                            </View>
                        </View>
                    </View>
                </View> : <View>
                    <Text>
                        Loding....
                    </Text>
                </View>
            }
        </View>


    )
}