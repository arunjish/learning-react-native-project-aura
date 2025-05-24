import { View, Text, ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { router, Redirect } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
export default function App() {
  const { isLoggedIn, isLoading } = useGlobalContext();
  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] has-[84px]"
            resizeMode="contain"
          ></Image>
          <Image
            source={images.cards}
            className="max-w-[380px] h-[300px] w-full"
          ></Image>
          <View className="relative mt-5">
            <Text className="text-3xl text-white  font-bold text-center">
              Discover endless {"\n"} possibilities with{" "}
              <Text className="text-secondary-200"> Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            ></Image>
          </View>
          <Text className="text-gray-100 mt-7 text-center text-sm font-pregular">
            Where Creativity Meets Innovation: Embark on {"\n"}a Journey of
            Limitless Exploration with Aora
          </Text>

          <CustomButton
            title="continue with email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-5"
          ></CustomButton>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
