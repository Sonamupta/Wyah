import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
export default function Splash(props) {
  const callPage = () => {
    setTimeout(() => {
      props.navigation.navigate('Home');
      // props.navigation.navigate('NoConnection');
    }, 5000);
  };
  useEffect(() => {
    callPage();
  }, []);
  // useEffect(() => {
  //   NetInfo.fetch().then(networkState => {
  //     // console.log('Connection type - ', networkState.type);
  //     // console.log('Is connected? - ', networkState.isConnected);
  //     // networkState.isConnected == true
  //     //   ? props.navigation.navigate('')
  //     //   : props.navigation.navigate('NoConnection');
  //     networkState.isConnected == true
  //       ? props.navigation.navigate('')
  //       : props.navigation.navigate('NoConnection');
  //   });
  // }, []);

  NetInfo.fetch().then(networkState => {
    // console.log('Connection type - ', networkState.type);
    // console.log('Is connected? - ', networkState.isConnected);
    // networkState.isConnected == true
    //   ? props.navigation.navigate('')
    //   : props.navigation.navigate('NoConnection');
    networkState.isConnected == true
      ? props.navigation.navigate('')
      : props.navigation.navigate('NoConnection');
  });
  return (
    <SafeAreaView>
      <View style={{width: '100%', height: '100%', backgroundColor: '#000'}}>
        <View style={styles.header}>
          <Image
            source={require('../images/Image1.png')}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>

        <View
          style={{
            height: '20%',
            marginHorizontal: 40,
          }}>
          <Text style={styles.text1}>
            Write Your own content for free on {'\n'}
            www.wyah.online
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.text2}>
            App installation key: V101AFEAG342F342 {'\n'} App Version. 1.01
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: '60%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  text1: {
    textAlign: 'center',
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'Roboto-Light',
  },
  text2: {
    color: '#7f7f7f',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Roboto-Light',
  },
});
