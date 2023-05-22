
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,FlatList,TouchableOpacity} from 'react-native';
import { Ionicons,MaterialIcons,Entypo,FontAwesome5 } from '@expo/vector-icons';


const IndexScreen = ({navigation}) => {
  


  return (
    <View  style={styles.container}>
        <Text>Principal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

  },

  content:{
    width:'100%',
    height:100,
  },
  list:{
    height:'100%',
    justifyContent:'space-between',
    alignItems:'center',
    flex: 1,
    flexDirection: 'row'

  },
  line:{
    width:'100%',
    height:2,
    backgroundColor:'grey'
  },
  text:{
    fontSize:25,
    fontWeight: '600'
  }
});

export default IndexScreen;