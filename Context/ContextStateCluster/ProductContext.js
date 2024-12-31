import { View, Text } from 'react-native'
import React from 'react'
import { ProductListContext } from '../Context'

export default function ProductState({ children }) {
    const name = "Mohit "


    return (
        <ProductListContext.Provider value={{
            name
        }}  >
            {children}
        </ProductListContext.Provider>
    )
}