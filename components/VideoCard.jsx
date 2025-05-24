import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import icons from "../constants/icons";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import { StyleSheet } from "react-native";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);
  const player = useVideoPlayer(video);
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });
  useEffect(() => {
    if (play) {
      player.replay();
      player.play();
    } else {
      player.pause();
    }
  }, [play]);

  useEffect(() => {
    if (!isPlaying) {
      setPlay(false);
    }
  }, [isPlaying]);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row items-start gap-3">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-semibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-100 text-xs font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} resizeMode="contain" className="w-5 h-5" />
        </View>
      </View>
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
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3 "
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  customStyle: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginTop: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export default VideoCard;
