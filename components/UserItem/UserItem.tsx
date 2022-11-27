import React from 'react';
import { Text, Image, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoom, User, ChatRoomUser } from '../../src/models';

export default function UserItem({ user }) {
  const navigation = useNavigation<any>();

  const onPress = async () => {

    // TODO if there is already a chat room between these 2 users
    // then redirect to the existing chat room
    // otherwise, create a new chatroom with these users.
    const authUser = await Auth.currentAuthenticatedUser();

    const existRoom = (await DataStore.query(ChatRoomUser)).filter(chatRoom => chatRoom.user.id == authUser.attributes.sub || chatRoom.user.id == user.id);
    console.log("existRoom", existRoom)
    if(existRoom.length == 2){
      navigation.navigate('ChatRoom', { id: existRoom[0].chatRoom.id });
      return ;
    }
    // Create a chat room
    const newChatRoom = await DataStore.save(new ChatRoom({newMessages: 0}));
    
    // connect authenticated user with the chat room
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    await DataStore.save(new ChatRoomUser({
      user: dbUser,
      chatRoom: newChatRoom
    }))

    // connect clicked user with the chat room
    await DataStore.save(new ChatRoomUser({
      user,
      chatRoom: newChatRoom
    }));

    navigation.navigate('ChatRoom', { id: newChatRoom.id });
  }

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: user.imageUri}} style={styles.image} />

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>
    </Pressable>
  );
}
