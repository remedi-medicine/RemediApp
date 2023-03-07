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
            email: '',
            password: '',
            showBlank: false,
            showProgress: false,
        }
    }
    
    componentDidMount = () => {
        // setTimeout(() => {this.props.navigation.replace("Register")}, 1500);
    }

    loginUser = () => {
        if(this.state.email == '' || this.state.password == '') {
            alert("Please enter your email and password");
            return;
        }
        this.setState({showProgress: true})
        auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.navigation.navigate("AppBottomTab", {screen: "Home"});
                this.setState({showProgress: false})
            })
            .catch(error => {
                this.setState({showProgress: false})
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                }
                console.error(error);
            });
    }

    render() {
        return(
            <>
                <View style={styles.container}>
                    <Text style={styles.title}>{appName}</Text>
                    <Text style={styles.subtitle}>{subName}</Text>
                    <View style={styles.welcomePanel}>
                        <ScrollView ref={ref => this.scrollView = ref}>
                            <Text style={styles.heading}>Welcome Back!</Text>
                            <Image source={Constants.img.welcomeBack} style={styles.welcomeBack}/>
                            <TextInput
                                style={styles.input}
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
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                            <Pressable style={styles.loginButton} onPress={() => {console.log("Login Button Clicked");this.loginUser()}}>
                                <Text style={styles.loginText}>Sign In</Text>
                            </Pressable>
                            <Text style={styles.noAccount}>
                                <Text>Don't Have An Account?</Text>
                                <Text style={styles.register} onPress={() => this.props.navigation.navigate("Register")}> Sign Up</Text>
                            </Text>
                            {this.state.showBlank ? <View style={{height: 0.4*height}}/> : null}
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
                            <Progress.CircleSnail indeterminate={true} color={Constants.colors.primaryGreen}/>
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
    forgotPassword: {
        fontSize: 16,
        fontFamily: Constants.fonts.regular,
        color: Constants.colors.primaryGreen,
        alignSelf: 'flex-end',
        marginEnd: 0.1*width,
        marginTop: 10,
    },
    loginButton: {
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
    loginText: {
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
    },
});