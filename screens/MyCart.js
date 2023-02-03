import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Pressable, Text, Animated, } from "react-native";
import { withSafeAreaInsets } from "react-native-safe-area-context";
//import Svg, { Path } from "react-native-svg";
import Constants from "../Constants/Constants";


const MyCart = ({navigation}) =>{
    return(
        <View
        style = {{
            flex:1,
        }}
        >
            <Text> MyCart</Text>

        </View>
    )
}

export default MyCart;