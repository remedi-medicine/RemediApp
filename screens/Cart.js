import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Pressable, Text, Animated } from "react-native";
import { withSafeAreaInsets } from "react-native-safe-area-context";
//import Svg, { Path } from "react-native-svg";
import Constants from "../Constants/Constants";

// Button implementation
// const Button = ({ text, onPress, disabled }) => {
//   return (
//     <Pressable onPress={onPress}
//       style={[styles.productContainer, disabled ? styles.disabledContainer : {}]}
//       disabled={disabled}
//     >
//       <Text style={styles.producttext}>{text}</Text>
//     </Pressable>
//   )
// };
// Button.defaultProps = {
//   onPress: () => { },
//   disabled: false,
// }
// const onButtonPress = () => {
//   console.warn("Pressed");
// }

// // Button.propTypes = {
// //   text: PropTypes.string.isRequired,
// //   onPress: PropTYpes.func,
// //   disabled: false,
// }

const TextButton = ({
    buttonContainerStyle,
    label,
    labelStyle,
    label2 = "",
    label2Style,
    onPress
}) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Constants.colors.primaryGreen,
                ...buttonContainerStyle
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 15,
                    ...labelStyle
                }}
            >
                {label}
            </Text>

            {label2 != "" &&
                <Text
                    style={{
                        flex: 1,
                        textAlign: 'right',
                        color: 'white',
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 15,
                        ...label2Style

                    }}
                >
                    {label2}
                </Text>
            }

        </TouchableOpacity>
    )

}

// DropDown pdt Info
let summary = [{ id: 1, name: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hjjjjjjjjjj bbbbbbbbbb' }]

const DropDown = ({
    data = [],
    value = {},
    onSelect = () => { }
}) => {
    // const[data, setData] = useState([])
    const [showOption, setShowOption] = useState(false)

    return (
        <View style={styles.pdtContainer}>
            <TouchableOpacity
                style={styles.dropDown}
                activeOpacity={0.8}
                onPress={() => setShowOption(!showOption)}
            >
                <Text style={
                    {
                        color: 'black',
                        fontWeight: 'bold',
                        //fontSize: 10,
                    }
                }>PRODUCT INFORMATION</Text>
            </TouchableOpacity>
            {showOption && (<View>
                {data.map((val, i) => {
                    return (
                        <Text key={String(i)}
                            style={{
                                backgroundColor: 'white',
                                marginVertical: 0,
                                padding: 10,
                                paddingStart: 20,
                                borderRadius: 10,
                                borderWidth: 3,
                                borderColor: 'lightgray',
                                //fontWeight: 'bold',
                                alignSelf: 'stretch',
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}>{val.name}</Text>
                    )
                })}
            </View>)}

        </View>
    )
}


//customer review
const Star = () => {
    return (
        // <Svg width={24} height={22} viewBox="0 0 33 30" fill="none" {...props}>
        //   <Path
        //     d="M16.5 0l4.849 9.826 10.843 1.575-7.846 7.648 1.852 10.8-9.698-5.1-9.698 5.1 1.852-10.8-7.846-7.648L11.65 9.826 16.5 0z"
        //     fill="#FFCC48"
        //   />
        // </Svg>
        <Image
            style={{ width: 24, height: 22, padding: 10 }}
            source={{ uri: 'https://i.ibb.co/QHFccKB/Star-6.png' }}
        />
    );
};

const PercentageBar = ({ starText, percentage }) => {

    const [animation] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(animation, {
            toValue: percentage,
            duration: 500,
        }).start();
    }, [percentage]);

    return (
        <View
            style={{
                flexDirection: "row",
            }}
        >
            <Text style={styles.progressText}>{starText}</Text>
            <View style={styles.progressMiddle}>
                <View style={styles.progressWrap}>
                    <Animated.View
                        style={[
                            styles.progressBar,
                            {
                                width: animation.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: ["0%", "100%"],
                                }),
                            },
                        ]}
                    />
                </View>
            </View>
            <Text style={styles.progressPercentText}>{percentage}%</Text>
        </View>
    );
};


const App = ({navigation}) => {

    const [selectedItem, setSelectedItem] = useState(null)
    const onSelect = (item) => {
        setSelectedItem(item)
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.text}>Cart</Text>
                <Image
                    style={styles.imagemed}
                    source={{ uri: 'https://i.ytimg.com/vi/yikWOMtIOiQ/maxresdefault.jpg' }}
                />

                <View style={styles.medContainer}>
                    <Text style={styles.medname}> Dolo-650</Text>
                    <Text style={styles.compyname}>By Micro Labs Ltd </Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.medprice}>₹ 36  MRP Rs 73  23% Off </Text>
                    <Text style={styles.meddetails1}>15 Tablets</Text>
                    <Text style={styles.meddetails2}>        (Inclusive Of All Taxes)</Text>
                    <Text style={styles.meddetails2}>    </Text>

                    {/*Text button*/}
                    <TextButton
                        buttonContainerStyle={{
                            flex: 1,
                            flexDirection: 'row',
                            height: 60,
                            marginLeft: 35,
                            marginRight: 35,
                            paddingHorizontal: 20,
                            borderRadius: 20,
                            backgroundColor: Constants.colors.primaryGreen,
                            borderWidth: 3,
                            borderBottomWidth: 4,
                            borderColor: 'darkgreen',
                            marginVertical: 0,
                            marginBottom: 20,

                        }}
                        label="BUY NOW"
                        label2="₹36"
                        onPress={() => navigation.navigate("MyCart")}
                    />
                </View>

                <View style={styles.deliveryContainer}>
                    <Text style={styles.deliverytime}> Earliest Delivery by Today 7pm</Text>
                    <Text style={styles.deliverydetail}>Delivery To: 4000008, Mumbai </Text>
                </View>

                <View style={styles.safetyContainer}>
                    <Image
                        style={styles.safety}
                        source={{ uri: 'https://i.ibb.co/chtnLBV/remidi-1.png' }}
                    />
                </View>
                {/* <Button text="PRODUCT INFORMATION" onPress ={onButtonPress} disabled={false}/>
                    <DropDown/> */}
                <DropDown
                    value={selectedItem}
                    data={summary}
                    onSelect={onSelect}
                />

                <View style={styles.customerreviewcontainer}>
                    <View style={styles.reviewContainer}>
                        <Text style={styles.reviewTitle}>Customer Reviews</Text>
                        <View style={styles.totalWrap}>
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                            </View>
                            <Text>4.7 out of 5</Text>
                        </View>
                        <Text style={styles.amountText}>40 customer ratings</Text>
                        <View style={{ marginTop: 40 }}>
                            <View style={styles.spacer}>
                                <PercentageBar starText="5 star" percentage={68} />
                            </View>
                            <View style={styles.spacer}>
                                <PercentageBar starText="4 star" percentage={25} />
                            </View>
                            <View style={styles.spacer}>
                                <PercentageBar starText="3 star" percentage={4} />
                            </View>
                            <View style={styles.spacer}>
                                <PercentageBar starText="2 star" percentage={2} />
                            </View>
                            <View style={styles.spacer}>
                                <PercentageBar starText="1 star" percentage={1} />
                            </View>
                        </View>

                        <TouchableOpacity>
                            <Text style={styles.howWeCalculate}>How do we calculate ratings?</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>


        </ScrollView>

    );
};
export default App;

// initial code 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',

    },
    text: {
        fontSize: 20,
        color: Constants.colors.primaryGreen,
        fontFamily: Constants.fonts.bold,
    },
    imagemed: {
        //flex: 1,
        height: 200,
        width: '100%',
        borderWidth: 3,
        borderBottomWidth: 4,
        borderColor: 'lightgray',
        borderRadius: 13,
        //alignItems: 'center',
    },

    medContainer: {

        backgroundColor: 'lightgray',
        //padding: 20
        topMargin: 50,
        borderWidth: 3,
        borderBottomWidth: 4,
        borderColor: 'lightgray',
    },
    medname: {
        //leftMargin: 40,
        marginBottom: 0,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
        paddingStart: 15,
        paddingBottom: 0,
    },
    compyname: {
        //marginTop:0,
        color: 'gray',
        fontWeight: 'normal',
        fontSize: 13,
        paddingStart: 25,
        //paddingTop: 0,
        lineHeight: 13,
    },
    detailsContainer: {
        backgroundColor: 'white',
        //borderWidth: 2,
        borderRadius: 20,
        marginTop: 20,
        borderWidth: 3,
        borderBottomWidth: 4,
        borderColor: 'lightgray',
    },
    medprice: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        paddingStart: 30,
        paddingUp: 100,
        paddingTop: 10,
    },

    meddetails1: {

        color: 'black',
        fontWeight: '800',
        //marginVertical: 20,
        fontSize: 14,
        paddingStart: 30,
    },
    meddetails1: {

        color: 'black',
        fontWeight: '800',
        // marginTop: 10,
        fontSize: 14,
        paddingStart: 30,
    },


    deliveryContainer: {
        backgroundColor: 'white',
        //borderWidth: 3,
        borderRadius: 13,
        marginTop: 10,
        height: 70,
        borderWidth: 3,
        borderBottomWidth: 4,
        borderColor: 'lightgray',
    },
    deliverytime: {

        color: 'black',
        fontWeight: 'bold',
        marginVertical: 8,
        fontSize: 14,
        paddingStart: 30,
    },
    deliverydetail: {

        color: 'black',
        fontWeight: '400',
        fontSize: 11,
        paddingStart: 35,
    },


    safetyContainer: {
        backgroundColor: 'lightgray',
        //borderWidth: 2,
        // borderRadius: 18,
        marginTop: 10,
        height: 100,
        width: '100%',

    },
    safety: {
        flex: 1,
        // width: '100%',
        // height: 200,
        resizeMode: 'contain',
        borderWidth: 3,
        borderBottomWidth: 4,
        borderColor: 'lightgray',
        borderRadius: 20,

    },

    pdtContainer: {
        // backgroundColor: 'white',
        //   height: 50,
        // marginVertical: 10,
        // paddingStart: 30,
        // alignSelf: 'stretch',
        // justifyContent: 'center',
        // alignItems: 'center',

        // border
        // borderRadius: 15,
        // borderBottomWidth: 4,
        // borderColor: 'gray',

    },

    dropDown: {
        backgroundColor: 'white',
        height: 50,
        marginTop: 10,
        paddingStart: 30,
        padding: 10,
        //alignSelf: 'stretch',
        justifyContent: 'center',
        // alignItems: 'center',
        width: '100%',
        borderWidth: 3,

        //border
        borderRadius: 15,
        borderColor: 'lightgray',

    },

    // customerContainer: {
    //   backgroundColor: 'white',
    //   height: 500,
    //   marginVertical: 10,
    //   paddingStart: 23,
    //   paddingVertical: 10,
    //   //alignSelf: 'stretch',
    //   //justifyContent: 'center',

    //   // border
    //   borderRadius: 15,
    //   //borderBottomWidth: 4,
    //   //borderColor: 'gray',

    // },

    // customerreview: {
    //   color: 'black',
    //   fontWeight: 'bold',
    //   fontSize: 16,
    //   paddingStart: 10,

    // },

    customerreviewcontainer: {
        flex: 1,
        backgroundColor: "lightgray",
        alignItems: "center",
        justifyContent: "center",
    },

    reviewContainer: {
        backgroundColor: "#FFFFFF",
        marginTop: 10,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        //paddingStart: 35,
        minWidth: "98%",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1.0,
        shadowRadius: 2,
        shadowColor: "rgba(193, 211, 251, 0.5)",
        elevation: 5,

        // height: 100,
        // marginTop: 10,
        // paddingStart: 30,
        // padding: 10,
        // //alignSelf: 'stretch',
        // justifyContent: 'center',
        // // alignItems: 'center',
        // width: '100%',
        // borderWidth: 3,

        // //border
        // borderRadius: 15,
        // borderColor: 'lightgray',
    },
    reviewTitle: {
        paddingStart: 0,
        fontWeight: "bold",
        fontSize: 20,
        color: "#323357",
        //textAlign: "center",
    },
    totalWrap: {
        marginTop: 20,
        marginBottom: 5,
        backgroundColor: "#F5F8FF",
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    amountText: {
        fontSize: 16,
        color: "#595B71",
        textAlign: "center",
    },

    progressText: {
        width: 50,
        fontSize: 14,
        color: 'darkgreen',//"#2A5BDA"
    },
    progressPercentText: { width: 40, fontSize: 14, color: "#323357" },
    progressMiddle: {
        height: 15,
        flex: 1,
        marginHorizontal: 10,
    },
    progressWrap: {
        backgroundColor: "#F5F8FF",
        borderRadius: 18,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        padding: 2,
    },
    progressBar: {
        flex: 1,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "#ffcc48",
        shadowOpacity: 1.0,
        shadowRadius: 4,
        backgroundColor: "#FFCC48",
        borderRadius: 18,
        minWidth: 5,
    },

    howWeCalculate: {
        fontSize: 15,
        color: 'darkgreen',//"#2A5BDA",
        textAlign: "center",
    }
    // productContainer: {

    //   backgroundColor: 'white',
    //   //height: 50,
    //   marginVertical: 10,
    //   // paddingStart: 30,
    //   // alignSelf: 'stretch',
    //   // justifyContent: 'center',
    //   //alignItems: 'center',

    //   // border
    //   // borderRadius: 15,
    //   // borderBottomWidth: 4,
    //   // borderColor: 'gray',

    // },
    // producttext: {

    //   color: 'black',
    //   fontWeight: 'bold',
    //   fontSize: 16,
    //   paddingStart: 10,
    //   //textDecorationLine: 'underline',
    //   // borderColor: 'black',
    //   // borderBottomWidth: 1,
    // },

    // disabledContainer: {
    //   backgroundColor: 'green',
    //   borderColor: 'lightgreen',
    // },
});
