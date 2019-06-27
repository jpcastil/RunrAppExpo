import React, {Component} from 'react';
import {AppRegistry,StyleSheet,Text,View,AsyncStorage, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Map from './Map';
import RunButton from './RunButton';

const styles = StyleSheet.create({
    overallContainer: {
        height: '100%'
    },
    container: {
        height: '50%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button : {
        alignItems: 'center',
        justifyContent: 'flex-end',
    }

});

export default class Runr extends Component {

    render() {
        return (
            <View syyle={styles.overallContainer}>
                <View style={styles.container}>
                    <Map />
                </View>
                <View style={styles.button}>

                </View>

            </View>
        );
    }

}

AppRegistry.registerComponent('Runr', () => Runr);
