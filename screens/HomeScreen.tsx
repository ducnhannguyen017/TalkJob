import React, { useState, useEffect } from 'react';

import { Text, Image, Pressable, View, StyleSheet, FlatList } from 'react-native';
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoom, ChatRoomUser } from '../src/models';
import ChatRoomItem from '../components/ChatRoomItem';


export default function HomeScreen() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const userData = await Auth.currentAuthenticatedUser();
  
        const chatRooms = (await DataStore.query(ChatRoomUser))
          .filter(chatRoomUser => chatRoomUser.user.id === userData.attributes.sub)
          .map(chatRoomUser => chatRoomUser.chatRoom);
        console.log("chatRooms", chatRooms)
        setChatRooms(chatRooms);
      } catch (error) {
        
      }
    };
    fetchChatRooms();
  }, []);

  const logOut = () => {
    Auth.signOut();
  }

  return (
    <View style={styles.page}>
      {chatRooms && chatRooms.length > 0 && (
        <FlatList 
          data={chatRooms}
          renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
      {/* <Pressable onPress={logOut} style={{backgroundColor: 'red', height: 50, margin: 10, borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Logout</Text>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1
  }
});