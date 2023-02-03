import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Pressable, Text, Animated, } from "react-native";
//import { withSafeAreaInsets } from "react-native-safe-area-context";
//import Svg, { Path } from "react-native-svg";
import Constants from "../Constants/Constants";

const Header = ({
    containerStyle,
    title,
    titleStyle,
    leftComponent,
    rightComponent
}) => {
    return (
        <View
            style={{
                height: 60,
                flexDirection: 'row',
                ...containerStyle

            }}
        >
            {
                leftComponent
            }
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyConent: 'center',
                }}
            >
                <Text
                style = {{
                    color: 'black',
                            fontWeight: 'bold',
                            fontSize: 15,
                }}
                >
                    {title}
                </Text>
            </View>

        </View>
    )
}


export default Header;