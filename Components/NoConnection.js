import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';

export default function NoConnection() {
  return (
    <SafeAreaView>
      <View style={{height: '100%', width: '100%', backgroundColor: '#000'}}>
        <View style={styles.header}>
          <View>
            <Image
              source={require('../images/header2.png')}
              // style={{height: 20}}
              style={styles.imageView}
            />
          </View>
          <View style={{marginLeft: 20}}>
            <Text style={styles.headerText}>While You are here..</Text>
          </View>
        </View>

        <View style={styles.no_connection}>
          <Text style={{color: '#FFF', fontSize: 18, marginLeft: 20}}>
            @ Not Connected
          </Text>
        </View>

        <View style={styles.no_connection_image}>
          <Image
            source={require('../images/no_connection2.png')}
            style={{height: 150, width: 150, resizeMode: 'contain'}}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.text1}>
            You seems to have no data connection or you haven't enabled sharing
            yout current location with wyah… please check you're connected and
            have enabled the location sharing setting..
          </Text>
        </View>

        <View style={styles.swipeDownImage}>
          <Image
            source={require('../images/swipedown2.png')}
            style={{height: 250, width: 300, resizeMode: 'contain'}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingTop: 20,
    // paddingBottom: 20,

    alignItems: 'center',
    height: '15%',
  },
  imageView: {
    width: 40,
    height: 45,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Roboto-Bolds',
    fontWeight: 'bold',
    color: '#FFF',
  },
  no_connection: {
    height: 50,
    backgroundColor: '#101010',
    width: '100%',
    justifyContent: 'center',
  },
  no_connection_image: {
    height: '35%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    paddingHorizontal: 30,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 30,
    fontFamily: 'Roboto-Light',
  },
  swipeDownImage: {
    // marginTop: 10,
    marginVertical: 30,
    marginHorizontal: 20,
    backgroundColor: '#101010',
    // backgroundColor: 'red',
    width: '90%',
    height: '9%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    flexDirection: 'row',
  },
});
