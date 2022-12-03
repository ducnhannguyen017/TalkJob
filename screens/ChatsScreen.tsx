import React, { useEffect, useState } from 'react';

import { Auth, DataStore } from 'aws-amplify';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';
import { ChatRoom, ChatRoomUser } from '../src/models';


export default function ChatsScreen() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  
  useEffect(() => {
    const subscription = DataStore.observe(ChatRoom).subscribe((msg) => {
      console.log("msg", msg)
      if (msg.model === ChatRoom && msg.opType === "INSERT") {
        setChatRooms((chatRoom) => [msg.element, ...chatRoom]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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

  return (
    <View style={styles.page}>
      {chatRooms && chatRooms.length > 0 && (
        <FlatList 
          data={chatRooms}
          renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1
  }
});