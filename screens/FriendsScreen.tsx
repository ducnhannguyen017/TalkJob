import React, { useState, useEffect } from "react";

import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Pressable,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import UserItem from "../components/UserItem";
import { ChatRoom, ChatRoomUser, User } from "../src/models";
import { Auth, input } from "aws-amplify";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function FriendsScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [showUsers, setShowUsers] = useState<User[]>([]);
  const [selectMemberMode, setSelectMemberMode] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [groupName, setGroupName] = useState(null)
  const navigation = useNavigation<any>();

  useEffect(() => {
    setSelectedUsers([]);
    setGroupName("");
    setSelectMemberMode(false);
  },[])
  
  useEffect(() => {
    // query users
    try {
      const fetchUsers = async () => {
        const userData = await Auth.currentAuthenticatedUser();

        const fetchedUsers = (await DataStore.query(User)).filter(
          (e) => e.id != userData.attributes.sub
        );
        setUsers(fetchedUsers);
        setShowUsers(fetchedUsers);
      };
      fetchUsers();
    } catch (error) {}
  }, []);

  const handleNewGroupMode = () => {
    setSelectMemberMode(!selectMemberMode);
  };

  const handleCancelNewGroup = () => {
    setSelectedUsers([]);
    setGroupName("");
    setSelectMemberMode(!selectMemberMode);
  };

  const deleteUsers = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id != userId));
  };

  const onInputSearchChange = (inputSearch) => {
    setInputSearch(inputSearch);
    setShowUsers(
      users.filter((user) =>
        user.name.toLocaleLowerCase().includes(inputSearch.toLocaleLowerCase())
      )
    );
  };

  const addUserToChatRoom = async (user, chatRoom) => {
    DataStore.save(new ChatRoomUser({ user, chatRoom }));
  };

  const handleCreateNewGroup = async ()=>{
    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    if (!dbUser) {
      Alert.alert("There was an error creating the group");
      return;
    }
    // Create a chat room
    const newChatRoomData:any = {
      newMessages: 0,
      Admin: dbUser,
    };
    if (selectedUsers.length > 1) {
      newChatRoomData.name = groupName;
      newChatRoomData.imageUri =
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/group.jpeg";
    }
    const newChatRoom = await DataStore.save(new ChatRoom(newChatRoomData));

    if (dbUser) {
      await addUserToChatRoom(dbUser, newChatRoom);
    }

    // connect users user with the chat room
    await Promise.all(
      selectedUsers.map((user) => addUserToChatRoom(user, newChatRoom))
    );

    navigation.navigate("ChatRoom", { id: newChatRoom.id });
  }

  return (
    <>
      {users.length > 0 && (
        <View style={styles.page}>
          {selectMemberMode && (
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                alignContent: "center",
                justifyContent: "space-between",
              }}
            >
              <Pressable onPress={() => handleCancelNewGroup()}>
                <View style={styles.image}>
                  <AntDesign
                    name="close"
                    size={24}
                    color={Colors.light.background}
                  />
                </View>
              </Pressable>
              <TextInput
                style={[styles.input, {width:"50%"}]}
                onChangeText={setGroupName}
                value={groupName}
                placeholder="Group Name"
              />
              <Pressable onPress={() => handleCreateNewGroup()}>
                <View style={styles.image}>
                  <Feather
                    name="arrow-right"
                    size={24}
                    color={Colors.light.background}
                  />
                </View>
              </Pressable>
            </View>
          )}
          {!selectMemberMode && (
            <Pressable
              style={styles.container2}
              onPress={() => handleNewGroupMode()}
            >
              <View style={styles.image}>
                <MaterialIcons
                  name="group"
                  size={24}
                  color={Colors.light.background}
                />
              </View>
              <View style={styles.rightContainer}>
                <View style={styles.row}>
                  <Text style={styles.name}>New Group </Text>
                </View>
              </View>
            </Pressable>
          )}
          {selectMemberMode && (
            <TextInput
              style={styles.input}
              onChangeText={(text) => onInputSearchChange(text)}
              value={inputSearch}
              placeholder="Search"
            />
          )}

          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <FlatList
            horizontal
              data={selectedUsers}
              renderItem={({ item, index }) => (
                <View key={item.id+index} style={{ marginLeft: 5, marginRight: 5 }}>
                  <Image source={{ uri: item.imageUri }} style={styles.image} />
                  <Pressable
                    onPress={() => deleteUsers(item.id)}
                    style={styles.closeIcon}
                  >
                    <AntDesign name="close" size={18} color="white" />
                  </Pressable>
                </View>
              )}
              showsVerticalScrollIndicator={true}
            ></FlatList>
          </View>
          {/* <View style={styles.container2}>
            <View  style={styles.image}>
              <AntDesign name="addusergroup" size={24} color={Colors.light.background} />
            </View>
            <View style={styles.rightContainer}>
              <View style={styles.row}>
                <Text  style={styles.name}>New Contact</Text>
              </View>
            </View>
          </View> */}
          <Text style={styles.text}>Contacts on TalkJob</Text>
          <FlatList
            data={showUsers}
            renderItem={({ item }) => (
              <UserItem
                newGroupMode={selectMemberMode}
                setSelectedUsers={setSelectedUsers}
                selectedUser={selectedUsers}
                user={item}
                showUsers={showUsers}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 3,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: Colors.light.tint,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "gray",
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 5,
  },
  container: {
    flexDirection: "row",
    padding: 10,
  },
  container2: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 14,
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
