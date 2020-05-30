
import React, { Component } from "react";
import { Image, View, TouchableOpacity, Modal } from "react-native";
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from "./styles";
import { colors, images } from '../../styles'
import { getUserAddress } from '../../modules/service';
import { getStateList, getCityList } from "./lib/constant"
import { Container, Content, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base'
import Button from '../../components/Button';
import GetLocation from 'react-native-get-location'
const AddAddressForm = () =>{
    return (
       <View>
           <Text>Form</Text>
       </View>
    )
}   
export default AddAddressForm;