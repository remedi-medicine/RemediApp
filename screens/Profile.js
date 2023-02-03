import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, StyleSheet } from "react-native";
import Constants from "../Constants/Constants";


// export default class Profile extends React.Component {
//     render() {
//         return(
//             <>
//                 <View style={styles.container}>
//                     <Text style={styles.text}>Profile</Text>
//                 </View>
//             </>
//         );
//     }
// }

const ProfileValue = ({ icon, label, value, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 70,
                alignItems: 'center',
            }}
            onPress={onPress}
        >
            {/*Icon*/}
            <View
                style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    backgroundColor: 'white',
                }}
            >
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                        tinColor: 'lightgray',
                    }}
                />
            </View>

            {/*label & value*/}
            <View
                style={{
                    flex: 1,
                    marginLeft: 20,

                }}
            >
                {label &&
                    <Text
                        style={{
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: 15,
                        }}
                    >
                        {label}
                    </Text>
                }
                {/* <Text
                    style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 10,
                    }}
                >
                    {value}
                </Text> */}
            </View>

            {/*Icon*/}
            <Image
                source={Constants.img.rightArrowTrans}
                style={{
                    width: 20,
                    height: 20,
                }}
            />
        </TouchableOpacity>
    )
}

const Separator = () => <View style={{
    height: 1,
    backgroundColor: "rgba(9, 28, 63, 0.5)",
    width: 0.8*400,
    alignSelf: "center",
}} />

const Profile = () => {

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 30,
                    paddingHorizontal: 20,
                    justifyContent: 'space-between',
                }}
            >
                <Text
                    style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 25,
                    }}
                >
                    Profile
                </Text>
                {/* <IconButton
                    icon={icon.sun}
                    iconStyle={{
                        tinColor: 'black',
                    }}
                /> */}


            </View>
        )
    }

    function renderProfileCard() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    borderRadius: 20,
                    backgroundColor: Constants.colors.primaryGreen,
                }}
            >
                {/*Profile Image*/}
                <TouchableOpacity
                    style={{
                        width: 60,
                        height: 60,

                    }}
                >
                    <Image
                        source={Constants.img.profile}
                        style={{
                            width: '90%',
                            height: '90%',
                            borderRadius: 40,//sizes.radius
                            borderWidth: 2,
                            borderColor: 'white',
                        }}
                    />

                </TouchableOpacity>

                {/*Details section */}
                <View
                    Style={{
                        flex: 1,
                        marginLeft: 40,
                        alignItems: 'flex-start',

                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 22,
                            marginLeft: 10,
                        }}
                    >
                        Hi,Amaan
                    </Text>

                    <Text
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 15,
                            marginLeft: 18,
                        }}
                    >
                        Welcome to Remidi...
                    </Text>
                </View>

            </View>
        )
    }

    function renderProfileSection() {
        return (
            <View
                style={styles.profileSectionContainer}
            >
                <ProfileValue
                    icon={Constants.img.listGreen}
                    label="My Account"
                    value="Remidi"
                />
               <Separator/>

                <ProfileValue
                    icon={Constants.img.listGreen}
                    label="Saved for Later"
                    value="Remidi"
                />
                <Separator/>
                <ProfileValue
                    icon={Constants.img.listGreen}
                    label="Biling"
                    value="Remidi"
                />
                <Separator/>
                <ProfileValue
                    icon={Constants.img.listGreen}
                    label="Faq"
                    value="Remidi"
                />
                <Separator/>
                <ProfileValue
                    icon={Constants.img.listGreen}
                    label="Logout"
                    value="Remidi"
                />

            </View>
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
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 20,
                }}
            >
                {/*Profile Card*/}
                {renderProfileCard()}

                {/*Profile Section  1*/}
                {renderProfileSection()}

            </ScrollView>

        </View>
    )

}

export default Profile;

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
});