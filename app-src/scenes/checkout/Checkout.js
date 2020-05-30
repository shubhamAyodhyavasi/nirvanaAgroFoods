import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import AnimatedMultistep from "./lib";
import Address from "./Address"
import Payment from "./Payment"
import { colors } from "../../styles";

const allSteps = [
  { name: "Address", component: Address },
  { name: "Payment Option", component: Payment },
];

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  onNext = () => {
    //console.log("Next");
  };
  onBack = () => {
   // console.log("Back");
  };

  finish = state => {
    alert("TCL: App -> state", state)
  };
  

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.yellow }}>
       
        <View style={styles.lowerContainer}>
          <AnimatedMultistep
            steps={allSteps}
            onFinish={this.finish}
            animate={true}
            onBack={this.onBack}
            onNext={this.onNext}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  upperContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  loginText: {
    fontSize: 32,
    color: "#fff"
  },
  lowerContainer: {
    flex: 2
  }
});