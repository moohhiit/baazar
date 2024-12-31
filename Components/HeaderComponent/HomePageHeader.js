import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import ColorCluster from '../../assert/Color/Color'
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import RightCartDrower from '../CartComponent/RightCartDrower';

export default function HomePageHeader({openDrower}) {
 
  return (
    <View style={{ height: 50, backgroundColor: ColorCluster.white, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }} >
      <View style={{ flex: 3, alignSelf: 'center' }} >

        <Ionicons name='chevron-back' color={ColorCluster.textColor} size={25} />
      </View>
      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }} >
        <View style={{ alignSelf: 'center' }} >

          <Ionicons name='search-sharp' color={ColorCluster.textColor} size={25} />
        </View>
        <TouchableOpacity  onPress={openDrower} >
          <View style={{ alignSelf: 'center' }} >
            <Text style={{ color: ColorCluster.textColor, fontWeight: 'bold', alignSelf: 'center' }} >
              10
            </Text>
          
          </View>
          <Ionicons name='cart-sharp' color={ColorCluster.textColor} size={25} />
        </TouchableOpacity>
      </View>
      
    </View>
  )
}


