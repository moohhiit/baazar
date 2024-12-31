import React from 'react'

import MyStack from './Navigation/StackNavigation'
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProductState from './Context/ContextStateCluster/ProductContext';
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ProductState>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </ProductState>
    </GestureHandlerRootView>
  )
}