# Remedi - Instant Medicine Delivery App

Remedi is a medicine delivery app that allows users to order medicines from nearby pharmacies and get them delivered to their doorstep. It is a cross-platform app built using React Native and Firebase.

## Initial Folders

- [`android`](/android/) - Contains the Android project
- [`assets`](/assets/) - Contains the assets used in the app
- [`ios`](/ios/) - Contains the iOS project
- [`Constants`](/Constants/) - Contains the constants used in the app
- [`DummyData`](/DummyData/) - Contains the dummy data used in the app
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

### DummyData

- [`Category.json`](/DummyData/Category.json) - Contains the dummy list of categories
- [`CustList.json`](/DummyData/CustList.json) - Contains the dummy list of customers's lists created
- [`Deal.json`](/DummyData/Deal.json) - Contains the dummy list of deals of the day
- [`DrugList.json`](/DummyData/DrugList.json) - Contains the dummy list of drugs

#### DrugList.json

This file contains the dummy list of drugs. Each drug has the following properties:

- `id` - The unique id of the drug
- `name` - The name of the drug
- `image` - The image of the drug via URL
- `manufacturer` - The manufacturer of the drug
- `price` - The price of the drug
- `product_info` - The description of the drug

### Screens

- [`Cart.js`](/screens/Cart.js) - The screen that shows the cart of the user {currently empty}
- [`Home.js`](screens/Home.js) - The screen that shows the home page of the app
- [`List.js`](screens/List.js) - The screen that shows the named lists created by the user
- [`Notification.js`](screens/Notification.js) - The screen that shows the notifications of the user {currently empty}
- [`Profile.js`](screens/Profile.js) - The screen that shows the profile of the user {currently empty}

#### Home.js

This is the home screen of the app. It contains the following components:

- A banner which shows the user's PFP and name
- A search bar
- Top Categories to choose from
- Banners of offers
- Deals of the Day

#### List.js

This is the screen that shows the named lists created by the user. It contains the following components:

- Name of the list with an arrow to show the list
- The drug list has an heading with an edit icon {currently disabled}
- A list of drugs in the list. Each drug shows
  - Drug Image
  - Drug name
- A CTA for Pay Now with the total price of the list

## Important Files

- [`App.js`](/App.js) - The main file of the app
- [`app.json`](/app.json) - The configuration file of the app
- [`package.json`](/package.json) - The package file of the app
- [`index.js`](/index.js) - The entry point of the app

### App.js

This is the main file of the app. Among others, it contains the code for the bottom navigation bar.
Design/Layout of all icons in the bottom navigation bar is done in this file.

## Initial Setup

- Install Node.js
- In the project directory, run `npm install` to install all the dependencies
- All the dependencies are installed and the app is ready to run
- In the terminal, run `npx react-native run-android` to run the app on an Android device

## Dependencies

- [`react-native`](https://www.npmjs.com/package/react-native) - The core framework of the app
- [`react-navigation`](https://reactnavigation.org/docs/getting-started/) - The navigation library used in the app
- [`react-navigation/bottom-tabs`](https://reactnavigation.org/docs/bottom-tab-navigator/) - The bottom tab navigation library used in the app
