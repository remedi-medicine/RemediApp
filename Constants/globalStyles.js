import { StyleSheet } from "react-native";
import Constants from "../Constants/Constants";

const globalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: Constants.colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row'
  },
  ctaButton: {
    width: '75%',
    height: 60,
    backgroundColor: Constants.colors.primaryGreen,
    borderRadius: 20,
    alignSelf: 'center',
    fontFamily: Constants.fonts.regular,
    fontSize: 16,
    color: Constants.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 20,
    fontFamily: Constants.fonts.bold,
    color: Constants.colors.white,
  }
});

export default globalStyles;