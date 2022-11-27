import React, { useState, useEffect } from 'react';

import { View, StyleSheet, FlatList } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import UserItem from '../components/UserItem';
import { User } from '../src/models';
import { Auth } from 'aws-amplify';

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   DataStore.query(User).then(setUsers);
  // }, [])

  useEffect(() => {
    // query users
    try {
      const fetchUsers = async () => {
        const userData = await Auth.currentAuthenticatedUser();
  
        const fetchedUsers = (await DataStore.query(User)).filter(e=> e.id != userData.attributes.sub);
        setUsers(fetchedUsers);
      };
      fetchUsers();
    } catch (error) {
      
    }
  }, [])

  return (
    <>
      {users.length > 0 &&(
        <View style={styles.page}>
          <FlatList
            data={users}
            renderItem={({ item }) => <UserItem user={item} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1
  }
});