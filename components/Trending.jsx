import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};
const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const player = useVideoPlayer(item.video);
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.isPlaying,
  });

  useEffect(() => {
    if (play) {
      player.replay();
      player.play();
    }
  }, [play, player]);

  useEffect(() => {
    if (!isPlaying) {
      setPlay(false);
    }
  }, [isPlaying]);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <VideoView
          style={styles.customStyle}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          nativeControls={false}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              console.log("didJustFinish");
              player.replay();
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
          ></ImageBackground>
          <Image
            source={icons.play}
            className="absolute items-center justify-center w-10 h-10"
          ></Image>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <TrendingItem activeItem={activeItem} item={item} />
        )}
        keyExtractor={(item) => item.$id}
        horizontal
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        contentOffset={{ x: 170 }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  customStyle: {
    width: 208, // Equivalent to w-52
    height: 288, // Equivalent to h-72
    borderRadius: 33, // Equivalent to rounded-[33px]
    marginTop: 12, // Equivalent to mt-3
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Equivalent to bg-white/10
  },
});
export default Trending;
