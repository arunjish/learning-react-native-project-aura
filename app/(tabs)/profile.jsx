import { View, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import EmptyState from "../../components/EmptyState";
import { getUserPosts, signout } from "../../lib/appwrite";
import useAppWrite from "../../lib/useAppWrite";
import VideoCard from "../../components/VideoCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";
const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppWrite(() => getUserPosts(user.$id));
  useEffect(() => {
    refetch();
  }, [user]);

  const handleLogout = async () => {
    await signout();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={handleLogout}
            >
              <Image
                className="w-6 h-6"
                source={icons.logout}
                resizeMode="contain"
              ></Image>
            </TouchableOpacity>

            <View className="w-16 h-16 border-secondary border rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className=" rounded-lg w-[90%] h-[90%]"
                resizeMode="cover"
              ></Image>
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="flex-row mt-5">
              <InfoBox
                title={posts?.length || 0}
                subTitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-lg"
              />
              <InfoBox
                title="1.2k"
                subTitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subTitle="No videos found for this search"
          />
        )}
      ></FlatList>
    </SafeAreaView>
  );
};

export default Profile;
