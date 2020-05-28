import React from 'react';
import { StyleSheet, Text, View ,TextInput} from 'react-native';
//import {veriantColor} from "../../../Services/veriant"
const TextField = (props) => {
  const {label,errorMessage,hasError,...rest}=props
  const fieldCss= hasError ? styles.errroField : styles.textField
  return (
        <View style={styles.formField}>
        <Text style={styles.label}>{label}</Text>
            <TextInput
               style={fieldCss}
               {...rest}
        />
        {hasError && <Text style={styles.error} >{errorMessage}</Text>}
    </View>
  )
}
const styles = StyleSheet.create({
    
    textField:{
      height: 40,
      borderStyle:"solid",
      borderWidth:1,
      padding:10,
      marginBottom:10
    },
    errroField:{
      height: 40,
      borderStyle:"solid",
      borderWidth:1,
      padding:10,
      borderColor:"red"
    },
    error:{
        color:"red"
    },
    label:{
      marginBottom:5
    }

  });
  export default TextField