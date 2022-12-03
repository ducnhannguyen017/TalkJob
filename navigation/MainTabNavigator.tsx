import { AntDesign, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { Fontisto } from "@expo/vector-icons";

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabTwoScreen from '../screens/TabTwoScreen';
import { MainTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import FriendsScreen from '../screens/FriendsScreen';
import ChatsScreen from '../screens/ChatsScreen';
import TabOneScreen from '../screens/TabOneScreen';
import { Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TasksScreen from '../screens/TasksScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';

const BottomTab = createBottomTabNavigator<any>();

function MainTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerStyle: {
          backgroundColor: Colors.light.tint,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: Colors.light.background,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}>
      <BottomTab.Screen
        name="Chats"
        component={ChatsScreen}
        options={({ navigation }: any) => ({
          tabBarIcon: ({color})=> <AntDesign name="wechat" size={24} color={color} />,
          headerShown: false,
          tabBarOptions: {
            showIcon: false,
          }
        })}
      />
      <BottomTab.Screen
        name="Friends"
        component={FriendsScreen}
        options={({navigation}:any)=>({
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-friends" size={24} color={color} />,
          headerShown: false,
          tabBarOptions: {
            showIcon: false,
          }
        })}
      />
      <BottomTab.Screen
        name="Tasks"
        component={TasksScreen}
        options={({navigation}:any)=>({
          tabBarIcon: ({ color }) => <Ionicons name="code-working" size={24} color={color} />,
          headerShown: false,
          tabBarOptions: {
            showIcon: false,
          }
        })}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: any) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={FriendsScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}
export default MainTabNavigator;
