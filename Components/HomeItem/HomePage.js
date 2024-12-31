import { View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ItemCard from '../Cards/ItemCard'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import StarRating from 'react-native-star-rating-widget';
import { CatageryList, CategorieLists, listarray } from '../../Controller/ArrayofControler';
import HomePageHeader from '../HeaderComponent/HomePageHeader';


export default function HomePage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {

        try {
            const collectionRef = firestore().collection('StoreData')
            const unsubscribe = collectionRef.onSnapshot(querySnapshot => {
                const updatedData = [];
                querySnapshot.forEach(doc => {
                    const { id } = doc;
                    updatedData.push({ id, ...doc.data() });
                });
                setUsers(updatedData);
            });

            return () => unsubscribe();
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        // Clean up function to unsubscribe from snapshot listener

    }, []);
    function reshapeArray(array, rows, cols) {
        if (array.length !== rows * cols) {
            throw new Error("Array size does not match specified dimensions");
        }
        let result = [];
        for (let i = 0; i < array.length; i += cols) {
            result.push(array.slice(i, i + cols));
        }
        return result;
    }



    const ShowProduct = ({ productData }) => {
        const reshapedArray = reshapeArray(productData, 2, 3);
        return (
            <View style={{ padding: 10 }} >
                <Text style={{ fontSize: 20, color: 'black', marginVertical: 10 }}>Chocolate</Text>
                {
                    reshapedArray.map((_array) => {
                        return (
                            <View style={{ flexDirection: 'row', gap: 2 }} >
                                {
                                    _array ? _array.map((_item, _i) => {
                                        return (
                                            <View style={{ flex: 3 }} key={_i} >
                                                <View style={{ padding: 5, backgroundColor: '#BFECFF', marginHorizontal: 5, borderRadius: 15 }} >
                                                    <Image source={require('../../assert/Image/Chocolate.png')} style={{ height: 100, width: 80, alignSelf: "center", }} />
                                                </View>
                                                <View>
                                                    <Text adjustsFontSizeToFit style={{ fontWeight: 'bold', color: 'black' }} >
                                                        {_item.productName}
                                                    </Text>
                                                    <StarRatingDisplay
                                                        rating={_item.marketRating}
                                                        starSize={15}
                                                    />
                                                    <View style={{ flexDirection: "row", gap: 10 }} >

                                                        <Text adjustsFontSizeToFit style={{ color: 'black', fontWeight: 'bold' }} >
                                                            ₹ {_item.productPrice}
                                                        </Text>
                                                        <Text adjustsFontSizeToFit style={{ color: 'black', opacity: .5, textDecorationStyle: 'solid', textDecorationLine: 'line-through' }} >
                                                            MRP ₹{_item.productMRP}
                                                        </Text>
                                                    </View>

                                                </View>

                                            </View>
                                        )
                                    }) : null
                                }



                            </View>

                        )
                    })
                }

                <View style={{ padding: 10, backgroundColor: '#37AFE1', margin: 5, borderRadius: 10 }} >
                    <Text style={{ color: 'black', alignSelf: 'center', color: 'black' }} >
                        Show More
                    </Text>
                </View>
            </View>
        )
    }

    const SpecialOffer = ({ arrayofitem }) => {
        return (

            <View style={{ backgroundColor: '#FABC3F', paddingVertical: 20, paddingLeft: 20 }} >
                <Text style={{ alignSelf: 'center', color: 'black', fontWeight: 'bold', fontSize: 25, marginVertical: 10 }} >
                    Special Offer
                </Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={{ flexDirection: "row", gap: 10 }} >
                        {arrayofitem.map((_item, _i) => {
                            return (


                                <View style={{ flexDirection: 'column', gap: 5 }} key={_i} >

                                    <View style={{ padding: 5, backgroundColor: '#BFECFF', marginHorizontal: 5, borderRadius: 15 }} >
                                        <Image source={require('../../assert/Image/Chocolate.png')} style={{ height: 100, width: 80, alignSelf: "center", }} />
                                    </View>
                                    <View>
                                        <Text adjustsFontSizeToFit style={{ fontWeight: 'bold', color: 'black' }} >
                                            {_item.productName}
                                        </Text>
                                        <StarRatingDisplay
                                            rating={_item.marketRating}
                                            starSize={15}
                                        />
                                        <View style={{ flexDirection: "row", gap: 10 }} >

                                            <Text adjustsFontSizeToFit style={{ color: 'black', fontWeight: 'bold' }} >
                                                ₹ {_item.productPrice}
                                            </Text>
                                            <Text adjustsFontSizeToFit style={{ color: 'black', opacity: .5, textDecorationStyle: 'solid', textDecorationLine: 'line-through' }} >
                                                MRP ₹{_item.productMRP}
                                            </Text>
                                        </View>

                                    </View>
                                </View>

                            )
                        })
                        }
                    </View>

                </ScrollView>
            </View >
        )
    }

    const ProductCatagery = ({ catageryList }) => {
        const reshapedArray = reshapeArray(catageryList, 2, 3);
        return (
            <View style={{ padding: 10 , backgroundColor:'#FA812F'  }} >
                <Text style={{ fontSize: 25, color: 'black', marginVertical: 10 , alignSelf:'center' }}>Catagery</Text>
                {
                    reshapedArray.map((_array) => {
                        return (
                            <View style={{ flexDirection: 'row', gap: 2 }} >
                                {
                                    _array ? _array.map((_item, _i) => {
                                        return (
                                            <View style={{ flex: 3 }} key={_i} >
                                                <View style={{ padding: 5, backgroundColor: '#FFF6E3', marginHorizontal: 5, borderRadius: 15 }} >
                                                    <Image source={require('../../assert/Image/Kitchen.png')} style={{ height: 100, width: 80, alignSelf: "center", }} />
                                                </View>
                                                <View>
                                                    <Text adjustsFontSizeToFit style={{ fontWeight: 'bold', color: 'black' , alignSelf:'center'}} >
                                                        {_item.name}
                                                    </Text>
                                                                                               

                                                </View>

                                            </View>
                                        )
                                    }) : null
                                }



                            </View>

                        )
                    })
                }

                
            </View>
        )
    }




    const Navigation = useNavigation()

    const handleScroll = ({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;



    };
    return (
        <>
    
        <ScrollView style={{ gap: 5 }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator ={false}
            >
            <Image source={require('../../assert/Image/festivalImage.png')} style={{ height: 200, width: '100%' }} />
            <Image source={require('../../assert/Image/SpacialOffer.png')} style={{ height: 200, width: '100%' }} />

            {/* <ProductCatagriy arrayfocatagery={listarray} /> */}
            <ShowProduct productData={listarray} />
            <ShowProduct productData={listarray} />
            <ProductCatagery catageryList={CategorieLists}  />
            <SpecialOffer arrayofitem={listarray} />
            <Image source={require('../../assert/Image/SpacialOffer.png')} style={{ height: 200, width: '100%' }} />
            <ShowProduct productData={listarray} />
            <SpecialOffer arrayofitem={listarray} />
        </ScrollView>
            </>
    )
}