import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TermAndCondition from './Components/TermAndCondition';
import ScreenHeader from './Components/ScreenHeader';
import Splash from './Components/Splash';
import NoConnection from './Components/NoConnection';
import Home from './Components/Home';
import videoLearn from './Components/videoLearn';

const Stack = createStackNavigator();

export default function App() {
  console.disableYellowBox = true;
  return (
    // <View style={{flex: 1}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TermAndCondition"
          component={TermAndCondition}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen name="ScreenHeader" component={ScreenHeader} />
        <Stack.Screen
          name="NoConnection"
          component={NoConnection}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />

        {/* <Stack.Screen
          name="video"
          component={videoLearn}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>

    // </View>
  );
}
