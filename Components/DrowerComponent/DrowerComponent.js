import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function DrowerComponent(props) {
  const [UserDetail, setUserDeatil] = useState(null)
  const [uid, setuid] = useState('')


  const Navigation = useNavigation()


  const featchUid = async (u) => {
    try {
      const userData = await firestore().collection('UserDetail').doc(u).get()
      setUserDeatil(userData._data)
    } catch (error) {
      console.log("drowercomponent :", error)
    }
  }
  function onAuthStateChanged(user) {
    featchUid(user.uid);
  }



  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged)
  }, [])


  return (
    <View style={{ flex: 1, backgroundColor: '#F6FCF2', }}  >

      <ImageBackground source={require('../../assert/Image/DrowerBackground.png')} style={{ padding: 20, borderBottomWidth: 2 }} >
        {
          UserDetail ?
            <>
              {UserDetail.ImageUrl ?

                <Image source={{ uri: UserDetail.ImageUrl }} style={{ borderRadius: 50, height: 100, width: 100, alignSelf: "center" }}></Image> :  <Image source={require('../../assert/Image/UserProfile.png')} style={{ borderRadius: 100, height: 150, width: 120, alignSelf: "center" }}></Image> 
              }
              <View style={{ alignSelf: 'center' }}>
                <Text style={{ fontSize: 20, color: "black", alignSelf: 'center' , fontWeight:'bold'}}>
                  {UserDetail.Name}
                </Text>
               

              </View>
            </> : null

        }

      </ImageBackground>
      <View style={{ margin: 10 }}>



        <DrawerItemList {...props} />
      </View>

    </View>



  )
}