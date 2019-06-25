componentDidMount(){
    let geoOptions = {
        enableHighAccuracy: true,
        timeOut: 20000,
        maximumAge: 60 * 60 * 24
    };
    this.setState({ready:false, error: null });
    navigator.geolocation.getCurrentPosition( this.geoSuccess,
                                            this.geoFailure,
                                            geoOptions);
}
geoSuccess = (position) => {
    console.log("Position has been retrieved");

    this.setState({
        ready:true,
        location: {latitude: position.coords.latitude,longitude:position.coords.longitude }
    })
}


constructor(){
super();
this.state = {
    region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
        },
    ready: false,
    location: {latitude:null, longitude:null},
    error: null
}
