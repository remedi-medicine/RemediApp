import React from "react";
import { StyleSheet, View, FlatList, Image, Text, TouchableOpacity, ScrollView } from "react-native";import { Dimensions } from 'react-native';

import Constants from "../Constants/Constants";
import CustList from "../DummyData/CustList";
import DrugList from "../DummyData/DrugList";

const {height, width} = Dimensions.get('window');

export default class List extends React.Component {
    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            showListContent: [],
        }
    }

    //This function is called when this screen is rendered for the absolute first time
    componentDidMount = () => {
        length = Object.keys(CustList).length;
        show = [];
        for (let i = 0; i < length; i++) {
            show.push(false);
        }
        this.setState({ showListContent: show });
    }

    //This function display the list name
    //This function is called by FlatList
    renderListName = (item, index) => {
        showList = this.state.showListContent;
        return (
            <> {/*This is a React Fragment - it is used to return multiple elements from a function*/}
                <TouchableOpacity style={styles.listName} onPress={() => {showList[index]=!showList[index]; this.setState({showListContent: showList})}}> 
                    <Image source={Constants.img.listGreen} style={styles.listImage}/> {/*This displays the green list icon*/}
                    <Text style={styles.listNameText}>{item}</Text> {/*This displays the name of the list*/}
                    {!this.state.showListContent[index] ? <Image source={Constants.img.rightArrowTrans} style={styles.listImage}/> : null} {/*This displays the right arrow icon if the list collapsed & hides it when list is expanded*/}
                </TouchableOpacity>
                {this.state.showListContent[index] ? this.openList(item) : null} {/*This displays the list content if the list is expanded*/}
            </>
        );
    }

    //This function displays the list content
    //This function is called by FlatList
    renderListContent = (item, index) => {
        drug_info = DrugList[item];
        return (
            <View style={styles.contentName}>
                <Image source={{uri: drug_info.image}} style={styles.contentImage}/> {/*This displays the image of the drug*/}
                <Text style={styles.contentNameText} numberOfLines={2}>{drug_info.name}</Text> {/*This displays the name of the drug*/}
            </View>
        );
    }

    //This function displays the list content
    openList = (name) => {
        thisList = CustList[name]; //This is the list of drugs in the list
        total = 0; //This is the total price of the list
        for(let i=0; i<thisList.length; i++) {
            total += DrugList[thisList[i]].price; //Calculating the total price of all drugs in the list
        }
        return (
            <View style={styles.contentView}>
                <View style={{flexDirection: 'row', width: 0.54*width}}>
                    <Image source={Constants.img.listBlue} style={styles.listImage}/> {/*This displays the blue list icon*/}
                    <Text style={styles.listNameText}>List</Text>
                    <TouchableOpacity>
                        <Image source={Constants.img.edit} style={{width: 12.8, height: 16}}/> {/*This displays the edit icon*/}
                    </TouchableOpacity>
                </View>
                {/*This is the FlatList which is used to display the list of drugs in the list */}
                <FlatList
                    data={CustList[name]} //This is the data that is to be displayed in the FlatList
                    renderItem={({item, index}) => (this.renderListContent(item, index))} //This is the function that is called to render each item in the FlatList
                    keyExtractor={(item, index) => index.toString()} //This is the key that is used to uniquely identify each item in the FlatList
                    contentContainerStyle={{alignItems: 'center'}}
                    style={{marginVertical: 20}}
                />
                {/*This is the button that is used to make the payment for the list*/}
                <TouchableOpacity style={styles.makePayment}>
                    <Text style={styles.makePaymentText}>Pay Now</Text> 
                    <Text style={styles.makePaymentText}>₹{total}</Text> {/*This displays the total price of the list*/}
                </TouchableOpacity>
            </View>)
    }

    //This is the main render function
    //It contains all the elements that are to be rendered on the screen
    render() {
        return(
            <>
                <ScrollView style={styles.container}> {/*This is the main container of the screen - made Scrollable for user experience*/}
                    <Text style={styles.headerText}>Your List</Text>
                    {/*This is the FlatList which is used to display the list of names of the lists created by the user */}
                    <FlatList
                        data={Object.keys(CustList)} //This is the data that is to be displayed in the FlatList
                        renderItem={({item, index}) => (this.renderListName(item, index))} //This is the function that is called to render each item in the FlatList
                        keyExtractor={(item, index) => index.toString()} //This is the key that is used to uniquely identify each item in the FlatList
                        ItemSeparatorComponent={() => <View style={styles.separator}/>} //This is the component that is used to separate each item in the FlatList
                        style={{marginTop: 80}} //This is the style of the FlatList
                        contentContainerStyle={{alignItems: 'center'}}
                    />
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        alignContent: 'center',
    },
    headerText: {
        fontSize: 20,
        color: Constants.colors.primaryGreen,
        fontFamily: Constants.fonts.bold,
        marginStart: 20,
        marginTop: 15,
    },
    separator: {
        height: 1,
        backgroundColor: "rgba(9, 28, 63, 0.5)",
        width: 0.8*width,
        alignSelf: "center",
    },
    listName: {
        height: 50,
        width: '80%',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    listImage: {
        height: 16,
        width: 16,
        // flex: 1
    },
    listNameText: {
        fontSize: 13,
        color: Constants.colors.primaryBlue,
        fontFamily: Constants.fonts.regular,
        marginStart: 10,
        flex: 5
    },
    contentView: {
        width: 0.66*width,
        minHeight: 315,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
    },
    contentName: {
        height: 40,
        width: 0.8*0.66*width,
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    contentImage: {
        height: 22,
        width: 22,
    },
    contentNameText: {
        fontSize: 14,
        color: Constants.colors.primaryBlue,
        fontFamily: Constants.fonts.semibold,
        marginStart: 10,
    },
    makePayment: {
        height: 50,
        width: 0.46*width,
        backgroundColor: Constants.colors.primaryGreen,
        borderRadius: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    makePaymentText: {
        fontSize: 16,
        color: 'white',
        fontFamily: Constants.fonts.bold,
    },
});