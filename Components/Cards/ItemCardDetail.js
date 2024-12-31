import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function ItemCardDetail({ route }) {
    const [Qty, setQty] = useState(1)
    const { Product } = route.params
    const [uid, setuid] = useState()


    const Navigation = useNavigation()


    const Height = Dimensions.get('screen').height
    const star = new Array(Product.rating).fill(0).map((_, index) => ({ id: index }));

    console.log(Product.id)
    const AddCart = async () => {
        const userData = await firestore().collection('UserDetail').doc(uid).get()
        const documentRef = firestore().collection('UserDetail').doc(uid);

        let cart = userData._data.IsBuy
        const result = cart.find(item => item.ProductId === Product.id);
        if (result) {
            console.log('Data Present ')
        }
        else {
            let cartData = {
                ProductId: Product.id,
                Qty: Qty
            }
            await documentRef.update({
                IsBuy: firestore.FieldValue.arrayUnion(cartData),
            });
        }


    }







    useEffect(() => {

        // storeData()
        const subscriber = auth().onAuthStateChanged((user) => {
            setuid(user.uid)
        });
        return subscriber
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <LinearGradient colors={['#DEFDEC', '#ffff']} style={{ height: Height }} >



                <View style={{ padding: 10 }} >
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }} >
                        <TouchableOpacity onPress={() => {
                            Navigation.goBack()
                        }} >

                            <View style={{ height: 50, width: 50, borderWidth: 1, justifyContent: "center", alignItems: "center", borderRadius: 20 }} >
                                <Icon name='left' size={25} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ color: '#FFB8B8', fontSize: 18 }} >
                            Brand Name
                        </Text>
                    </View>
                    <Image source={{ uri: Product.ImageUrl }} style={{ alignSelf: "center", width: "98%", height: '70%' }} />
                    <View style={{ padding: 20, flexDirection: "row", justifyContent: "space-between" }} >
                        <View>

                            <Text style={{ fontSize: 25, color: 'black' }} >{Product.ProductName}</Text>
                            <Text style={{ fontSize: 15, color: 'black' }} >{Product.ProductName}</Text>
                        </View>
                        <View>
                        

                            <FlatList
                                data={star}
                                renderItem={() => {
                                    return (
                                        <Icon name="star" size={20} color="gold" />
                                    )

                                }}
                                horizontal={true}
                            />
                            <Text style={{ color: 'black' }} >
                                Stock : {Product.Stock} pcs
                            </Text>
                        </View>
                    </View>
                    <View style={{ padding: 20, flexDirection: "row", justifyContent: "space-between" }} >
                        <View>
                            <View style={{ flexDirection: "row" }} >

                                <Text style={{ fontSize: 25, color: 'black' }} > ₹ {(Product.DiscountRate * Qty)}</Text>
                                <Text style={{ fontSize: 15, color: 'black' }} > x {(Qty)}</Text>
                            </View>
                            <Text style={{ fontSize: 15, color: 'black', textDecorationLine: 'line-through' }} > ₹ {(Product.MarketRate) * Qty}</Text>
                        </View>
                        <View style={{ borderWidth: 1, flexDirection: "row", padding: 10, alignItems: "center", justifyContent: "center", gap: 10, borderRadius: 10 }} >

                            <TouchableOpacity
                                onPress={() => {
                                    if (Qty >= 1) {

                                        setQty(Qty + 1)
                                    }
                                    else {
                                        setQty(1)
                                    }
                                }}

                            >

                                <Icon name="plus" size={20} color="black" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, color: 'black' }} >{Qty}</Text>

                            <TouchableOpacity
                                onPress={() => {
                                    if (Qty >= 1) {

                                        setQty(Qty - 1)
                                    }
                                    else {
                                        setQty(1)
                                    }
                                }}

                            >

                                <Icon name="minus" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                AddCart()
                            }}
                        >

                            <View style={{ backgroundColor: '#DEFDEC', padding: 15, alignItems: 'center', borderRadius: 10 }}>
                                <Icon name="shoppingcart" size={25} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </ScrollView>
    )
}

