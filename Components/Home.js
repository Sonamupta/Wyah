import React, {useEffect} from 'react';
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

import Icon from 'react-native-vector-icons/AntDesign';
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';
// import SoundPlayer from 'react-native-sound-player';
// import AudioPlayer from './AudioPlayer';

const SLIDER_WIDTH = 500;
const ITEM_WIDTH = 500;
// const ITEM_HEIGHT = 500;

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
          backgroundColor: '#0070c0',
          bottom: 0,
          zIndex: 0,

          borderRadius: 10,
          opacity: 0.8,
          overflow: 'hidden',
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
  let carousel = '';
  let player = '';
  const [getindex, setIndex] = React.useState(0);
  const [getDisable, setDisable] = React.useState(false);
  const [changeIcon, setIcon] = React.useState(false);
  const [changeIconVideo, setChangeIconVideo] = React.useState(false);

  const [item, setItem] = React.useState([
    {type: 'image', id: 1, pic: require('../images/shake1.png')},
    {
      type: 'image',
      id: 2,
      pic: require('../images/text1.png'),
    },
    {type: 'text', id: 3, pic: 'Report inappropriate Post'},

    {type: 'image', id: 4, pic: require('../images/video1.png')},
    {
      type: 'audio',
      id: 5,
      pic: 'https://soundbible.com/mp3/45min_april_rainstorm-mike-koenig.mp3',
    },
    {
      type: 'video',
      id: 6,
      pic: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const changeButton = () => {
    setIcon(!changeIcon);
  };

  const changeVideo = () => {
    // Alert.alert('ok');
    setChangeIconVideo(!changeIconVideo);
  };

  const _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
        }}>
        {item.type == 'image' ? (
          <Image
            source={item.pic}
            resizeMode="contain"
            style={{height: '100%', width: '100%'}}
          />
        ) : item.type == 'text' ? (
          <View
            style={{
              height: '100%',
              width: '100%',

              paddingHorizontal: 30,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: '#FFF',
                fontFamily: 'Roboto-Thin',
                // textAlign: 'center',
                alignSelf: 'center',
                paddingTop: 50,
                // alignSelf: 'center',
                // paddingHorizontal: 30,
              }}>
              {item.pic}
            </Text>
          </View>
        ) : item.type == 'audio' ? (
          <View style={{height: '100%', width: '100%'}}>
            <Image
              source={require('../images/mask1.png')}
              style={{height: '100%', width: '100%'}}
            />
            <View
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                paddingTop: 120,
              }}>
              <TouchableOpacity
                onPress={() => {
                  changeButton();
                }}>
                {changeIcon ? (
                  <Icon name="pause" size={40} color="#FFF" />
                ) : (
                  <Icon name="play" size={40} color="#FFF" />
                )}
              </TouchableOpacity>
              <Video
                // resizeMode="contain"

                source={{
                  uri: item.pic,
                }}
                ref={ref => {
                  player = ref;
                }}
                audioOnly={true}
                // paused={changeIcon}
                // paused={getindex == 4 ? false : true}
                // paused={changeIcon == false && getindex != 4 ? true : false}
                paused={
                  changeIcon == false && getindex != 4
                    ? true
                    : changeIcon == true && getindex == 4
                    ? false
                    : true
                }
                resizeMode={'cover'}
                style={styles.backgroundVideo}
              />
            </View>
          </View>
        ) : item.type == 'video' ? (
          <View
            style={{
              height: '100%',

              width: '100%',
              // backgroundColor: 'green',
              zIndex: 1,
              // marginTop: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  // alignSelf: 'center',
                  // paddingTop: 100,
                  // backgroundColor: '#FFF',
                  right: 5,
                  marginTop: 100,
                  zIndex: 1,
                }}
                onPress={() => {
                  changeVideo();
                }}>
                {changeIconVideo ? (
                  <Icon name="pause" size={40} color="white" />
                ) : (
                  <Icon name="play" size={40} color="white" />
                )}
              </TouchableOpacity>
            </View>
            <Video
              // resizeMode="contain"

              source={{
                uri: item.pic,
              }}
              ref={ref => {
                player = ref;
              }}
              // paused={getindex == 5 ? false : true}
              paused={
                changeIconVideo == false && getindex != 5
                  ? true
                  : changeIconVideo == true && getindex == 5
                  ? false
                  : true
              }
              // controls={getindex == 5 ? true : false}
              resizeMode={'cover'}
              style={styles.backgroundVideo}
            />
          </View>
        ) : null}
      </View>
    );
  };

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
            paddingHorizontal: 15,
            // backgroundColor: 'red',
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.swipeParent}>
            <View style={styles.container}>
              <Carousel
                ref={ref => (carousel = ref)}
                data={item}
                sliderWidth={390}
                itemWidth={410}
                renderItem={_renderItem}
                onSnapToItem={index => setIndex(index)}
              />

              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '74%',
                }}>
                <View style={styles.arrowView}>
                  <TouchableOpacity
                    onPress={() => carousel._snapToItem(getindex - 1)}>
                    <View>
                      <Image
                        source={require('../images/arrow_left.png')}
                        style={{height: 50}}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => carousel._snapToItem(getindex + 1)}>
                    <View>
                      <Image
                        source={require('../images/arrow_right.png')}
                        style={{height: 50}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#0070c0',
                    opacity: 0.8,
                    height: 'auto',
                    top: 5,
                  }}>
                  <View style={{marginLeft: 10}}>
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
                  <View
                    style={{marginTop: 3, marginLeft: 12, paddingVertical: 3}}>
                    <Image source={require('../images/date1.png')} />
                  </View>
                </View>
              </View>
            </View>
          </View>

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
    // width: 300,
    height: 300,
    borderRadius: 10,
    // backgroundColor: 'green',
    overflow: 'hidden',
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
  },
});
