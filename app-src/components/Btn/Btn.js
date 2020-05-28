import React from 'react';
import { View ,Button} from 'react-native';
import {veriantColor} from "../../../Services/veriant"
export default function Btn(props) {
  const {title,veriant='info' , onPressButton}=props
    
  return (
    <View >
              <Button
                onPress={onPressButton}
                title={title}
                color={veriantColor(veriant)}
        />
    </View>
  );
}

