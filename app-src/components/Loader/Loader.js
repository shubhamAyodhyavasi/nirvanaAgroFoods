import React from 'react'
import { Image,Dimensions ,View} from 'react-native'
import {images } from '../../styles'
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = {
  loaderContainer:{
        display:"flex",
        width:screenWidth,
        flex:1,
        alignItems: "center"
      },
      loader:{
        width:screenWidth-(screenWidth/2),
      }
}

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <Image source={images.loader} style={styles.loader}/>
    </View>
    
  )
}



export default Loader
