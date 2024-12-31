import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';


export default function ItemCard({ ItemData }) {
  const data = new Array(ItemData.rating).fill(0).map((_, index) => ({ id: index }));
  return (
    <View style={{ borderRadius: 20, elevation: 5, backgroundColor: '#ffff', margin: 5 }} >
      <Image source={{ uri: ItemData.ImageUrl }} style={{ height: 100, width: '100%', alignSelf: 'center', borderRadius: 20 }} >

      </Image>
      <View style={{ padding: 10 }} >

        <Text style={{ color: 'black', alignSelf: 'center' }} >
          {ItemData.ProductName}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

          <Text style={{ textDecorationLine: 'line-through', color: 'black' }}> ₹ {ItemData.MarketRate}</Text>
          <View>

            <Text style={{ color: 'black', fontWeight: '700' }} >
              ₹ {ItemData.DiscountRate}
            </Text>
          </View>
        </View>
        <Text style={{ color: 'black' }} >
          Qty left : {ItemData.Stock} pcs
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }} >

          <FlatList
            data={data}
            renderItem={() => {
              return (
                <Icon name="star" size={15} color="gold" />
              )

            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />

          <Entypo name="shopping-bag" size={20} color={ItemData.Avalable ? 'green' : 'red'} />
        </View>
      </View>


    </View>
  )
}