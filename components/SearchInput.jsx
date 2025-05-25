import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { usePathname, router } from "expo-router";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="border-2 border-black-200 h-16 w-full px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base text-white font-pregular mt-0.5 flex-1"
        value={query}
        placeholder="Search for a topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      ></TextInput>
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing Query",
              "Please inout something to search results across database"
            );
          }
          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          className="w-5 h-5"
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
