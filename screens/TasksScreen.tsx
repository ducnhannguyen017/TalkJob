import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import Accordion from '../components/Accordion';

const TasksScreen = () => {
  return (
    <View style={styles.page}>
      <Accordion/>
    </View>
  )
}


const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default TasksScreen