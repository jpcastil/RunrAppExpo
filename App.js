import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class Runr extends Component{

  render(){
    return(
      <View>
        <Text> hello world </Text>
      </View>
    );
  }

}

AppRegistry.registerComponent('Runr', () => Runr);
