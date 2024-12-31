import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';

import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Components/AuthComponent/LoginScreen';
import Register from '../Components/AuthComponent/Register';
import ItemCardDetail from '../Components/Cards/ItemCardDetail';
import OrderPriceDetail from '../Components/OrderStageComponent/OrderPriceDetail';
import OrderPlacedpage from '../Components/OrderStageComponent/OrderPlacedpage';
import OrderDetailPage from '../Components/OrderPageComponent/OrderDetailPage';


const Stack = createStackNavigator();
function MyStack() {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  function onAuthStateChanged(user) {

    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {

    // storeData()
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber
  }, [])
  if (initializing) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    );
  }
  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    )
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetal" component={ItemCardDetail} options={{ headerShown: false }} />
      <Stack.Screen name="OrderProductDetail" component={OrderPriceDetail} />
      <Stack.Screen name="PLacedOrder" component={OrderPlacedpage} options={{ headerShown: false }} />
      <Stack.Screen name="OrderDetailPage" component={OrderDetailPage} />
    </Stack.Navigator>
  )


}

export default MyStack