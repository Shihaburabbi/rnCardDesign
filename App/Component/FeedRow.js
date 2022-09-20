import React from 'react';
import {View} from 'react-native';
import {FeedFooter} from './FeedFooter';
import {FeedHeader} from './FeedHeader';
import {FeedSideBar} from './FeedSideBar';
import {VideoComponent} from './VideoComponent';

const FeedRow = ({
  item,
  isNext,
  isVisible,
  index,
  transitionAnimation,
  onComment,
  onReaction,
  animationLike,
}) => {
  // let {post} = item;
  // console.log('kkk', item);
  return (
    <View>
      <VideoComponent post={item} isNext={isNext} isVisible={isVisible} />
      {/* <FeedHeader item={item} animation={transitionAnimation(index)} /> */}
      {/* <FeedSideBar item={item} animation={transitionAnimation(index)} /> */}
      <FeedFooter
        item={item}
        animation={transitionAnimation(index)}
        onComment={onComment}
        onReaction={onReaction}
        animationLike={animationLike}
      />
    </View>
  );
};

export {FeedRow};
