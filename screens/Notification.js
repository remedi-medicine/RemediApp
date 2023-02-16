import React from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";
import Constants from "../Constants/Constants";

let items = [
    {
        id: 0,
        image: 'https://i.ytimg.com/vi/yikWOMtIOiQ/maxresdefault.jpg',
        name: 'Rosustat - 50',
        brand: 'Cipla',
        price: '₹250',
        qty: 1,

    },
    {
        id: 1,
        image: 'https://i.ytimg.com/vi/yikWOMtIOiQ/maxresdefault.jpg',
        name: 'Cyra - 10',
        brand: 'Mankind',
        price: '₹250',
        qty: 0,

    },
    {
        id: 2,
        image: 'https://i.ytimg.com/vi/yikWOMtIOiQ/maxresdefault.jpg',
        name: 'Dolo - 650',
        brand: 'Cipla',
        price: '₹259',
        qty: 1,

    },
    {
        id: 3,
        image: 'https://i.ytimg.com/vi/yikWOMtIOiQ/maxresdefault.jpg',
        name: 'Rota Cap',
        brand: 'Mankind',
        price: 139,
        qty: 0,

    },
    {
        id: 3,
        image: 'https://i.ytimg.com/vi/yikWOMtIOiQ/maxresdefault.jpg',
        name: 'Rota Cap',
        brand: 'Mankind',
        price: 139,
        qty: 0,

    },
]


const getTotal = () => {
    total = 0;
    items.map(cartitem => {
        total = total + cartitem.qty * cartitem.price;
    });
    return total;
};

const MyProducts = () => {
    return (

        <View style={{ flex: 1 }}>

            
            <View style={{
                width: '100%',
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                paddingLeft: 120,
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
                    MY CART</Text>
            </View>

            <FlatList data={items} renderItem={({ item, index }) => {
                return (
                    <ScrollView>
                    <View
                        style={{
                            width: '94%',
                            height: 130,
                            backgroundColor: 'white',
                            alignSelf: 'center',
                            marginTop: 10,
                            borderRadius: 10,
                            elevation: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 10,
                        }}
                    >
                        <Image source={{ uri: item.image }}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 10,
                            }}
                        />
                        <View
                            style={{
                                padding: 10,
                            }}
                        >
                            <Text style={{ fontSize: 17, fontWeight: '600', color: 'black', }}>{item.name.substring(0, 20) + '..'}</Text>
                            <Text style={{ fontSize: 16, fontWeight: '600', }}>{item.brand}</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green', }}>{item.price}</Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 5,
                                }}
                            >
                                {/* <TouchableOpacity
                                style = {{
                                    backgroundColor: 'green',
                                    borderRadius: 10,
                                    height: 27,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    
                                }}
                                >
                                    <Text style = {{color: 'white',}}> Add to Cart</Text>
                                </TouchableOpacity> */}

                                {/* +*/}
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: 'green',
                                        borderRadius: 7,
                                        height: 27,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingLeft: 9,
                                        paddingRight: 10,
                                        marginLeft: 10,

                                    }}
                                >
                                    <Text style={{ color: 'white', }}> +</Text>
                                </TouchableOpacity>

                                <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: '600', }}>{'0'}</Text>

                                {/* - */}
                                <TouchableOpacity
                                
                                    style={{
                                        backgroundColor: 'green',
                                        borderRadius: 7,
                                        height: 27,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingLeft: 9,
                                        paddingRight: 11,
                                        marginLeft: 10,

                                    }}
                                >
                                    
                                    <Text style={{ color: 'white', }}> -</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    </ScrollView>

                );

            }} />

            
            <View
                style={{
                    width: '100%',
                    height: 60,
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    borderRadius: 20,

                }}
            >
                <View
                    style={{
                        width: '50%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: '700', color: 'black' }}> {'Added Items' + '(' + items.length + ')'}</Text>
                    <Text> {'Total:' + getTotal()}</Text>
                </View>


                <View
                    style={{
                        width: '50%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}
                >
                    <TouchableOpacity
                    style = {{
                        width: '70%',
                        height: 30,
                        backgroundColor: Constants.colors.primaryGreen,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 7,
                    }}
                    >
                        <Text style = {{color: 'white',}}> PAY NOW</Text>


                    </TouchableOpacity>

                </View>
            </View>


        </View>

    );
};

export default MyProducts;



