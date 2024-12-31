import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, VirtualizedList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import firestore from '@react-native-firebase/firestore';
import CheckBox from '@react-native-community/checkbox';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';


export default function OrderPriceDetail({ route }) {

    //Price Deatil  Data 
    const { ProductDetail } = route.params
    const [TotalPrice, setTotalPrice] = useState(0)
    const [TotalQty, setTotalQty] = useState(0)
    const [sav, setSaving] = useState(0)
    const [ProducttDetailComplete, setProductDetailComplete] = useState(false)
    const [OpnePayment, setOpnePaymnet] = useState(false)
    const [DelaviryCharge, setDelaviryCharge] = useState(0)
    const [selectPaymentMode, setSelectPAymentMode] = useState('COD')
    const [CashOnDelaviryCharge, setCashOnDelaviryCharge] = useState(0)
    const [Address, setAddress] = useState({
        fullName: '',
        mobileNumber: '',
        pincode: '',
        flat: '',
        area: '',
        landmark: '',
        townCity: '',
        state: '',
    });
    const [isCod, setiscod] = useState(true)
    const [isUPI, setisUpi] = useState(false)
    const [isChecked, setIsChecked] = useState(false);
    // Address Detail Data 
    const [isAddressComplete, setisAddressComplete] = useState(true)
    const [userUid, setUserUid] = useState('')

    const Navigation = useNavigation()

    const calculateTotalPrice = (arr) => {
        const total = arr.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.data.DiscountRate * currentItem.Qty;
        }, 0);
        setTotalPrice(total);
    };
    const calculateTotalQty = (arr) => {
        const total = arr.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.Qty;
        }, 0);
        setTotalQty(total);
    };
    const Saving = (arr) => {
        const total = arr.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.data.MarketRate * currentItem.Qty;
        }, 0);
        setSaving(total)
    }
    const COD = () => {
        setiscod(!isCod)
        setSelectPAymentMode(isCod ? '' : 'COD')
        setisUpi(false)
        setCashOnDelaviryCharge(isCod ? 0 : 9)

    };
    const toggleCheckbox = () => {
        setisUpi(!isUPI)
        setSelectPAymentMode(isUPI ? '' : 'UPI')
        setiscod(false)

    };
 

    function successCallback(data) {
        console.log(data)
    }

    function failureCallback(data) {
        console.log(data)
    }
    const handleInputChange = (key, value) => {
        setAddress({ ...Address, [key]: value });
    };
    const ClearChart = (orderRfNo) => {
        firestore().collection('UserDetail').doc(userUid).update({
            IsBuy: [],
            OrderList: firestore.FieldValue.arrayUnion(orderRfNo) ,
            UserAddress : Address
        }).then((data) => {
            console.log(data)
        })



    }
    const placendOrder = () => {
        const d = new Date();
        const currentTime = new Date().toLocaleTimeString()
        const currentDate = new Date().toDateString()
        let years = Math.round(d.getTime());
        let add = `/order/${years}`
        database()
            .ref(add)
            .set({
                ProductDetail: ProductDetail,
                Address: Address,
                PriceDetail: {
                    TotalPrice: TotalPrice,
                    DelaviryCharge: DelaviryCharge.Lucknow
                },
                PaymentMode: selectPaymentMode,
                UserId: userUid,
                isDelaverd: false,
                isShipping: false,
                isOutOfDelaviry: false,
                isPacked: false,
                OrderDate: currentDate,
                OrderTime: currentTime,
                OrderID:years

            })
            .then(() => {
                ClearChart(years)
                Navigation.navigate("PLacedOrder")
            }


            );
    }

    useEffect(() => {
        calculateTotalPrice(ProductDetail)
        calculateTotalQty(ProductDetail)
        Saving(ProductDetail)
    }, [ProductDetail])
    useEffect(() => {
        try {
            const subscriber = auth().onAuthStateChanged((user) => {
                setUserUid(user.uid)
            });
            firestore()
                .collection('ImportantInfo')
                .doc('DelaviryCharge')
                .get().then((data) => {
                    setDelaviryCharge(data._data)
                })

            // Unsubscribe from updates when no longer needed
            return () => { };
        } catch (error) {
            console.log(error)
        }

    }, []);

    return (

        <ScrollView>
            <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 5, elevation: 5, margin: 10 }} >
                <TouchableOpacity
                    onPress={() => {
                        setProductDetailComplete(!ProducttDetailComplete)
                    }}
                >

                    <View style={{ flexDirection: "row", backgroundColor: '#ffff', justifyContent: 'space-between', padding: 10 }} >
                        <Icon
                            name='checkcircle'
                            size={28}
                            color="green"
                        />
                        <View style={{ flexDirection: "row", alignItems: 'center' }} >

                            <Icon
                                name='shoppingcart'
                                size={28}
                                color="black"
                            />
                            <Text style={{ fontSize: 20, margin: 5, color: 'black' }} >
                                Cart
                            </Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 20, margin: 5, color: 'black', }} >
                                Total :   ₹ {TotalPrice}
                            </Text>
                        </View>

                    </View>
                </TouchableOpacity>
                {ProducttDetailComplete ?

                    <View>
                        <FlatList
                            data={ProductDetail}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 10 }} >
                                        <View style={{ flexDirection: "row" }} >
                                            <Image source={{ uri: item.data.ImageUrl }} style={{ height: 60, width: 60 }} ></Image>
                                            <View style={{ alignSelf: "center" }} >
                                                <Text style={{ color: "black" }} >
                                                    {item.data.ProductName}
                                                </Text>
                                                <View style={{ flexDirection: "row", gap: 10 }} >
                                                    <Text style={{ textDecorationLine: 'line-through', color: 'black' }}>
                                                        ₹  {item.data.MarketRate}
                                                    </Text>
                                                    <Text style={{ color: "black" }} >
                                                        ₹ {item.data.DiscountRate}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ alignSelf: "center" }} >
                                            <Text style={{ color: 'black', fontSize: 20 }} >
                                                {item.Qty} pcs
                                            </Text>
                                        </View>
                                        <View style={{ alignSelf: "center" }} >
                                            <Text style={{ color: 'black', fontSize: 20 }} >
                                                ₹  {item.Qty * item.data.DiscountRate}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            }}

                        />
                        <View style={{ borderTopWidth: 1, justifyContent: "space-between", flexDirection: "row", margin: 10, borderBottomWidth: 1, padding: 10 }} >
                            <Text style={{ fontSize: 20, color: 'black' }} >
                                Total
                            </Text>
                            <Text style={{ fontSize: 20, color: 'black' }} >
                                {TotalQty} Pcs
                            </Text>
                            <Text style={{ fontSize: 20, color: 'black' }} >
                                ₹  {TotalPrice}
                            </Text>
                        </View>
                    </View> : null
                }
            </View>
            <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, elevation: 5, margin: 10, marginTop: 0, }} >
                <TouchableOpacity
                    onPress={() => {
                        setisAddressComplete(!isAddressComplete)
                    }}
                >

                    <View style={{ flexDirection: "row", gap: 10, }} >
                        <Icon
                            name='checkcircle'
                            size={28}
                            color="green"
                            style={{ alignSelf: "center" }}
                        />
                        <Text style={{ color: "black", alignSelf: "center", }}  >
                            {
                                `${Address.fullName} ,${Address.area} ,${Address.townCity}, ${Address.state}, ${Address.pincode}, /+91 ${Address.mobileNumber}`
                            }
                        </Text>
                    </View>
                </TouchableOpacity>
                {

                    isAddressComplete ?
                        <View>


                            <Text style={styles.title}>Delivery Address</Text>
                            <TextInput
                                placeholderTextColor="black"
                                style={styles.input}
                                value={Address.fullName}
                                onChangeText={(value) => handleInputChange('fullName', value)}
                                placeholder="Full name"
                            />
                            <TextInput
                                placeholderTextColor="#000"
                                style={styles.input}
                                value={Address.mobileNumber}
                                onChangeText={(value) => handleInputChange('mobileNumber', value)}
                                placeholder="Mobile number"
                                keyboardType="numeric"
                                maxLength={10}
                            />
                            <TextInput
                                placeholderTextColor="#000"
                                style={styles.input}
                                value={Address.pincode}
                                onChangeText={(value) => handleInputChange('pincode', value)}
                                placeholder="PIN code"
                                keyboardType="numeric"
                            />
                            <TextInput
                                placeholderTextColor="#000"
                                style={styles.input}
                                value={Address.flat}
                                onChangeText={(value) => handleInputChange('flat', value)}
                                placeholder="Flat, House no., Building, Company, Apartment"
                            />
                            <TextInput
                                placeholderTextColor="#000"
                                style={styles.input}
                                value={Address.area}
                                onChangeText={(value) => handleInputChange('area', value)}
                                placeholder="Area, Street, Sector, Village"
                            />
                            <TextInput
                                placeholderTextColor="#000"
                                style={styles.input}
                                value={Address.landmark}
                                onChangeText={(value) => handleInputChange('landmark', value)}
                                placeholder="Landmark"
                            />
                            <TextInput
                                placeholderTextColor="#000"
                                style={styles.input}
                                value={Address.townCity}
                                onChangeText={(value) => handleInputChange('townCity', value)}
                                placeholder="Town/City"
                            />
                            <TextInput
                                placeholderTextColor="#000"
                                style={styles.input}
                                value={Address.state}
                                onChangeText={(value) => handleInputChange('state', value)}
                                placeholder="State"
                            />
                            <TouchableOpacity style={styles.button} onPress={() => {
                                setisAddressComplete(false)

                            }} >
                                <Text style={styles.buttonText}>Save Address</Text>
                            </TouchableOpacity>
                        </View>
                        : null


                }
            </View>


            {
                OpnePayment ? <View>
                    <Text>
                        Payment
                    </Text>
                </View> : <View style={{ backgroundColor: "#ffff", elevation: 5, margin: 10, padding: 10, borderRadius: 10 }} >
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                        <Text style={{ fontSize: 20, color: 'black' }} >
                            Item Price
                        </Text>
                        <Text style={{ fontSize: 20, color: 'black' }} >
                            ₹ {TotalPrice}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                        <Text style={{ fontSize: 20, color: 'black' }} >
                            Delaviry Change
                        </Text>
                        <Text style={{ fontSize: 20, color: 'black' }} >

                            ₹ {DelaviryCharge.Lucknow}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                        <Text style={{ fontSize: 20, color: 'black' }} >
                            Delaviry Change
                        </Text>
                        <Text style={{ fontSize: 20, color: 'black' }} >

                            {selectPaymentMode}
                        </Text>
                    </View>
                    <View>
                        <View style={{ padding: 10 }} >
                            <View style={{ flexDirection: "row", gap: 10 }} >

                                <CheckBox
                                    value={isCod}
                                    onValueChange={COD}
                                />
                                <View>

                                    <Text style={{ fontSize: 20, color: 'black' }} >
                                        Cash On Delaviry
                                    </Text>
                                    <Text style={{ fontSize: 10, color: 'black', alignSelf: "center" }} >
                                        Pay ₹ 9 charge
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 10 }} >

                                <CheckBox
                                    value={isUPI}
                                    onValueChange={toggleCheckbox}
                                    disabled={true}
                                />
                                <View style={{ flexDirection: "row" }} >

                                    <Text style={{ fontSize: 20, color: 'black' }} >
                                        UPI
                                    </Text>
                                    <Text style={{ fontSize: 12, color: 'red' }} >
                                        *Temporary Unavilable*
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                        <Text style={{ fontSize: 22, color: 'black', alignSelf: "center" }} >
                            ₹  {DelaviryCharge.Lucknow + TotalPrice + CashOnDelaviryCharge}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                // isPaymnet()
                                placendOrder()

                            }}

                        >

                            <Text style={{ padding: 10, backgroundColor: "#99FCC7", color: "black", fontSize: 20, borderRadius: 15 }} >
                                Place Order
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            }


        </ScrollView>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'black'
    },
    input: {
        height: 48,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 16,
        marginBottom: 16,
        color: 'black'
    },
    button: {
        backgroundColor: '#FCD499',
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',

    },

});