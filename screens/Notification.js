import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Pressable, Text, Animated, } from "react-native";
//import { withSafeAreaInsets } from "react-native-safe-area-context";
//import Svg, { Path } from "react-native-svg";
import Constants from "../Constants/Constants";

{/*import {
    Header
} from "../../components";
*/}

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
                    style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}
                >
                    {title}
                </Text>
            </View>

        </View>
    )
}

{/* My Cart*/ }
const MyCart = ({ navigation }) => {

    function renderHeader() {
        return (
            <Header
                title="MY CART"
                containerStyle={{
                    height: 50,
                    marginHorizontal: 20,
                    marginTop: 20,
                }}

                leftComponent={
                    <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    >                   
                        <Image
                        source={Constants.img.rightArrowTrans}
                        style={{
                            width: 20,
                            height: 20,
                            tinColor: 'lightgray',

                        }}
                        //resizeMode="contain"
                        containerstyle={{
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderRadius: 20,
                            bordorColor: 'lightgray',
                        }}
                        
                    />
                    </TouchableOpacity>
                }
            //rightComponent

            />
        )

    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white',
            }}
        >
            {/*Header*/}
            {renderHeader()}

            {/*Cart List*/}

            {/*Footer*/}

        </View>
    )
}

export default MyCart;