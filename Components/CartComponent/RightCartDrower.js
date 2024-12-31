import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import {
    PanGestureHandler,
    State,
} from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import ColorCluster from '../../assert/Color/Color';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { ProductArray } from '../../Controller/ArrayofControler';



const { width, height } = Dimensions.get('screen');
const DRAWER_WIDTH = 300;

const RightCartDrower = forwardRef((props, ref) => {

    const [drowerWidth, setDrowerWidth] = useState(0)

    const translateX = useSharedValue(width);
    const [isOpen, setIsOpen] = useState(false);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));
    const getVisibleWidth = () => {
        setDrowerWidth(Math.max(0, width - translateX.value));
    };
    const openDrawer = () => {
        translateX.value = withSpring(width - DRAWER_WIDTH);
        setIsOpen(true);

    };

    const closeDrawer = () => {
        translateX.value = withSpring(width);
        setIsOpen(false);
    };

    const toggleDrawer = () => {
        if (isOpen) {
            closeDrawer();
        } else {
            openDrawer();
        }
    };
    const totalPrice = ProductArray.reduce((sum, product) => {
        // Use discountPrice if available, otherwise use price
        return sum + (product.discountPrice || product.price);
      }, 0);

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
        openDrawer,
        closeDrawer,
    }));
    useEffect(() => {
        getVisibleWidth();
    }, [])
    return (

        <PanGestureHandler
            onGestureEvent={(event) => {
                if (event.translationX < 0) {
                    translateX.value = Math.min(width - DRAWER_WIDTH + event.translationX, width);
                }


            }}
            onHandlerStateChange={(event) => {
                if (event.nativeEvent.state === State.END) {
                    if (translateX.value > width - DRAWER_WIDTH / 2) {
                        closeDrawer();
                    } else {
                        openDrawer();
                    }
                }
            }}
        >
            <Animated.View style={[styles.drawer, animatedStyle]}>

                <View style={{ flex: .4, width: DRAWER_WIDTH - (width - DRAWER_WIDTH), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderBottomWidth: 1 }}>


                    <Text style={{ color: ColorCluster.textColor, fontSize: 25 }}>Cart</Text>
                    <TouchableOpacity onPress={closeDrawer} >

                        <Ionicons name='close-sharp' color={ColorCluster.textColor} size={25} />
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 6, width: DRAWER_WIDTH - (width - DRAWER_WIDTH), overflow: 'hidden' }} >
                    <FlatList
                        data={ProductArray}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row', padding: 2 }} >
                                <View style={{ backgroundColor: 'red', height: 50, width: 50, margin: 2, borderRadius: 10 }} >

                                </View>
                                <View>

                                    <Text style={{ color: ColorCluster.textColor , textDecorationLine:'underline' }} maxLength={10}  >
                                        {item.name.length < 10
                                            ? `${item.name}`
                                            : `${item.name.substring(0, 15)}...`}
                                    </Text>
                                    <Text style={{ color: ColorCluster.textColor }}  >
                                       ₹ {item.price}
                                    </Text>
                                </View>
                            </View>
                        )
                        }
                    />
                </View>
                <View style={{ gap:10 , flex: .5, width: DRAWER_WIDTH - (width - DRAWER_WIDTH), justifyContent: 'space-around', borderTopWidth: 1, flexDirection: 'row', alignItems: 'center' }} >
                    <Text style={{ color: ColorCluster.textColor, fontSize: 15 }}>₹{totalPrice.toFixed(2)}</Text>
                    <TouchableOpacity style={{ backgroundColor: ColorCluster.primary, borderRadius: 10, padding: 10 }} >

                        <Text style={{ color: ColorCluster.textColor, fontSize: 15 }} >Order</Text>
                    </TouchableOpacity>
                </View>

            </Animated.View>
        </PanGestureHandler>

    );
});

const styles = StyleSheet.create({

    drawer: {
        position: 'absolute',
        right: 0,
        width: DRAWER_WIDTH,
        height: '100%',
        backgroundColor: '#ffffff',
        borderLeftWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    drawerText: {
        fontSize: 18,
        color: ColorCluster.textColor,


    },
});

export default RightCartDrower;
