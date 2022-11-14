import React from 'react';
import {Text, View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import Message from '../components/Message';
import chatRoomData from '../assets/dummy-data/Chats';
import MessageInput from '../components/MessageInput';
import { useEffect } from 'react';

export default function ChatRoomScreen() {
  const route:any = useRoute();
  const navigation = useNavigation();

  console.warn("Displaying chat room: ", route.params?.id)

  useEffect(() => {
    navigation.setOptions({title: 'Elon Musk'})
  }, [])
  

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={chatRoomData.messages}
        renderItem={({ item}) => <Message message={item} />}
        inverted
      />
      <MessageInput />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  }
})
