import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  FlatList,
  ImageBackground,
  Alert,
} from 'react-native';

const SLIDER_WIDTH = Dimensions.get('window').width * 0.94;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

const Data = [
  {
    name: "Today's special @ Café Albero",
    pic: require('../images/video1.png'),
    pic1: require('../images/user1.png'),
    pic2: require('../images/date1.png'),
  },

  {
    name: "Today's special @ Café Albero",
    pic: require('../images/mask1.png'),
    pic1: require('../images/user1.png'),
    pic2: require('../images/date1.png'),
  },

  {
    name: "Today's special @ Café Albero",
    pic: require('../images/video1.png'),
    pic1: require('../images/user1.png'),
    pic2: require('../images/date1.png'),
  },
];

function Item({item}) {
  return (
    <View
      style={{
        height: 300,
        width: '100%',
        marginTop: 25,
        // backgroundColor: 'red',
        borderRadius: 10,
        bottom: 15,
      }}>
      <View>
        <Image
          source={item.pic}
          style={{height: '100%', width: '100%', borderRadius: 10}}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',

          height: 80,
          backgroundColor: '#878787',
          bottom: 0,
          zIndex: 0,

          borderRadius: 10,
          opacity: 0.8,
          // overflow: 'hidden',
        }}>
        <View style={{marginTop: 5, marginLeft: 10}}>
          <Text
            style={{
              fontSize: 18,
              color: '#FFF',
              fontFamily: 'Roboto-Bold',
            }}>
            Today's special @ Café Albero
          </Text>
        </View>
        <View style={{marginTop: 5, marginLeft: 10}}>
          <Image source={require('../images/user1.png')} />
        </View>
        <View style={{marginTop: 3, marginLeft: 12}}>
          <Image source={require('../images/date1.png')} />
        </View>
      </View>
    </View>
  );
}

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Home() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView>
      <View style={{width: '100%', height: '100%', backgroundColor: '#000'}}>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 20,
            // paddingBottom: 20,
            alignItems: 'center',
            height: '15%',
          }}>
          <View>
            <Image
              source={require('../images/header2.png')}
              // style={{height: 20}}
              style={{
                width: 40,
                height: 45,
                resizeMode: 'contain',
                marginLeft: 20,
              }}
            />
          </View>
          <View style={{marginLeft: 20}}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Roboto-Bolds',
                fontWeight: 'bold',
                color: '#FFF',
              }}>
              While You are here..
            </Text>
          </View>
        </View>

        <View style={styles.mapView}>
          <Text style={{color: '#FFF', fontSize: 17, marginLeft: 20}}>
            @ 40456321789654123, -78965412301245963
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: '3%',
            // backgroundColor: 'red',
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{marginTop: 15, borderRadius: 30}}>
            <FlatList
              data={Data}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => <Item item={item} />}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    // width: '100%',
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginTop: 20,
    // backgroundColor: 'green',
  },
  child: {width, justifyContent: 'center'},
  text: {fontSize: width * 0.5, textAlign: 'center'},
  swipeParent: {
    marginTop: 20,
    width: '100%',
    // backgroundColor: 'red',
    height: 300,
    borderRadius: 10,
  },
  mapView: {
    height: 50,
    backgroundColor: '#101010',
    width: '100%',
    justifyContent: 'center',
  },
  arrowView: {
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'red',
    // position: 'absolute',
    justifyContent: 'space-between',
    marginVertical: 85,
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 10,
  },
});
