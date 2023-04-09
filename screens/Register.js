import React from "react";
import { StyleSheet, View, Text, Image, Dimensions, TextInput, ScrollView, Pressable, Modal } from "react-native";

import auth from '@react-native-firebase/auth';

import * as Progress from "react-native-progress";

import Constants from "../Constants/Constants";
import {displayName as appName, subtitle as subName} from "../app.json";

const {width, height} = Dimensions.get('window');

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            showBlank: false,
            showProgress: false,
        }
    }
    
    componentDidMount = () => {
        setTimeout(() => {this.setState({showProgress: false})}, 30000);
        // setTimeout(() => {this.props.navigation.replace("Register")}, 1500);
    }

    registerUser = () => {
        console.log("Registering user: ", this.state.name, this.state.email, this.state.password, this.state.rePassword);
        if ( this.state.name != '' && this.state.email !='' &&
            this.state.password == this.state.rePassword && this.state.rePassword != '')
        {
            this.setState({showProgress: true})
            auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                const user = auth().currentUser;
                user.updateProfile({displayName: this.state.name}).then(() => {
                this.props.navigation.navigate("AppBottomTab", {screen: "Home"});})
                .catch(error => {
                    alert("Error updating user profile: ", error);});
                alert('User account created & signed in!');
                this.setState({showProgress: false});
            })
            .catch(error => {
                this.setState({showProgress: false});
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                }
                console.error(error);
            });
        }
        else
            alert("Please enter your name, email and password");
    }

    render() {
        return(
            <>
                <View style={styles.container}>
                    <Text style={styles.title}>{appName}</Text>
                    <Text style={styles.subtitle}>{subName}</Text>
                    <View style={styles.welcomePanel}>
                        <ScrollView ref={ref => this.scrollView = ref}>
                            <Text style={styles.heading}>Register With Us!</Text>
                            <TextInput
                                style={styles.input}
                                value={this.state.name}
                                placeholder="Enter Your Name"
                                placeholderTextColor={Constants.colors.centralGray}
                                autoComplete='name'
                                onChangeText={(newName) => this.setState({name: newName})}
                                onFocus={() => {this.setState({showBlank: true}); this.scrollView.scrollToEnd({animated: true})}}
                                onBlur={() => this.setState({showBlank: false})}
                            />
                            <TextInput
                                style={[styles.input, {marginTop: 26}]}
                                value={this.state.email}
                                placeholder="Enter Your Email"
                                placeholderTextColor={Constants.colors.centralGray}
                                autoComplete='email'
                                onChangeText={(newEmail) => this.setState({email: newEmail})}
                                onFocus={() => {this.setState({showBlank: true}); this.scrollView.scrollToEnd({animated: true})}}
                                onBlur={() => this.setState({showBlank: false})}
                            />
                            <TextInput
                                style={[styles.input, {marginTop: 26}]}
                                value={this.state.password}
                                placeholder="Enter Your Password"
                                placeholderTextColor={Constants.colors.centralGray}
                                autoComplete='password'
                                onChangeText={(newPassword) => this.setState({password: newPassword})}
                                onFocus={() => {this.setState({showBlank: true}); this.scrollView.scrollToEnd({animated: true})}}
                                onBlur={() => this.setState({showBlank: false})}
                                secureTextEntry={true}
                            />
                            <TextInput
                                style={[styles.input, {marginTop: 26}]}
                                value={this.state.rePassword}
                                placeholder="Re-enter Your Password"
                                placeholderTextColor={Constants.colors.centralGray}
                                autoComplete='password'
                                onChangeText={(newRePassword) => this.setState({rePassword: newRePassword})}
                                onFocus={() => {this.setState({showBlank: true}); this.scrollView.scrollToEnd({animated: true})}}
                                onBlur={() => this.setState({showBlank: false})}
                                secureTextEntry={true}
                            />
                            {this.state.password == this.state.rePassword || this.state.rePassword == '' ? null : <Text style={styles.unmatchPassword}>Passwords Do Not Match</Text>}
                            <Pressable style={styles.registerButton} onPress={() => {this.registerUser()}}>
                                <Text style={styles.registerText}>Sign Up</Text>
                            </Pressable>
                            <Text style={styles.noAccount}>
                                <Text>Already Have An Account?</Text>
                                <Text style={styles.register} onPress={() => this.props.navigation.navigate("Login")}> Sign In</Text>
                            </Text>
                            {this.state.showBlank ? <View style={{height: 0.2*height}}/> : null}
                        </ScrollView>
                    </View>
                    <View style={styles.semicircle1}/>
                    <View style={styles.semicircle2}/>
                </View>
                <Modal
                visible={this.state.showProgress}
                transparent={true}
                animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <View style={{justifyContent: 'center'}}>
                                <Progress.CircleSnail
                                indeterminate={true}
                                color={Constants.colors.primaryGreen}
                                style={{backgroundColor: 'white'}}
                                spinDuration={3000}/>
                                <View style={{width: 28, height: 28, position: 'absolute', alignSelf: 'center', backgroundColor: Constants.colors.white, borderRadius: 30}}/>
                            </View>
                            {/* <Text style={styles.modalHeading}>Log In</Text> */}
                            <Text style={styles.modalText}>Please Wait Will We Register User</Text>
                        </View>
                    </View>
                </Modal>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 30,
        fontFamily: Constants.fonts.bold,
        color: Constants.colors.primaryGreen,
        marginStart: 20,
        marginTop: 30,
    },
    subtitle: {
        fontSize: 20,
        fontFamily: Constants.fonts.regular,
        color: Constants.colors.primaryGreen,
        marginStart: 20,
        width: 0.5*width,
    },
    heading: {
        fontSize: 20,
        fontFamily: Constants.fonts.semibold,
        color: Constants.colors.black,
        marginTop: 20,
        alignSelf: 'center'
    },
    semicircle1: {
        position: 'absolute',
        backgroundColor: Constants.colors.primaryGreen,
        borderRadius: 300,
        height: 340,
        width: 340,
        top: -190,
        right: -190,
    },
    semicircle2: {
        position: 'absolute',
        backgroundColor: Constants.colors.primaryGreen,
        borderRadius: 300,
        height: 360,
        width: 360,
        top: -153,
        right: -148,
        opacity: 0.5,
    },
    welcomePanel: {
        width: 0.9*width,
        height: 0.8*height,
        backgroundColor: Constants.colors.centralGray,
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        marginTop: 35,
        alignSelf: 'center',
    },
    welcomeBack: {
        width: 229,
        height: 172,
        alignSelf: 'center',
        marginTop: 50,
    },
    input: {
        width: 0.75*width,
        height: 60,
        backgroundColor: Constants.colors.white,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 40,
        paddingStart: 20,
        fontFamily: Constants.fonts.regular,
        fontSize: 16,
        color: Constants.colors.black,
    },
    unmatchPassword: {
        fontSize: 16,
        fontFamily: Constants.fonts.regular,
        color: Constants.colors.red,
        alignSelf: 'flex-end',
        marginEnd: 0.1*width,
        marginTop: 10,
    },
    registerButton: {
        width: 0.75*width,
        height: 60,
        backgroundColor: Constants.colors.primaryGreen,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 30,
        fontFamily: Constants.fonts.regular,
        fontSize: 16,
        color: Constants.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        fontSize: 20,
        fontFamily: Constants.fonts.bold,
        color: Constants.colors.white,
    },
    noAccount: {
        fontSize: 16,
        fontFamily: Constants.fonts.regular,
        color: Constants.colors.black,
        alignSelf: 'center',
        marginTop: 20,
    },
    register: {
        fontSize: 16,
        fontFamily: Constants.fonts.bold,
        color: Constants.colors.primaryGreen,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: 0.7*width,
        backgroundColor: Constants.colors.white,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 25,
        flexDirection: 'row'
    },
    modalHeading: {
        fontSize: 30,
        fontFamily: Constants.fonts.bold,
        color: Constants.colors.primaryGreen,
    },
    modalText: {
        fontSize: 16,
        fontFamily: Constants.fonts.regular,
        color: Constants.colors.primaryGreen,
        marginStart: 20,
    },
});