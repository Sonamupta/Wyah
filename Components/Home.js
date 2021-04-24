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

import Icon from 'react-native-vector-icons/AntDesign';
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';
import Geolocation from '@react-native-community/geolocation';
const image_source_path = 'http://9094/fileupload/';
import axios from 'axios';
const SLIDER_WIDTH = Dimensions.get('window').width * 0.94;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
import NetInfo from '@react-native-community/netinfo';

import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';

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
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');

  const AudioPlayer = useRef(null);
  const [currentTimeAudio, setCurrentTimeAudio] = useState(0);
  const [durationAudio, setDurationAudio] = useState(0);

  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
  const [pausedAudio, setPausedAudio] = useState(false);
  const [playerStateAudio, setPlayerStateAudio] = useState(
    PLAYER_STATES.PLAYING,
  );
  const [getMapAudioValue, setMapAudioValue] = React.useState([]);
  const [getMapVideoValue, setMapVideoValue] = React.useState([]);
  const [screenTypeAudio, setScreenTypeAudio] = useState('content');
  const [getAudio, setAudio] = useState(false);

  // console.log('insideitemcomponent', item);

  ////////////////////////////// Video Function start /////////////////////////

  const onSeek = seek => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = playerState => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = data => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = data => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = currentTime => setCurrentTime(currentTime);

  //////////////////////////  Video Function End ////////////////////////////////

  //////////////////// Audio Function Start //////////////////////////////////////////

  const onSeekAudio = seek => {
    //Handler for change in seekbar
    AudioPlayer.current.seek(seek);
  };

  const onPausedAudio = (playerState, getindex) => {
    //Handler for Video Pause

    setPausedAudio(!pausedAudio);
    setPlayerStateAudio(playerState);
  };

  const onReplayAudio = () => {
    //Handler for Replay
    setPlayerStateAudio(PLAYER_STATES.PLAYING);
    AudioPlayer.current.seek(0);

    // setPaused(paused);
  };

  const onProgressAudio = data => {
    // Video Player will progress continue even if it ends
    if (!isLoadingAudio && playerStateAudio !== PLAYER_STATES.ENDED) {
      setCurrentTimeAudio(data.currentTime);
    }
  };

  const onLoadAudio = data => {
    setDurationAudio(data.duration);
    setIsLoadingAudio(false);
  };

  const onLoadStartAudio = data => setIsLoadingAudio(true);

  const onEndAudio = () => {
    setPlayerStateAudio(PLAYER_STATES.ENDED);
  };

  const onSeekingAudio = currentTime => setCurrentTimeAudio(currentTime);

  ////////////////////////////// Audio Function End ////////////////////////////

  const playAudio = () => {
    setAudio(true);
  };

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
      <View
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 10,
          // backgroundColor: 'red',
          // overflow: 'hidden',
        }}>
        {item.type == 'image' ? (
          <Image
            // source={{uri: image_source_path + item.files}}
            source={item.pic}
            style={{
              height: '100%',
              width: '100%',
              resizeMode: 'cover',
              borderRadius: 10,
            }}
          />
        ) : item.type == 'text' ? (
          <View
            style={{
              height: '100%',
              width: '100%',

              paddingHorizontal: 25,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: '#FFF',
                lineHeight: 25,
                fontFamily: 'Roboto-Thin',
                // textAlign: 'left',
                alignSelf: 'center',
                paddingTop: 50,
                // alignSelf: 'center',
                // paddingHorizontal: 10,s
              }}>
              {item.pic}
            </Text>
          </View>
        ) : item.type == 'audio' ? (
          getAudio ? (
            <View
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 10,
                // backgroundColor: 'green',
              }}>
              <Image
                source={require('../images/mask1.png')}
                style={{height: '100%', width: '100%', borderRadius: 10}}
              />

              <Video
                // resizeMode="contain"

                source={{
                  uri: item.pic,
                }}
                onEnd={onEndAudio}
                onLoad={onLoadAudio}
                onLoadStart={onLoadStartAudio}
                onProgress={onProgressAudio}
                ref={AudioPlayer}
                paused={
                  // getindex != getMapAudioValue && pausedAudio == false
                  //   ? true
                  //   : getindex == getMapAudioValue && pausedAudio == false
                  //   ? pausedAudio
                  //   : true
                  // getindex !== getMapAudioValue || pausedAudio
                  pausedAudio
                  // getindex == index ? false : true
                  // getindex == index ? false : true
                }
                // controls={getindex == 5 ? true : false}
                resizeMode={'cover'}
                volume={10}
                style={styles.backgroundVideo}
              />

              <MediaControls
                duration={durationAudio}
                isLoading={isLoadingAudio}
                mainColor="#333"
                onPaused={onPausedAudio}
                onReplay={onReplayAudio}
                onSeek={onSeekAudio}
                onSeeking={onSeekingAudio}
                playerState={playerStateAudio}
                progress={currentTimeAudio}
                // showOnStart={true}
                toolbar={renderToolbar()}
              />
            </View>
          ) : (
            <View style={{height: '100%', width: '100%'}}>
              <Image
                source={require('../images/imp1.png')}
                style={{height: '100%', width: '100%'}}
              />
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor: 'red',
                  paddingVertical: 135,
                  position: 'absolute',
                }}
                onPress={() => playAudio()}>
                <Image
                  source={require('../images/pause.png')}
                  style={{height: 40, width: 40, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
          )
        ) : item.type == 'video' ? (
          getAudio ? (
            <View
              style={{
                height: '100%',

                width: '100%',

                // backgroundColor: 'blue',
                borderRadius: 10,
              }}>
              <Video
                // resizeMode="contain"

                source={{
                  uri: item.pic,
                }}
                onEnd={onEnd}
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                // autoplay={true}
                onProgress={onProgress}
                ref={videoPlayer}
                paused={
                  // getindex != getMapVideoValue && paused == false
                  //   ? true
                  //   : getindex == getMapVideoValue && paused == false
                  //   ? false
                  //   : true
                  paused
                }
                // controls={getindex == 5 ? true : false}
                resizeMode={'cover'}
                volume={10}
                style={styles.backgroundVideo}
              />

              <MediaControls
                duration={duration}
                isLoading={isLoading}
                mainColor="#333"
                onPaused={onPaused}
                onReplay={onReplay}
                onSeek={onSeek}
                onSeeking={onSeeking}
                playerState={playerState}
                progress={currentTime}
                toolbar={renderToolbar()}
              />
            </View>
          ) : (
            <View style={{height: '100%', width: '100%'}}>
              <Image
                source={require('../images/imp1.png')}
                style={{height: '100%', width: '100%'}}
              />
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor: 'red',
                  paddingVertical: 135,
                  position: 'absolute',
                }}
                onPress={() => playAudio()}>
                <Image
                  source={require('../images/pause.png')}
                  style={{height: 40, width: 40, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
          )
        ) : null}
      </View>
      {(item.type == 'audio' && item.type == 'video') ||
      getAudio == true ? null : (
        <View
          style={{
            position: 'absolute',
            width: '100%',

            backgroundColor: '#0070c0',
            bottom: 0,
            zIndex: 0,
            height: 80,

            borderRadius: 10,
            opacity: 0.8,
            // overflow: 'hidden',
            // paddingHorizontal: 5,
          }}>
          <View style={{marginTop: 5, marginLeft: 10}}>
            <Text
              style={{
                fontSize: 18,
                color: '#FFF',
                fontFamily: 'Roboto-Regular',
              }}>
              Today's special @ Café Albero
            </Text>
          </View>
          <View style={{marginTop: 5, marginLeft: 10, flexDirection: 'row'}}>
            <Image
              source={require('../images/user.png')}
              style={{height: 20, width: 15, resizeMode: 'contain'}}
            />
            <Text style={{color: '#FFF', marginLeft: 10}}>{item.fullname}</Text>
          </View>
          <View style={{marginTop: 3, marginLeft: 12, flexDirection: 'row'}}>
            <Image
              source={require('../images/calender.png')}
              style={{height: 20, width: 15, resizeMode: 'contain'}}
            />
            <Text style={{color: '#FFF', marginLeft: 10, fontSize: 14}}>
              2021/03/22
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const _renderItem = ({item, index, getindex, onSnapToItem, carousel}) => {
  // console.log(index, getindex);

  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');

  const AudioPlayer = useRef(null);
  const [currentTimeAudio, setCurrentTimeAudio] = useState(0);
  const [durationAudio, setDurationAudio] = useState(0);

  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
  const [pausedAudio, setPausedAudio] = useState(false);
  const [playerStateAudio, setPlayerStateAudio] = useState(
    PLAYER_STATES.PLAYING,
  );
  const [getMapAudioValue, setMapAudioValue] = React.useState([]);
  const [getMapVideoValue, setMapVideoValue] = React.useState([]);
  const [screenTypeAudio, setScreenTypeAudio] = useState('content');
  const [getAudio, setAudio] = useState(false);
  const [getpaused, setgoPaused] = useState(false);

  ////////////////////////////// Video Function start /////////////////////////

  const onSeek = seek => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = playerState => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = data => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = data => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = currentTime => setCurrentTime(currentTime);

  //////////////////////////  Video Function End ////////////////////////////////

  //////////////////// Audio Function Start //////////////////////////////////////////

  const onSeekAudio = seek => {
    //Handler for change in seekbar
    AudioPlayer.current.seek(seek);
  };

  const onPausedAudio = (playerState, getindex) => {
    //Handler for Video Pause

    setPausedAudio(!pausedAudio);
    setPlayerStateAudio(playerState);
  };

  const onReplayAudio = () => {
    //Handler for Replay
    setPlayerStateAudio(PLAYER_STATES.PLAYING);
    AudioPlayer.current.seek(0);

    // setPaused(paused);
  };

  const onProgressAudio = data => {
    // Video Player will progress continue even if it ends
    if (!isLoadingAudio && playerStateAudio !== PLAYER_STATES.ENDED) {
      setCurrentTimeAudio(data.currentTime);
    }
  };

  const onLoadAudio = data => {
    setDurationAudio(data.duration);
    setIsLoadingAudio(false);
  };

  const onLoadStartAudio = data => setIsLoadingAudio(true);

  const onEndAudio = () => {
    setPlayerStateAudio(PLAYER_STATES.ENDED);
  };

  const onSeekingAudio = currentTime => setCurrentTimeAudio(currentTime);

  ////////////////////////////// Audio Function End ////////////////////////////

  const playAudio = () => {
    setAudio(true);
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',

        // backgroundColor: 'red',
        // overflow: 'hidden',
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 10,
          // backgroundColor: 'red',
          // overflow: 'hidden',
        }}>
        {item.type == 'image' ? (
          <Image
            source={item.pic}
            style={{
              height: '100%',
              width: '100%',
              resizeMode: 'cover',
              borderRadius: 10,
            }}
          />
        ) : item.type == 'text' ? (
          <View
            style={{
              height: '100%',
              width: '100%',

              paddingHorizontal: 25,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: '#FFF',
                lineHeight: 25,
                fontFamily: 'Roboto-Thin',
                // textAlign: 'left',
                alignSelf: 'center',
                paddingTop: 50,
                // alignSelf: 'center',
                // paddingHorizontal: 10,s
              }}>
              {item.pic}
            </Text>
          </View>
        ) : item.type == 'audio' ? (
          getAudio ? (
            <View
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 10,
                // backgroundColor: 'green',
              }}>
              <Image
                source={require('../images/mask1.png')}
                style={{height: '100%', width: '100%', borderRadius: 10}}
              />

              <Video
                // resizeMode="contain"

                source={{
                  uri: item.pic,
                }}
                onEnd={onEndAudio}
                onLoad={onLoadAudio}
                onLoadStart={onLoadStartAudio}
                onProgress={onProgressAudio}
                ref={AudioPlayer}
                paused={
                  // getindex != getMapAudioValue && pausedAudio == false
                  //   ? true
                  //   : getindex == getMapAudioValue && pausedAudio == false
                  //   ? pausedAudio
                  //   : true
                  // getindex !== getMapAudioValue || pausedAudio
                  // pausedAudio
                  getindex == index ? pausedAudio : true
                  // getindex == index ? false : true
                }
                // controls={getindex == 5 ? true : false}
                resizeMode={'cover'}
                volume={10}
                style={styles.backgroundVideo}
              />

              <MediaControls
                duration={durationAudio}
                isLoading={isLoadingAudio}
                mainColor="#333"
                onPaused={onPausedAudio}
                onReplay={onReplayAudio}
                onSeek={onSeekAudio}
                onSeeking={onSeekingAudio}
                playerState={playerStateAudio}
                progress={currentTimeAudio}
                // showOnStart={true}
                toolbar={renderToolbar()}
              />
            </View>
          ) : (
            <View style={{height: '100%', width: '100%'}}>
              <Image
                source={require('../images/imp1.png')}
                style={{height: '100%', width: '100%'}}
              />
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor: 'red',
                  paddingVertical: 135,
                  position: 'absolute',
                }}
                onPress={() => playAudio()}>
                <Image
                  source={require('../images/pause.png')}
                  style={{height: 40, width: 40, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
          )
        ) : item.type == 'video' ? (
          getAudio ? (
            <View
              style={{
                height: '100%',

                width: '100%',

                // backgroundColor: 'blue',
                borderRadius: 10,
              }}>
              <Video
                // resizeMode="contain"

                source={{
                  uri: item.pic,
                }}
                onEnd={onEnd}
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                // autoplay={true}
                onProgress={onProgress}
                ref={videoPlayer}
                paused={
                  // getindex != getMapVideoValue && paused == false
                  //   ? true
                  //   : getindex == getMapVideoValue && paused == false
                  //   ? false
                  //   : true
                  getindex == index ? paused : true
                  // paused
                }
                // controls={getindex == 5 ? true : false}
                resizeMode={'cover'}
                volume={10}
                style={styles.backgroundVideo}
              />

              <MediaControls
                duration={duration}
                isLoading={isLoading}
                mainColor="#333"
                onPaused={onPaused}
                onReplay={onReplay}
                onSeek={onSeek}
                onSeeking={onSeeking}
                playerState={playerState}
                progress={currentTime}
                toolbar={renderToolbar()}
              />
            </View>
          ) : (
            <View style={{height: '100%', width: '100%'}}>
              <Image
                source={require('../images/imp1.png')}
                style={{height: '100%', width: '100%'}}
              />
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor: 'red',
                  paddingVertical: 135,
                  position: 'absolute',
                }}
                onPress={() => playAudio()}>
                <Image
                  source={require('../images/pause.png')}
                  style={{height: 40, width: 40, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
          )
        ) : item.type == 'report' ? (
          <View
            style={{
              height: '100%',
              width: '100%',

              paddingHorizontal: 25,
            }}>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 15,
                  color: '#FFF',
                  lineHeight: 25,
                  fontFamily: 'Roboto-Thin',
                  // textAlign: 'left',
                  alignSelf: 'center',
                  paddingTop: 50,
                  // alignSelf: 'center',
                  // paddingHorizontal: 10,s
                }}>
                {item.pic}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      {(item.type == 'audio' && item.type == 'video') ||
      getAudio == true ? null : (
        <View
          style={{
            width: '100%',
            // height: '100%',
            backgroundColor: '#0070c0',
            opacity: 0.8,
            // height: '26%',
            bottom: 0,
            zIndex: 0,
            height: 80,
            // top: 5,
            borderRadius: 10,
            position: 'absolute',
          }}>
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                top: 2,
                fontSize: 18,
                color: '#FFF',
                fontFamily: 'Roboto-Regular',
              }}>
              Today's special @ Café Albero
            </Text>
          </View>
          <View
            style={{
              marginTop: 5,
              marginLeft: 10,
              flexDirection: 'row',
            }}>
            <Image
              source={require('../images/user.png')}
              style={{height: 20, width: 15, resizeMode: 'contain'}}
            />
            <Text style={{color: '#FFF', marginLeft: 10}}>Michael_323</Text>
          </View>
          <View
            style={{
              marginTop: 3,
              marginLeft: 12,
              paddingVertical: 3,
              flexDirection: 'row',
            }}>
            <Image
              source={require('../images/calender.png')}
              style={{height: 20, width: 15, resizeMode: 'contain'}}
            />
            <Text style={{color: '#FFF', marginLeft: 10}}>2021/03/22</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default function Home(props) {
  const [refreshing, setRefreshing] = React.useState(false);

  let carousel = '';
  const [getLatitude, setLatitude] = useState('');
  const [getLongitude, setLongitude] = useState('');

  const [getindex, setIndex] = React.useState(0);
  // const [getDisable, setDisable] = React.useState(false);
  // const [getAudio, setAudio] = useState(false);

  const [getitem, setItem] = React.useState([
    {type: 'image', id: 1, pic: require('../images/shake1.png')},
    {
      type: 'text',
      id: 2,
      // pic: require('../images/text1.png'),
      pic:
        'Lorem ipsum dolor sit amet, consetetursadips elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed ia voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est.',
    },

    {type: 'image', id: 4, pic: require('../images/video1.png')},
    {
      type: 'audio',
      id: 5,
      pic: 'https://soundbible.com/mp3/45min_april_rainstorm-mike-koenig.mp3',
    },
    {
      type: 'audio',
      id: 6,
      pic: 'https://soundbible.com/mp3/45min_april_rainstorm-mike-koenig.mp3',
    },
    {
      type: 'video',
      id: 7,
      pic: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      type: 'video',
      id: 8,
      pic: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {type: 'report', id: 9, pic: 'Report inappropriate Post..'},
  ]);

  const [getitem1, setItem1] = React.useState([
    {type: 'image', id: 1, pic: require('../images/shake1.png')},
    {
      type: 'text',
      id: 2,
      // pic: require('../images/text1.png'),
      pic:
        'Lorem ipsum dolor sit amet, consetetursadips elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed ia voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est.',
    },

    {type: 'image', id: 4, pic: require('../images/video1.png')},
    {
      type: 'audio',
      id: 5,
      pic: 'https://soundbible.com/mp3/45min_april_rainstorm-mike-koenig.mp3',
    },
    {
      type: 'audio',
      id: 6,
      pic: 'https://soundbible.com/mp3/45min_april_rainstorm-mike-koenig.mp3',
    },
    {
      type: 'video',
      id: 7,
      pic: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
  ]);

  const onRefresh = React.useCallback(() => {
    // Alert.alert('in function');
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    // NetInfo.fetch().then(networkState => {
    //   // console.log('Connection type - ', networkState.type);
    //   // console.log('Is connected? - ', networkState.isConnected);
    //   networkState.isConnected == true
    //     ? props.navigation.navigate('')
    //     : props.navigation.navigate('NoConnection');
    // });
  }, [refreshing]);

  NetInfo.fetch().then(networkState => {
    // console.log('Connection type - ', networkState.type);
    // console.log('Is connected? - ', networkState.isConnected);
    networkState.isConnected == true
      ? props.navigation.navigate('')
      : props.navigation.navigate('NoConnection');
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        setLatitude(info.coords.latitude);
        setLongitude(info.coords.longitude);
        // callApiFunction(info.coords.latitude, info.coords.longitude);
      },

      // console.log('infooooooooooo', info,coords.latitude, '-', info.longitude),
      // setGetLocation(info),
    );
  }, []);

  const callApiFunction = (lati, longi) => {
    axios({
      method: 'post',
      url: 'http://digimonk.net:9094/searchlocation',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        latitude: lati,
        longitude: longi,
      },
    })
      .then(async response => {
        var data = response;
        // console.log('1111', data.data.result1);

        setItem(data.data.result1);
        // this.setState({loading: false});

        // console.log('DATASTATUS', data.data.getUserPostList);

        if (data.status == '200') {
          // console.log('get', getitem);
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  const refreshPage = () => {
    onRefresh();
    // <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />;
  };

  const increaseIndex = () => {
    carousel._snapToItem(getindex + 1);
    // setAudio(false);
    // setPlayerStateAudio(PLAYER_STATES.PLAYING);
  };

  const decreaseIndex = () => {
    carousel._snapToItem(getindex - 1);
    // setAudio(false);
    // setPlayerStateAudio(PLAYER_STATES.PLAYING);
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
            <TouchableOpacity
              onPress={() => props.navigation.navigate('NoConnection')}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Roboto-Bolds',
                  fontWeight: 'bold',
                  color: '#FFF',
                }}>
                While You are here..
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mapView}>
          <Text style={{color: '#FFF', fontSize: 15, marginLeft: 20}}>
            @{getLatitude},-{getLongitude}
            {/* SDFG */}
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: '3%',
          }}

          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        >
          <View style={styles.container}>
            <Carousel
              ref={ref => (carousel = ref)}
              data={getitem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              itemHeight={ITEM_HEIGHT}
              // renderItem={_renderItem}
              renderItem={({item, index}) => (
                <_renderItem
                  item={item}
                  getindex={getindex}
                  index={index}
                  carousel={carousel}
                />
              )}
              scrollEnabled={false}
              // onViewableItemsChanged={onViewableItems}
              onSnapToItem={index => setIndex(index)}
              slideStyle={{flex: 1}}
              style={{flex: 1}}
            />
            <View style={{position: 'absolute', top: -25, alignSelf: 'center'}}>
              <TouchableOpacity onPress={() => refreshPage()}>
                <Image
                  resizeMode="contain"
                  style={{height: 60, width: 60}}
                  source={require('../images/refresh.png')}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '74%',
              }}>
              <View style={styles.arrowView}>
                <TouchableOpacity onPress={() => decreaseIndex()}>
                  <View>
                    <Image
                      resizeMode="contain"
                      source={require('../images/arrow_left.png')}
                      style={{height: 35}}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => increaseIndex()}>
                  <View>
                    <Image
                      resizeMode="contain"
                      source={require('../images/arrow_right.png')}
                      style={{height: 35}}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              {/* ////////// */}
            </View>
          </View>
          <View style={{marginTop: 15, borderRadius: 30}}>
            <FlatList
              data={getitem1}
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
    resizeMode: 'contain',
    marginVertical: 93,
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 10,
  },
});
