import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import firestore from '@react-native-firebase/firestore';
export default function Cart({ CartDetail }) {
    const [Qty, setQty] = useState(1)
    const [Product, setProduct] = useState('')
    const ProductDetail = async () => {
        const ProductDetail = await firestore().collection('StoreData').doc(CartDetail.ProductId).get()
        setProduct(ProductDetail._data)
    }

    useEffect(() => {
        ProductDetail()
    }, [])

    return (
        <View style={{ padding: 10 }} >


            <View style={{ flexDirection: 'row', }} >

                <Icon name="dingding" size={15} color="black" />
                <Text>{CartDetail.Brand}</Text>
            </View>
            <View style={{ borderTopWidth: .5, padding: 10, flexDirection: "row", justifyContent: "space-between" }} >
                <Image source={require('../../assert/Image/Rakhi.png')} style={{ height: 80, width: 80 }} />
                <View>

                    <Text style={{ fontSize: 20, color: 'black', fontWeight: '600' }} >{CartDetail.ProductName}</Text>
                    <Text style={{ fontSize: 15, color: 'black', fontWeight: '300' }} >{CartDetail.ProductName}</Text>
                    <Text style={{ fontSize: 15, color: 'black', fontWeight: '300' }} > ₹ {CartDetail.DiscountRate}</Text>
                </View>
                <View  >
                    <TouchableOpacity style={{ padding: 5, borderWidth: .2, borderRadius: 5, backgroundColor: "#DBFFEC" }}
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
                    <Text style={{ color: 'black', fontSize: 20, padding: 5, alignSelf: 'center' }} >
                        {Qty}
                    </Text>
                    <TouchableOpacity style={{ padding: 5, borderWidth: .2, borderRadius: 5, backgroundColor: "#DBFFEC" }}
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
            </View>



        </View>
    )
}