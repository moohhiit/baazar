import { View, Text } from 'react-native'
import React from 'react'

export default function OrderDetailPage({ route }) {
  const { OrderId } = route.params;
const OprderDetail = ()=>{
    
}

    return (
        <View>
            <Text>Product Detail </Text>
            <View>
                <Text>
                    {OrderId}
                </Text>
            </View>
            
        </View>
    )
}