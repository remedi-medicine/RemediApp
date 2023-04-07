import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Text } from "react-native";
import Constants from "../Constants/Constants";
import Header from "../components/Header";

import auth from '@react-native-firebase/auth';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: auth().currentUser,
        };
    }

renderProfileCard() {
    return (
        <View style={styles.cardView}>
            <TouchableOpacity style={{width: 60, height: 60,}}>
                <Image source={Constants.img.profile} style={styles.profileImage}/>
            </TouchableOpacity>
            <View style={{flex: 1, marginLeft: 10, alignItems: 'flex-start',}}>
                <Text style={{color: 'white', fontFamily: Constants.fonts.bold, fontSize: 22}}>
                    Hi, {this.state.user.displayName}
                </Text>
                <Text style={{color: 'white', fontFamily: Constants.fonts.regular, fontSize: 15}}>
                    View Your Profile
                </Text>
            </View>
        </View>
    )
}

ProfileValue = ({ icon, label, onPress }) => {
    return (
        <TouchableOpacity style={{flexDirection: 'row', height: 50, alignItems: 'center'}} onPress={onPress}>
            <View style={styles.iconView}>
                <Image source={icon} resizeMode="contain" style={{width: 16, height: 16,}}/>
            </View>
            <View style={{ flex: 1, marginLeft: 20,}}>
                <Text style={styles.listNameText}>{label}</Text>
            </View>
            <Image source={Constants.img.rightArrowTrans} style={{width: 20, height: 20,}}/>
        </TouchableOpacity>
    )
}

renderProfileSection() {
    return (
        <View style={styles.profileSectionContainer}>
            <this.ProfileValue icon={Constants.img.listGreen} label="My Account"/>
            <View style={styles.separator}/>

            <this.ProfileValue icon={Constants.img.savedForLater} label="Saved for Later"/>
            <View style={styles.separator}/>
            
            <this.ProfileValue icon={Constants.img.myOrders} label="My Orders"/>
            <View style={styles.separator}/>
            
            <this.ProfileValue icon={Constants.img.billing} label="Billing"/>
            <View style={styles.separator}/>
            
            <this.ProfileValue icon={Constants.img.faq} label="FAQs"/>
            <View style={styles.separator}/>
            
            <this.ProfileValue icon={Constants.img.logout} label="Logout"
                onPress={() => {this.state.user.signOut; this.props.navigation.replace('Login');}}
            />
        </View>
    )
}

    render() {
        return(
            <>
              <View style={{flex: 1, backgroundColor: 'white',}}>
                <Header title={"My Profile"} onBack={() => this.props.navigation.goBack()} showSearch={false}/>
                <ScrollView contentContainerStyle={{paddingHorizontal: 20,}}>
                  {this.renderProfileCard()}
                  {this.renderProfileSection()}
                </ScrollView>
              </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    cardView: {
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 20,
        backgroundColor: Constants.colors.primaryGreen,
    },
    profileImage: {
        width: '90%',
        height: '90%',
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'white',
    },
    iconView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
    },
    separator: {
        height: 1,
        backgroundColor: "rgba(9, 28, 63, 0.5)",
        width: 0.8*400,
        alignSelf: "center",
    },
    listNameText: {
        fontSize: 13,
        color: Constants.colors.primaryBlue,
        fontFamily: Constants.fonts.regular,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
        color: Constants.colors.primaryGreen,
        fontFamily: Constants.fonts.bold,
    },
});