import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import ColorChanger from "./ColorChanger";
import TodoList from "./TodoList";
import CounterApp from "./CounterApp";
import Comment from "./Comment";
import Messenger from "./Messenger";

const Tab = createBottomTabNavigator();

function TabIcon({ focused, icon, label }) {
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
        {icon}
      </Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
        {label}
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#8E8E93",
        }}
      >
        <Tab.Screen
          name="Messenger"
          component={Messenger}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon="💬" label="Messages" />
            ),
          }}
        />
        <Tab.Screen
          name="Comments"
          component={Comment}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon="💭" label="Comments" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E1E8ED",
    height: 80,
    paddingBottom: 20,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabIconFocused: {
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: "#8E8E93",
  },
  tabLabelFocused: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
