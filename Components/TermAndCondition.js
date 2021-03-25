import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import ScreenHeader from './ScreenHeader';
export default function TermAndCondition(props) {
  return (
    <SafeAreaView
    //  style={{flex: 1}}
    >
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#000000',
        }}>
        <View style={{paddingTop: '12%'}}>
          <ScreenHeader
            leftsideicon={require('../images/header1.png')}
            centertext="While You are here.."
          />
        </View>
        <View style={styles.linkView}>
          <Text style={styles.linkText}>
            Hello there and thank you for using wyah. Before the fun begins
            please read through our T&C (also available on
            <Text
              style={{color: '#0070c0'}}
              onPress={() => Linking.openURL('https://www.wyah.online/TandC')}>
              {` www.wyah.online/TandC) `}
            </Text>{' '}
            and click the Agree button below to continue.
          </Text>
        </View>

        <View style={styles.TC_View}>
          <Text style={styles.TC_Text}>T&C as of 2020/02/15</Text>
        </View>

        <View style={styles.textView}>
          <View style={{marginTop: 15}}>
            <Text style={{color: '#FFF'}}>By Clicking "Agree"</Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <View style={{width: '10%'}}>
              <Text style={styles.text2}>1.</Text>
            </View>
            <View style={{width: '90%'}}>
              <Text style={styles.text1}>
                Please allow wyah to read your location (that’s essential for
                the service)
              </Text>
            </View>
          </View>

          <View style={{width: '100%', flexDirection: 'row', marginTop: 15}}>
            <View style={{width: '10%'}}>
              <Text style={styles.text2}>2.</Text>
            </View>
            <View style={{width: '90%'}}>
              <Text style={styles.text1}>
                An app installation number will be created for general
                statistics to get a better understanding and just helps to see
                how many installs are active and how/ if at all this is being
                used. – this is not tied to any of your personal data like age,
                name, telephone number or whatever. You will get a new number
                with a new install.
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => props.navigation.navigate('Splash')}>
          <View style={styles.agreeView}>
            <Image
              source={require('../images/agree2.png')}
              style={{height: 80, width: 80, resizeMode: 'contain'}}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  linkText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Roboto-Light',
    lineHeight: 20,
    textAlign: 'left',
    textAlignVertical: 'center',
    // includeFontPadding: false,
  },

  textView: {
    height: '35%',

    width: '85%',

    alignSelf: 'center',
  },

  TC_View: {
    width: '100%',
    backgroundColor: '#101010',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 30,
  },
  agreeView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 30,
    marginTop: 15,
  },
  linkView: {
    height: '20%',
    // backgroundColor: 'red',
    paddingVertical: '5%',
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TC_Text: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Roboto-Light',
    textAlign: 'left',
  },
  text1: {
    fontSize: 14,
    color: '#FFF',
    fontFamily: 'Roboto-Light',
    lineHeight: 20,
  },
  text2: {
    fontSize: 14,
    color: '#FFF',
    fontFamily: 'Roboto-Light',
  },
});
