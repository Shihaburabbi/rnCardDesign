/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, {useState, useRef, useContext} from 'react';
import {
  View,
  Animated,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import {FeedRow} from '../Component/FeedRow';
import {AppContext} from '../Context';
import CommonStyle from '../Theme/CommonStyle';
import {height, isIOS} from '../Utils/Constant';
import {data} from '../Utils/data';
import axios from 'axios';
import {FeedHeader} from '../Component/FeedHeader';

const Reels = props => {
  // const storyDatas = props.route.params.storyReelData;
  const {displayHeight, setDisplayHeight} = useContext(AppContext);
  const refFlatList = useRef();
  const [scrollY] = useState(new Animated.Value(0));
  const [scrollInfo, setScrollInfo] = useState({isViewable: true, index: 0});

  const [loading, setLoading] = useState(false);
  const [storyData, setStoryReelData] = useState([]);
  const [indexItem, setIndexItem] = useState(0);

  const opacity = useRef(new Animated.Value(1)).current;

  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [animationLike, setAnimationLike] = useState('');

  const viewabilityConfig = {viewAreaCoveragePercentThreshold: 80};

  const getStoryData = async () => {
    if (!loading && !isListEnd) {
      setLoading(true);
      const formData = new FormData();
      formData.append('token', 'bf4d4a6c471b2d4787be2e4f549a4e15');
      formData.append('action', 'latest');

      try {
        // make axios post request
        const response = await axios({
          method: 'post',
          url:
            'https://www.shareslate.com/apis/story/showStories.php?limit=' +
            offset,
          data: formData,
          headers: {'Content-Type': 'multipart/form-data'},
        });
        console.log(response.data.data);
        if (response.data.data.length > 0) {
          setOffset(offset + 1);
          //After the response increasing the offset for the next API call.
          setStoryReelData([...storyData, ...response.data.data]);
          // console.log('kjkjkj', response.data.data);
          setLoading(false);
        } else {
          setIsListEnd(true);
          setLoading(false);
        }
        // setStoryReelData(response.data.data);
        // setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onReaction = async (item, index) => {
    let newStoryData = [...storyData];
    let reactions_flag = true;

    // if (item.reactions_flag) {

    // } else {

    // }

    setAnimationLike('jello');

    const formData = new FormData();
    if (item.reactions_flag) {
      formData.append('action', 'remove');
      reactions_flag = false;
      item.reactions = item.reactions - 1;
    } else {
      formData.append('action', 'add');
      item.reactions = item.reactions + 1;
    }
    item.reactions_flag = reactions_flag;
    newStoryData[index] = item;
    setStoryReelData(newStoryData);
    formData.append('token', 'bf4d4a6c471b2d4787be2e4f549a4e15');

    formData.append('storyId', item.story_id.toString());
    formData.append('reaction', '1');

    try {
      // make axios post request
      const response = await axios({
        method: 'post',
        url: 'https://www.shareslate.com/apis/story/reaction.php',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      });
      // alert(JSON.stringify(response));
      // setComments(response.data.data);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setAnimationLike('');
  };

  const onViewableItemsChanged = useRef(viewableItems => {
    const info = {
      isViewable: viewableItems.changed[0].isViewable,
      index: viewableItems.changed[0].index,
    };
    setScrollInfo(info);
  });

  const transitionAnimation = index => {
    const rowHeight = displayHeight * index;
    return {
      opacity: scrollY.interpolate({
        inputRange: [
          rowHeight,
          rowHeight + displayHeight / 2,
          rowHeight + displayHeight,
        ],
        outputRange: [1, 0.2, 0],
        useNativeDriver: true,
        extrapolate: 'clamp',
      }),
    };
  };

  const getItemLayout = (item, index) => ({
    length: displayHeight,
    offset: displayHeight * index,
    index,
  });

  const onLayout = ({nativeEvent}) => {
    setDisplayHeight((!isIOS && nativeEvent.layout.height) || height);
  };

  const onEndReached = () => {
    // make api call here
    // getStoryData();
  };

  const keyExtractor = (item, index) => {
    return `${index}`;
  };

  // console.log(JSON.stringify(storyData));

  React.useEffect(() => {
    getStoryData();
  }, []);

  const onComment = ittemData => {
    // alert(JSON.stringify(ittemData))
    props.navigation.navigate('Comments', {
      data: ittemData,
    });
  };

  const renderItem = ({item, index}) => {
    const scrollIndex = scrollInfo?.index || 0;
    const isNext = index >= scrollIndex - 1 && index <= scrollIndex + 1;
    // console.log(item);
    return (
      <FeedRow
        item={item}
        isNext={isNext}
        index={index}
        transitionAnimation={transitionAnimation}
        visible={scrollInfo}
        animationLike={animationLike}
        isVisible={scrollIndex === index}
        onComment={() => onComment(item)}
        onReaction={() => onReaction(item, index)}
      />
    );
  };

  const Loader = () => (
    <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  );

  const renderFooter = () => {
    return (
      //Footer View with Loader
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        {loading ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : null}
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <View style={CommonStyle.flexContainer} onLayout={onLayout}>
      <StatusBar backgroundColor="transparent" translucent />
      <FeedHeader />
      {!loading ? (
        <>
          {storyData.length > 0 ? (
            <Animated.FlatList
              pagingEnabled
              showsVerticalScrollIndicator={false}
              ref={refFlatList}
              automaticallyAdjustContentInsets={true}
              onViewableItemsChanged={onViewableItemsChanged.current}
              viewabilityConfig={viewabilityConfig}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {contentOffset: {y: scrollY}},
                  },
                ],
                {
                  useNativeDriver: false,
                },
              )}
              data={storyData}
              renderItem={renderItem}
              getItemLayout={getItemLayout}
              keyExtractor={keyExtractor}
              // removeClippedSubviews={true}

              snapToAlignment={'start'}
              decelerationRate={'fast'}
              onEndReached={getStoryData}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
              ItemSeparatorComponent={ItemSeparatorView}
            />
          ) : null}
        </>
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default Reels;
