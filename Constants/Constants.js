import { Platform } from 'react-native';

//This file contains all the global constants used in the app
const Constants = {
    colors : {
        primaryGreen : "#019874",//This is the primary green colour used in the app
        primaryBlue : "#090F47",
        translucentBlue: "rgba(9, 15, 71, 45)",
        centralGray: "rgba(196, 196, 196, 0.54)",
        white : "#FFFFFF",
        black : "#000000",
        red: "#FF0000",
    },
    //This is the list of images used in the app
    img: {
        profile : require('../assets/images/StockProfile.png'),
        search : require('../assets/images/search.png'),
        listGreen : require('../assets/images/list-green.png'),
        listBlue : require('../assets/images/list-blue.png'),
        rightArrow : require('../assets/images/right-arrow.png'),
        rightArrowTrans : require('../assets/images/right-arrow-trans.png'),
        edit: require('../assets/images/edit.png'),

        home0 : require('../assets/images/home-deselected.png'),
        home1 : require('../assets/images/home-selected.png'),
        notif0 : require('../assets/images/notif-deselected.png'),
        notif1 : require('../assets/images/notif-selected.png'),
        list0 : require('../assets/images/list-deselected.png'),
        list1 : require('../assets/images/list-selected.png'),
        profile0 : require('../assets/images/profile-deselected.png'),
        profile1 : require('../assets/images/profile-selected.png'),
        cart : require('../assets/images/cart.png'),

        welcomeBack : require('../assets/images/welcome-back.png'),

        banner: [require('../assets/images/banner-1.jpg'), require('../assets/images/banner-2.jpg'), require('../assets/images/banner-3.png')],
    },
    //This is the list of fonts used in the app
    fonts : {
        bold: 'Overpass-Bold',
        semibold : 'Overpass-SemiBold',
        regular: 'Overpass-Regular',
        light: 'Overpass-Light',
    }
}

export default Constants;