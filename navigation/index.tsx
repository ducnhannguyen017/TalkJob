/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
 import {
  DarkTheme, DefaultTheme, NavigationContainer
} from "@react-navigation/native";
import * as React from "react";
import {
  ColorSchemeName, Pressable, useWindowDimensions, View
} from "react-native";

import LinkingConfiguration from "./LinkingConfiguration";


import {
  MaterialCommunityIcons, Octicons
} from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from "../components/DrawerContent";
import Colors from "../constants/Colors";
import MainTabNavigator from "./MainTabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import ChatsScreen from "../screens/ChatsScreen";
import FriendsScreen from "../screens/FriendsScreen";
import ChatRoomHeader from "./ChatRoomHeader";
import ChatRoomScreen from "../screens/ChatRoomScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<any>();

const defaultOptions = ({ navigation }) => ({
  title: "TalkJob",
  headerRight: () => (
    <View style={{
      flexDirection: 'row',
      width: 60,
      justifyContent: 'space-between',
      marginRight: 10,
    }}>
      <Octicons name="search" size={22} color={'white'} />
      <Pressable onPress={()=> navigation.openDrawer()}>
        <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />
      </Pressable>
    </View>
  ),
  headerLeft:()=>(<></>)
});

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  // const navigation = useNavigation();
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator  screenOptions={{
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
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options= {()=>({
          headerShown: false
        })}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }:any) => ({
          headerTitle: () => <ChatRoomHeader id={route.params?.id} />,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
}

function DrawerNavigator(){
  return(
    <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />} 
        screenOptions={{
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
        }}
      >
          <Drawer.Screen name="Main" component={MainTabNavigator} options={defaultOptions}/>
      </Drawer.Navigator>
  )
}
