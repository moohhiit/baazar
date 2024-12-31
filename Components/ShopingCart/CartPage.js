import { View, Text, FlatList, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CheckBox from '@react-native-community/checkbox';
import Cart from './Cart'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';


export default function CartPage() {
    const [TotalPrice, setTotalPrice] = useState(0)
    const [uid, setuid] = useState('')
    const [isbuy, setCart] = useState([])
    const [ProductDetail, setProductDetail] = useState([])
    const [Qty, setQty] = useState(1)

    const Height = Dimensions.get('screen').height - 100
    const Navigation = useNavigation()


    const calculateTotalPrice = (arr) => {
        const total = arr.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.data.DiscountRate * currentItem.Qty;
        }, 0);
        setTotalPrice(total);
    };



    const addQty = (ID) => {
        let newProductDetail = [...ProductDetail]
        const index = ProductDetail.findIndex(td => td.ID === ID)
        if (index !== -1) {
            newProductDetail[index].Qty = newProductDetail[index].Qty + 1
        }

        setProductDetail(newProductDetail)
    }
    const minesQty = (ID) => {
        let newProductDetail = [...ProductDetail]
        const index = ProductDetail.findIndex(td => td.ID === ID)
        if (index !== -1) {
            newProductDetail[index].Qty = newProductDetail[index].Qty - 1
        }

        setProductDetail(newProductDetail)
    }


    useEffect(() => {

        calculateTotalPrice(ProductDetail)

        return () => { };
    }, [ProductDetail])





    useEffect(() => {

        const subscriber = auth().onAuthStateChanged((user) => {
            setuid(user.uid)
        });
        return subscriber
    }, [])
    const fetchUserDetails = async (arr) => {
        try {
            const userDetailPromises = arr.map(async (userId) => {
                const userDoc = await firestore().collection('StoreData').doc(userId.ProductId).get();
                if (userDoc.exists) {
                    return { data: userDoc.data(), ID: userId.ProductId, Qty: userId.Qty };
                } else {
                    return null; // User document doesn't exist
                }
            });

            const resolvedUserDetails = await Promise.all(userDetailPromises);
            const filteredUserDetails = resolvedUserDetails.filter(userDetail => userDetail !== null);

            setProductDetail(filteredUserDetails);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };
    useEffect(() => {


        fetchUserDetails(isbuy);

        // Clean up function to unsubscribe from snapshot listener
        return () => { };
    }, [isbuy]);

    useEffect(() => {
        // Get a reference to the document you want to listen for changes
        const documentRef = firestore().collection('UserDetail').doc(uid);

        // Subscribe to real-time updates for the document
        const unsubscribe = documentRef.onSnapshot(snapshot => {
            // Get the updated data from the snapshot
            const updatedData = snapshot.data();
            setCart(updatedData.IsBuy);
        });

        // Clean up function to unsubscribe from the listener when component unmounts
        return () => unsubscribe();
    }, [uid]);

    return (
        <View style={{ height: Height }} >

            {ProductDetail ?


                <FlatList
                    data={ProductDetail}
                    renderItem={({ item }) => {
                        return (

                            <View style={{ padding: 10 }} >


                                <View style={{ flexDirection: 'row', }} >

                                    <Icon name="dingding" size={15} color="black" />
                                    <Text>{item.data.Brand}</Text>
                                </View>
                                <View style={{ borderBottomWidth: .5, padding: 10, flexDirection: "row", justifyContent: "space-between" }} >
                                    <Image source={{ uri: item.data.ImageUrl }} style={{ height: 80, width: 80 }} />
                                    <View>

                                        <Text style={{ fontSize: 20, color: 'black', fontWeight: '600' }} >{item.data.ProductName}</Text>
                                        <Text style={{ fontSize: 15, color: 'black', fontWeight: '300' }} >{item.data.ProductName}</Text>
                                        <Text style={{ fontSize: 15, color: 'black', fontWeight: '300' }} > ₹ {item.data.DiscountRate}</Text>
                                    </View>
                                    <View  >
                                        <TouchableOpacity style={{ padding: 5, borderWidth: .2, borderRadius: 5, backgroundColor: "#DBFFEC" }}
                                            onPress={() => {
                                                if (Qty >= 1) {
                                                    addQty(item.ID)
                                                }
                                                else {
                                                    setQty(1)
                                                }
                                            }}

                                        >

                                            <Icon name="plus" size={20} color="black" />
                                        </TouchableOpacity>
                                        <Text style={{ color: 'black', fontSize: 20, padding: 5, alignSelf: 'center' }} >
                                            {item.Qty}
                                        </Text>
                                        <TouchableOpacity style={{ padding: 5, borderWidth: .2, borderRadius: 5, backgroundColor: "#DBFFEC" }}
                                            onPress={() => {
                                                if (Qty >= 1) {

                                                    minesQty(item.ID)
                                                }
                                                else {
                                                    setQty(1)
                                                }
                                            }}
                                        >

                                            <Icon name="minus" size={20} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>



                            </View>
                        )
                    }}
                /> : <Text>Searching</Text>}
            <View style={{ height: 60, position: "absolute", bottom: 60, width: '100%', backgroundColor: 'white', justifyContent: "space-between", flexDirection: 'row' }} >

                <View style={{ padding: 5 }} >

                    <Text style={{ color: 'black', fontSize: 20, alignSelf: "center", fontWeight: 'bold' }} >
                        Amount Price
                    </Text>
                    <Text style={{ color: 'black', alignSelf: "center", fontSize: 18 }} >
                        ₹ {TotalPrice}
                    </Text>
                </View>
                <View style={{ backgroundColor: "#63FFAB", padding: 10, margin: 5, borderRadius: 10 }} >
                    <TouchableOpacity

                        onPress={() => {
                            Navigation.navigate('OrderProductDetail', {
                                ProductDetail : ProductDetail
                            })
                        }}

                    >

                        <View style={{ flexDirection: 'row', gap: 5 }} >

                            <Text style={{ color: 'white', fontSize: 15, justifyContent: 'center', alignSelf: 'center', fontWeight: "bold" }} >
                                Check Out
                            </Text>
                            <View style={{ backgroundColor: "white", borderRadius: 40, padding: 2, alignSelf: "center" }} >
                                <Text style={{ fontWeight: "bold", color: 'black' }}>
                                    {ProductDetail.length}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}