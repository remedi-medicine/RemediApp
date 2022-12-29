import React from "react";
import { StyleSheet, View, FlatList, Image, Text, TouchableOpacity, ScrollView } from "react-native";import { Dimensions } from 'react-native';

import Constants from "../Constants/Constants";
import CustList from "../DummyData/CustList";
import DrugList from "../DummyData/DrugList";

const {height, width} = Dimensions.get('window');

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showListContent: [],
        }
    }

    componentDidMount = () => {
        length = Object.keys(CustList).length;
        show = [];
        for (let i = 0; i < length; i++) {
            show.push(false);
        }
        this.setState({ showListContent: show });
    }

    renderListName = (item, index) => {
        showList = this.state.showListContent;
        return (
            <>
                <TouchableOpacity style={styles.listName} onPress={() => {showList[index]=!showList[index]; this.setState({showListContent: showList})}}>
                    <Image source={Constants.img.listGreen} style={styles.listImage}/>
                    <Text style={styles.listNameText}>{item}</Text>
                    {!this.state.showListContent[index] ? <Image source={Constants.img.rightArrowTrans} style={styles.listImage}/> : null}
                </TouchableOpacity>
                {this.state.showListContent[index] ? this.openList(item) : null}
            </>
        );
    }

    renderListContent = (item, index) => {
        drug_info = DrugList[item];
        return (
            <View style={styles.contentName}>
                <Image source={{uri: drug_info.image}} style={styles.contentImage}/>
                <Text style={styles.contentNameText} numberOfLines={2}>{drug_info.name}</Text>
            </View>
        );
    }

    openList = (name) => {
        thisList = CustList[name];
        total = 0;
        for(let i=0; i<thisList.length; i++) {
            total += DrugList[thisList[i]].price;
        }
        return (
            <View style={styles.contentView}>
                <View style={{flexDirection: 'row', width: 0.54*width}}>
                    <Image source={Constants.img.listBlue} style={styles.listImage}/>
                    <Text style={styles.listNameText}>List</Text>
                    <TouchableOpacity>
                        <Image source={Constants.img.edit} style={{width: 12.8, height: 16}}/>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={CustList[name]}
                    renderItem={({item, index}) => (this.renderListContent(item, index))}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{alignItems: 'center'}}
                    style={{marginVertical: 20}}
                />
                <TouchableOpacity style={styles.makePayment}>
                    <Text style={styles.makePaymentText}>Pay Now</Text>
                    <Text style={styles.makePaymentText}>₹{total}</Text>
                </TouchableOpacity>
            </View>)
    }

    render() {
        return(
            <>
                <ScrollView style={styles.container}>
                    <Text style={styles.headerText}>Your List</Text>
                    <FlatList
                        data={Object.keys(CustList)}
                        renderItem={({item, index}) => (this.renderListName(item, index))}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => <View style={styles.separator}/>}
                        style={{marginTop: 80}}
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