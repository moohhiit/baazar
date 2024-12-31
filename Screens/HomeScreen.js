import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import DrawerNaigation from '../Navigation/DrowerNavigation'
import HomePage from '../Components/HomeItem/HomePage'
import HomePageHeader from '../Components/HeaderComponent/HomePageHeader'
import RightCartDrower from '../Components/CartComponent/RightCartDrower'

export default function HomeScreen() {
  const drawerRef = useRef();
  const openDrawer = () => {
    drawerRef.current.openDrawer();
  }
  return (
    <>
      <HomePageHeader openDrower={openDrawer} />
      <HomePage />
      <RightCartDrower ref={drawerRef} />
    </>
  )
}