import React , {useState} from 'react';
import { StyleSheet, Text, View ,TextInput} from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
const InputMask = (props) => {
  const {label,errorMessage,isMask,...rest}=props
  const [inputValues, setInputValues]=useState('')
  return (
        <View style={styles.formField}>
          <Text style={styles.label}>{label}</Text>
          <TextInputMask
              type={'custom'}
              options={{
                mask: '9999999999',
                
              }}

              style={styles.textField}
               value={inputValues}
              onChangeText={(e)=>{
                setInputValues(e)
              }}
              {...rest}
           />
        {errorMessage && <Text style={styles.error} >{errorMessage}</Text>}
    </View>
  )
}
const styles = StyleSheet.create({
    
    textField:{
      height: 40,
      borderStyle:"solid",
      borderWidth:1,
      padding:10
    },
    error:{
        color:"red"
    },
    label:{
      marginBottom:5
    }

  });
  export default InputMask