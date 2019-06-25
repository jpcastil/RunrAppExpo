import React, {Component} from 'react';
import {AppRegistry,StyleSheet,Text,View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Map from './Map';

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
});

export default class Runr extends Component {
    
    render() {
        return (
            <View style={styles.container}>
            <Map />

            </View>
        );
    }

}

AppRegistry.registerComponent('Runr', () => Runr);
