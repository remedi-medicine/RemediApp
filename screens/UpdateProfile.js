import React from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions, Pressable, Alert, ToastAndroid, Modal } from "react-native";
import Constants from "../Constants/Constants";
import Header from "../components/Header";
import TextBox from "../components/TextBox";
import LoadingModal from "../components/LoadingModal";

import { Calendar } from "react-native-calendars";

import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import globalStyles from "../Constants/globalStyles";

let Profile = {
  phone: '',
  gender: '',
  dob: '',
};

const userData = firebase
  .app()
  .database('https://remedi---instant-medicine-default-rtdb.asia-southeast1.firebasedatabase.app/')
  .ref('UserData');

const {width, height} = Dimensions.get('window');
const today = new Date();
const todayDate = today.getDate();
const todayMonth = today.getMonth() + 1;
const todayYear = today.getFullYear();

export default class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      name: "",
      email: "",
      phone: "",
      gender: "",
      dob: "",
      uid: "",
      yearChosen: todayYear.toString(),
      monthChosen: todayMonth.toString(),
      dayChosen: todayDate.toString(),
      showLoading: true,
      showDatePicker: false,
    };
  }

  componentDidMount() {
    let user = this.state.user;
    let uid = user.uid;
    userData.child(uid).child('MyProfile').on('value', (snapshot) => {
      Profile = snapshot.val();
      this.setState({dob: Profile.dob, gender: Profile.gender, phone: Profile.phone})
    });
    this.setState({name: user.displayName, email: user.email, verified: user.emailVerified});
    this.setState({showLoading: false});
  }

  updateProfile = () => {
    if(this.state.name == '' || this.state.phone == '' || this.state.gender == '' || this.state.dob == '') {
      Alert.alert('Incomplete Data', 'Please fill all the fields');
      return;
    }
    let user = this.state.user;
    let uid = user.uid;
    Profile['phone'] = this.state.phone;
    Profile['gender'] = this.state.gender;
    Profile['dob'] = this.state.dob;
    userData.child(uid).child('MyProfile').set(Profile).then(() => {
      this.state.user.updateProfile({displayName: this.state.name}).then(() => {
          ToastAndroid.show('Profile Updated', ToastAndroid.SHORT);
          this.props.navigation.push("AppBottomTab", {screen: "Profile"});
      });
    });
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <Header title={"My Account"} onBack={() => this.props.navigation.goBack()} showSearch={false}/>
          <ScrollView style={styles.container}>
            <Text style={styles.heading}><Text>Full Name:</Text><Text style={{color: Constants.colors.red}}>*</Text></Text>
            <TextBox
              value={this.state.name}
              placeholder="Full Name"
              autoComplete='name'
              onChangeText={(newName) => this.setState({name: newName})}
            />
            <Text style={styles.heading}><Text>Email Address:</Text><Text style={{color: Constants.colors.red}}>*</Text></Text>
            <TextBox
              value={this.state.email}
              placeholder="Email Address"
              editable={false}
            />
            <Text style={styles.heading}><Text>Phone Number:</Text><Text style={{color: Constants.colors.red}}>*</Text></Text>
            <TextBox
              value={this.state.phone}
              placeholder="Phone Number"
              autoComplete="tel-device"
              onChangeText={(newPhone) => this.setState({phone: newPhone})}
            />
            <Text style={styles.heading}><Text>Gender:</Text><Text style={{color: Constants.colors.red}}>*</Text></Text>
            <TextBox
              value={this.state.gender}
              placeholder="Gender"
              onChangeText={(newGender) => this.setState({gender: newGender})}
            />
            <Text style={styles.heading}><Text>Date of Birth:</Text><Text style={{color: Constants.colors.red}}>*</Text></Text>
            <Text
              onPress={() => this.setState({showDatePicker: true})}
              style={styles.input}
            >{this.state.dob}</Text>
            <Pressable style={[globalStyles.ctaButton, {marginTop: 40,}]} onPress={() => this.updateProfile()}>
              <Text style={globalStyles.ctaText}>Save & Continue</Text>
            </Pressable>
          </ScrollView>
        </View>
        <LoadingModal visible={this.state.showLoading}/>
        <Modal
          visible={this.state.showDatePicker}
          transparent={true}
          animationType="fade">
          <View style={globalStyles.modalContainer}>
            <View style={globalStyles.modal}>
              <View style={{justifyContent: 'center'}}>
                <Calendar
                  current={this.state.dob!='' ? this.state.dob : `${this.state.yearChosen}-${this.state.monthChosen}-${this.state.dayChosen}`}
                  onDayPress={day => {
                    this.setState({showDatePicker: false, dob: day.dateString, yearChosen: day.year, dayChosen: day.day, monthChosen: day.month,});
                  }}
                  markedDates={{
                    [this.state.dob] : {selected: true, selectedColor: Constants.colors.primaryGreen,}
                  }}
                />
              </View>
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
  text: {
    fontSize: 20,
    color: Constants.colors.primaryGreen,
    fontFamily: Constants.fonts.bold,
  },
  heading: {
    color: Constants.colors.primaryBlue,
    fontSize: 16,
    fontFamily: Constants.fonts.bold,
    alignSelf: 'flex-start',
    marginHorizontal: 40,
    marginTop: 20,
  },
  cartButton: {
    width: 80,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Constants.colors.primaryGreen,
    borderWidth: 1,
  },
  input: {
    width: 0.85*width,
    height: 50,
    backgroundColor: Constants.colors.white,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 5,
    paddingStart: 20,
    fontFamily: Constants.fonts.regular,
    fontSize: 16,
    color: Constants.colors.black,
    borderWidth: 1,
    borderColor: Constants.colors.primaryGreen,
    alignContent: 'center',
    textAlignVertical: 'center',
  },
});
