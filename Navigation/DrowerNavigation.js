import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';




import DrowerComponent from '../Components/DrowerComponent/DrowerComponent';
import HomePage from '../Components/HomeItem/HomePage';
import ShoppingCart from '../Screens/ShoppingCart';
import OrderPage from '../Screens/OrderPage';
import EditProfile from '../Screens/EditProfile';





const Drawer = createDrawerNavigator();

export default function DrawerNaigation() {
  return (
    <Drawer.Navigator initialRouteName="ShopList" drawerContent={props => <DrowerComponent {...props} />} screenOptions={{ headerShown: false }} >
      <Drawer.Screen name="HomePage" component={HomePage} />
      <Drawer.Screen name="Cart" component={ShoppingCart} />
      <Drawer.Screen name="OrderDetail" component={OrderPage} />
      <Drawer.Screen name="Profile" component={EditProfile} />

    </Drawer.Navigator>
  );
}