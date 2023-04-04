import React from "react";
import { StyleSheet, ScrollView, View, Text, StatusBar, Image, TouchableOpacity, FlatList, TextInput } from "react-native";
import { Dimensions } from "react-native";

import Constants from "../Constants/Constants";
import Category from "../DummyData/Category";
import Deal from "../DummyData/Deal";


const { width, height } = Dimensions.get("window");




const MyProducts = () => {
    return (

        <View style={{ flex: 1 }}>


            <View style={{
                width: '100%',
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                paddingLeft: 100,
                elevation: 1,
            }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        color: Constants.colors.primaryGreen,
                        fontFamily: Constants.fonts.bold,
                    }}
                >
                    ADD ADDRESS</Text>
            </View>

            <ScrollView>
                <View>
                    <Text style={{
                        color: 'black',
                        fontSize: 17,
                        fontFamily: Constants.fonts.light,
                        paddingLeft: 40,
                        elevation: 1,
                        marginTop: 20,

                    }}
                    >
                        Bill To</Text>

                    <TextInput style={{
                        color: Constants.colors.primaryGreen,
                        fontSize: 13,
                        fontFamily: Constants.fonts.regular,
                        marginStart: 20,
                        paddingHorizontal: 50,
                        borderRadius: 15,
                        width: '90%',
                        backgroundColor: 'white',
                    }}
                        placeholderTextColor={Constants.colors.translucentBlue}></TextInput>
                </View>
                {/*HOUSE NUM*/}

                <View>
                    <Text style={{
                        color: 'black',
                        fontSize: 17,
                        fontFamily: Constants.fonts.light,
                        paddingLeft: 40,
                        elevation: 1,
                        marginTop: 20,

                    }}
                    >
                        House No. and Building*</Text>

                    <TextInput style={{
                        color: Constants.colors.primaryGreen,
                        fontSize: 13,
                        fontFamily: Constants.fonts.regular,
                        marginStart: 20,
                        paddingHorizontal: 50,
                        borderRadius: 15,
                        width: '90%',
                        backgroundColor: 'white',
                    }}
                        placeholderTextColor={Constants.colors.translucentBlue}></TextInput>
                </View>

                {/*Street NUM*/}
                <View>
                    <Text style={{
                        color: 'black',
                        fontSize: 17,
                        fontFamily: Constants.fonts.light,
                        paddingLeft: 40,
                        elevation: 1,
                        marginTop: 20,

                    }}
                    >
                        Street Name*</Text>

                    <TextInput style={{
                        color: Constants.colors.primaryGreen,
                        fontSize: 13,
                        fontFamily: Constants.fonts.regular,
                        marginStart: 20,
                        paddingHorizontal: 50,
                        borderRadius: 15,
                        width: '90%',
                        backgroundColor: 'white',
                    }}
                        placeholderTextColor={Constants.colors.translucentBlue}></TextInput>
                </View>

                {/*Pincode NUM*/}

                <View>
                    <Text style={{
                        color: 'black',
                        fontSize: 17,
                        fontFamily: Constants.fonts.light,
                        paddingLeft: 40,
                        elevation: 1,
                        marginTop: 20,

                    }}
                    >
                        Pincode*</Text>

                    <TextInput style={{
                        color: Constants.colors.primaryGreen,
                        fontSize: 13,
                        fontFamily: Constants.fonts.regular,
                        marginStart: 20,
                        paddingHorizontal: 50,
                        borderRadius: 15,
                        width: '90%',
                        backgroundColor: 'white',
                    }}
                        placeholderTextColor={Constants.colors.translucentBlue}></TextInput>
                </View>

                {/*Mobile NUM*/}

                <View>
                    <Text style={{
                        color: 'black',
                        fontSize: 17,
                        fontFamily: Constants.fonts.light,
                        paddingLeft: 40,
                        elevation: 1,
                        marginTop: 20,

                    }}
                    >
                        Mobile Number*</Text>

                    <TextInput style={{
                        color: Constants.colors.primaryGreen,
                        fontSize: 13,
                        fontFamily: Constants.fonts.regular,
                        marginStart: 20,
                        paddingHorizontal: 50,
                        borderRadius: 15,
                        width: '90%',
                        backgroundColor: 'white',
                    }}
                        placeholderTextColor={Constants.colors.translucentBlue}></TextInput>
                </View>

                {/*Address Type*/}

                <View>
                    <Text style={{
                        color: 'black',
                        fontSize: 17,
                        fontFamily: Constants.fonts.light,
                        paddingLeft: 40,
                        elevation: 1,
                        marginTop: 20,

                    }}
                    >
                        Address Type</Text>
                   
                </View>


                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5,
                    }}
                >
                    
                    {/* Home */}
                    <TouchableOpacity
                        style={{
                            width: '25%',
                            height: 40,
                            backgroundColor: Constants.colors.primaryGreen,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                            marginLeft: 20,

                        }}
                    >
                        <Text style={{ color: 'white', }}> Home</Text>
                    </TouchableOpacity>

                   

                    {/* Office */}
                    <TouchableOpacity

                        style={{
                            width: '25%',
                            height: 40,
                            backgroundColor: Constants.colors.primaryGreen,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                            marginLeft: 20,

                        }}
                    >
                        <Text style={{ color: 'white', }}> Office</Text>
                    </TouchableOpacity>

                    <TouchableOpacity

                        style={{
                            width: '25%',
                            height: 40,
                            backgroundColor: Constants.colors.primaryGreen,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                            marginLeft: 20,

                        }}
                    >
                        <Text style={{ color: 'white', }}> Other</Text>
                    </TouchableOpacity>
                </View>

                {/*Save and Continue*/}
                <TouchableOpacity
                    style={{
                        width: '90%',
                        height: 40,
                        backgroundColor: Constants.colors.primaryGreen,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        marginLeft: 20,
                        marginTop: 20,
                        marginBottom: 20,
                    }}
                >
                    <Text style={{ color: 'white', }}> Save And Continue</Text>


                </TouchableOpacity>


            </ScrollView>

        </View>




    );
};

export default MyProducts;



