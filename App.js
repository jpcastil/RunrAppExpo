import React, {Component} from 'react';
import {AppRegistry,StyleSheet,Text,View,AsyncStorage, Button, TouchableHighlight} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Map from './Map';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'


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
            watchId: null,
            onRunBool: true,
            title: "Start Run",
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
            },
            error: null,
            color: 'blue',
            stopwatchStart: false,
            totalDuration: 90000,
            stopwatchReset: false,
            starttime: 0,
            currentTime:0
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
        if (this.state.stopwatchStart) {
            let x = new Date();
            this.setState({
                currentTime: x - this.state.starttime
            })
        }


        console.log("Latitude" + " " +position.coords.latitude + "  " + "longitude" + " " + position.coords.longitude);
        let y = Date();
        console.log(Math.floor(this.state.currentTime/ 1000));

    }

    geoFailure = (err) => {
        this.setState({error: err.message});
    }

    onRun = () => {

        if (this.state.onRunBool){
            this.toggleStopwatch()
            let tiempo = new Date();
            let options = {
                enableHighAccuracy: true,
                timeOut: 100,
                maximumAge: 60 * 60 * 24,
                distanceFilter: 5
            };
            watchIdd = navigator.geolocation.watchPosition(this.geoSuccess, this.geoFailure, options);
            this.setState({
                watchId : watchIdd,
                onRunBool: false,
                title: "Stop Run",
                color: 'red',
                starttime: tiempo
           });
       }

       else if (! this.state.onRunBool){
           console.log(this.state.starttime);
           this.toggleStopwatch()
           navigator.geolocation.clearWatch(this.state.watchId);
           navigator.geolocation.stopObserving();

           this.setState({
               onRunBool: true,
               title: "Start Run",
               color: 'blue',
          });
       }
     }

     toggleStopwatch() {
         this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
     }

     resetStopwatch = () => {
         this.setState({stopwatchStart: false, stopwatchReset: true});
     }
     getFormattedTime(time) {
         this.currentTime = time;
     };


    render() {
        return (
            <View syyle={styles.overallContainer}>
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        region={this.state.region}
                        showsUserLocation={true}
                        >
                    <MapView.Marker
                        coordinate={{latitude: this.state.region.latitude,
                        longitude: this.state.region.longitude}}
                        title={"Home"}
                        description={"This is a test"}
                        />
                    </MapView>
                </View>
                <View style= {styles.button}>
                    <Button
                        title= {this.state.title}
                        color= {this.state.color}
                        onPress= {this.onRun}
                    ></Button>
                </View>
                <View style= {styles.button}>
                    <Stopwatch laps msecs start={this.state.stopwatchStart}
                        reset= {this.state.stopwatchReset}
                        getTime= {this.getFormattedTime} />
                    <Button
                        title= "Reset"
                        color= "red"
                        onPress= {this.resetStopwatch}
                     ></Button>
                  </View>






            </View>
        );
    }


}

AppRegistry.registerComponent('Runr', () => Runr);
