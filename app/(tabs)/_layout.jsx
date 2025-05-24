import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import { View, Image, Text } from "react-native";

const TabIcon = ({ focused, color, icon, name }) => (
  <View className="items-center justify-center gap-2 w-16">
    <Image
      source={icon}
      resizeMode="contain"
      tintColor={color}
      className="w-6 h-6"
    />
    <Text
      className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
      style={{ color: color }}
    >
      {name}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            TabIcon({ icon: icons.home, focused, color, name: "Home" }),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            TabIcon({
              icon: icons.bookmark,
              focused,
              color,
              name: "Bookmark",
            }),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            TabIcon({ icon: icons.plus, focused, color, name: "Create" }),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            TabIcon({ icon: icons.profile, focused, color, name: "Profile" }),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
