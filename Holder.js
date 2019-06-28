
<View>
    <Text>{this.format(this.state.time)}</Text>
</View>

format = (time) => {
    let minutes = Math.floor(time / 60) % 60
    let seconds = time % 60
    let hours = Math.floor( Math.floor(time / 60) / 60)
    if (seconds < 10){
        seconds = "0"+seconds
    }

    if (minutes < 10){
        minutes = "0"+minutes
    }
    if (hours < 10){
        hours = "0"+hours
    }
    return hours +":"+minutes+":"+seconds
 }

 worked = () => {
     setInterval(() => (

      this.setState(previousState => (
        { time: this.state.time + 1}
            ))
    ), 1000);
  }
