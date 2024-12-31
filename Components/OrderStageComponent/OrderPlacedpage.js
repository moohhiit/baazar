import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
export default function OrderPlacedpage() {


    const lottieRef = useRef();

    const Navigation = useNavigation()
    const onAnimationFinish = () => {
        Navigation.navigate('HomeScreen')
        
    };



    return (
        <View>
            

            <LottieView
                ref={lottieRef}
                source={require('../../assert/Animation/OrderPlaced.json')}
                autoPlay
                style={{ height: '100%', width: "100%", alignSelf: "center" }}
                loop={false}
                onAnimationFinish={onAnimationFinish}
            />
        </View>
    )
}