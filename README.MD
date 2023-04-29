# Remedi - Instant Medicine Delivery App

Remedi is a medicine delivery app that allows users to order medicines from nearby pharmacies and get them delivered to their doorstep. It is a cross-platform app built using React Native and Firebase.

## Relevant Folders

- [`android`](/android/) - Contains the Android project
- [`assets`](/assets/) - Contains the assets used in the app
- [`ios`](/ios/) - Contains the iOS project
- [`Constants`](/Constants/) - Contains the constants used in the app
- [`components`](/components/) - Contains repeating components
- [`screens`](/screens/) - Contains the screens used in the app

### Assets

- [`images`](/assets/images/) - Contains the images used in the app
- [`fonts`](/assets/fonts/) - Contains the fonts used in the app

#### Fonts

- [`Overpass-Regular`](/assets/fonts/Overpass-Regular.ttf) - This is the regular font
- [`Overpass-Bold`](/assets/fonts/Overpass-Bold.ttf) - This is the bold font
- [`Overpass-SemiBold`](/assets/fonts/Overpass-SemiBold.ttf) - This is the semi-bold {between bold & regular} font
- [`Overpass-Light`](/assets/fonts/Overpass-Light.ttf) - This is the light font

#### Images

In this [`images`](/assets/images/) folder, we have all the images used in our application. All the Icons and other sample images are stored here. All Images are stored in PNG format. Icons have been saved in 4x from Figma.

### Constants

In this folder, we have all the constants used in our application. All the constants are stored in a single file named [`Constants.js`](/Constants//Constants.js). All the constants are stored in the form of a key-value pair in a nested dictionary.

All references to fonts, colours [Primary Green: `#019874`, Primary Blue: `#090F47`], image references, and other constants are stored here.
Due to this file, we only need to import the [`Constants.js`](/Constants//Constants.js) file in any file and we can access all the constants from there.

Multiple references aren't required to be made to the same constant. This makes the code more readable and maintainable. This also reduces the chances of errors and chances of redundancy.

### Screens

- [`AddAddress.js`](/screens/AddAddress.js) - This screen allows the user to add a new address
- [`Cart.js`](/screens/Cart.js) - The screen that shows the cart of the user
- [`Category.js`](/screens/Category.js) - Users can view drugs according to the categories
- [`Home.js`](screens/Home.js) - The screen that shows the home page of the app
- [`List.js`](screens/List.js) - The screen that shows the named lists created by the user
- [`Login.js`](/screens/Login.js) - Login page of the app
- [`Notification.js`](screens/Notification.js) - The screen that shows the notifications of the user
- [`Product.js`](/screens/Product.js) - The screen where all information regarding a current drug is shown
- [`Profile.js`](screens/Profile.js) - The screen that shows the profile of the user
- [`Register.js`](/screens/Register.js) - Registration Page of the app
- [`Search.js`](/screens/Search.js) - This page shows the output of a Search Query
- [`SplashScreen.js`](/screens/SplashScreen.js) - This is the first page that is loaded
- [`ViewAddress.js`](/screens//ViewAddress.js) - Users can view their addresses here
- [`ViewDrugs.js`](/screens/ViewDrugs.js) - Users can view all available drugs here

#### [`Home.js`](/screens//Home.js)

This is the home screen of the app. It contains the following components:

- A banner which shows the user's profile photo, name & current location
- A search bar
- Top Categories to choose from
- Banners of offers
- Deals of the Day
- All Products Available on Remedi

#### [`List.js`](/screens//List.js)

This is the screen that shows the named lists created by the user. It contains the following components:

- Name of the list with an arrow to show the list
- The drug list has an heading with an edit icon {currently disabled}
- A list of drugs in the list. Each drug shows
  - Drug Image
  - Drug name
- A CTA for Pay Now with the total price of the list

#### [`Product.js`](/screens//Product.js)

This is the main page where the user can view all details related to a product. The following details are shown:

- Image
- Name
- Manufacturer Name
- Ratings
- Price
- MRP
- Discount (if any)
- Option to Add to Cart
- Product Information:
  - Ingredients
  - Key Benefits
  - Other Information as provided
  - Category
- Ratings
- Top Review
- Expiry Date
- Manufacturer Address
- Country of Origin

## Important Files

- [`App.js`](/App.js) - The main file of the app
- [`AppBottomTab.js`](/AppBottomTab.js) - Bottom Tab Navigation for the app
- [`app.json`](/app.json) - The configuration file of the app
- [`package.json`](/package.json) - The package file of the app
- [`index.js`](/index.js) - The entry point of the app

### [`App.js`](/App.js)

This is the main file of the app. This file is called when app is run. It contains the main Stack Navigation Container.

## Initial Setup

- Install [Node.js](https://nodejs.org/en/download), [Android Studio](https://developer.android.com/studio) and install SDK as required [here](https://reactnative.dev/docs/environment-setup?guide=native)
- In the project directory, run `npm install` to install all the dependencies
- All the dependencies are installed and the app is ready to run
- In the terminal, run `npx react-native run-android` to run the app on an Android device

## Dependencies

- [`react-native`](https://www.npmjs.com/package/react-native) - The core framework of the app
- [`react-navigation`](https://reactnavigation.org/docs/getting-started/) - The navigation library used in the app
- [`react-navigation/bottom-tabs`](https://reactnavigation.org/docs/bottom-tab-navigator/) - The bottom tab navigation library used in the app
- [`@react-native-firebase/app`](https://rnfirebase.io/) - This Package Allows Us to Connect With Firebase
- [`@react-native-firebase/auth`](https://rnfirebase.io/auth/usage) - This Package helps to communicate with the authentication module of Firebase
- [`@react-native-firebase/database`](https://rnfirebase.io/database/usage) - This package helps to communicate with the Realtime Database
- [`react-native-geolocation-service`](https://www.npmjs.com/package/react-native-geolocation-service) - This package helps fetch user location using JS GeoLocation API
- [`react-native-progress`](https://www.npmjs.com/package/react-native-progress) - This is used to show various progress bars and loading circles
- [`react-native-ratings`](https://www.npmjs.com/package/react-native-ratings) - This is used to display user ratings
- [`react-native-razorpay`](https://www.npmjs.com/package/react-native-razorpay) - This module helps integrate RazorPay React Native SDK in our app

## APIs

### [OpenCageData](https://opencagedata.com/dashboard#geocoding)

OpenCage allows use to geocode the latitude & logitude values received from the `react-native-geolocation-service` to relevant address.
This is used to communicate the correct address to the user (who may not be able to understand latitude and longitude)

### [RazorPay Order API](https://razorpay.com/docs/api/orders/#orders-api)

We use RazorPay Order API to create an order in RazorPay which is then marked complete when successful payment has been made

### [RazorPay Payments API](https://razorpay.com/docs/api/payments#payments-api)

RazorPay Payments API is integrated into the RazorPay React Native SDK. This is used to process a payment request and handle the success/failure or any other error during the payment process.
