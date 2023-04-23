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
        remediLogo : require('../assets/images/remedi-logo.png'),
        remediRound : require('../assets/images/remedi-round.png'),

        profile : require('../assets/images/StockProfile.png'),
        search : require('../assets/images/search.png'),
        listGreen : require('../assets/images/list-green.png'),
        listBlue : require('../assets/images/list-blue.png'),
        rightArrow : require('../assets/images/right-arrow.png'),
        rightArrowTrans : require('../assets/images/right-arrow-trans.png'),
        edit: require('../assets/images/edit.png'),
        backArrow: require('../assets/images/back-arrow.png'),
        close: require('../assets/images/close.png'),

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

        billing : require('../assets/images/billing.png'),
        faq : require('../assets/images/faq.png'),
        logout : require('../assets/images/logout.png'),
        savedForLater : require('../assets/images/saved-for-later.png'),
        myOrders : require('../assets/images/my-orders.png'),

        plus: require('../assets/images/plus.png'),
        minus: require('../assets/images/minus.png'),
        delete: require('../assets/images/delete.png'),
        star: require('../assets/images/star.png'),

        genuine: require('../assets/images/genuine.png'),
        safe: require('../assets/images/safe.png'),
        contactless: require('../assets/images/contactless.png'),
        sanitised: require('../assets/images/sanitised.png'),

        downArrow: require('../assets/images/down-arrow.png'),
        upArrow: require('../assets/images/up-arrow.png'),

        showPassword: require('../assets/images/show-password.png'),
        hidePassword: require('../assets/images/hide-password.png'),

        banner: [require('../assets/images/banner-1.jpg'), require('../assets/images/banner-2.jpg'), require('../assets/images/banner-3.png')],
        category: {
          "Dental": require('../assets/images/dental.png'),
          "Wellness": require('../assets/images/wellness.png'),
          "Homeopathy": require('../assets/images/homeo.png'),
          "Eye Care": require('../assets/images/eyecare.png'),
          "Skin & Hair": require('../assets/images/skinhair.png'),
          "Bone": require('../assets/images/bone.png'),
        }
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