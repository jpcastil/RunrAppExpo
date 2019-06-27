import React, {Component} from 'react';
import {AppRegistry,StyleSheet,Text,View,AsyncStorage, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Map from './Map';


const styles = StyleSheet.create({
    overallContainer: {
        height: '100%'
    },
    container: {
        height: '75%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button : {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },

});


export default class Runr extends Component {
    constructor(){
        super();
        this.state = {
            onRunBool: true,
            title: "Start Run",
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
            },
            error: null,
            color: 'blue'

        }
    }
    componentDidMount(){
        /*let geoOptions = {
            enableHighAccuracy: true,
            timeOut: 20000,
            maximumAge: 60 * 60 * 24
        };*/
        let options = {
            enableHighAccuracy: false,
            timeOut: 100,
            maximumAge: 60 * 60 * 24,
            distanceFilter: 0
        };
        this.setState({ready:false, error: null });
        navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, options);

        }



    geoSuccess = (position) => {
        this.setState({
            ready:true,
            location: {lattitude: position.coords.latitude,longitude:position.coords.longitude },
            region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
            }
        })
        console.log("Latitude" + " " +position.coords.latitude + "  " + "longitude" + " " + position.coords.longitude);

    }

    geoFailure = (err) => {
        this.setState({error: err.message});
    }

    onRun = () => {
        if (this.state.onRunBool){
            this.setState({
               onRunBool: false,
               title: "Stop Run",
               color: 'red'
           });
       }
       else{
           this.setState({
               onRunBool: true,
               title: "Start Run",
               color: 'blue'
          });

       }


     }

    render() {
        return (
            <View syyle={styles.overallContainer}>
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        region={this.state.region}
                        >
                    <MapView.Marker
                        coordinate={{latitude: this.state.region.latitude,
                        longitude: this.state.region.longitude}}
                        title={"Home"}
                        description={"This is a test"}
                        />
                    </MapView>
                </View>
                <View style={styles.button}>
                    <Button
                        title= {this.state.title}
                        color= {this.state.color}
                        onPress= {this.onRun}
                    ></Button>
                </View>

            </View>
        );
    }


}

AppRegistry.registerComponent('Runr', () => Runr);
