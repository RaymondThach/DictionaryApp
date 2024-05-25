# Dictionary App
## The App and the Problem Space
This React Native mobile application is designed to alleviate the pesronal problem space of learning new English words conveniently, without needing to access dictionaries or reading books. It provides random new words fetched from a free API, and defined via another with audio pronounciation. These words can be saved to a list for the user to revise, and add notes. The list is sortable alphabetically and by recency. Building this application served as an introduction to React Native and TypeScript.

## Resources
TypeScript
JavaScript
React Native
SQLite

APIs -
Random Word: https://random-word-api.herokuapp.com/home
Word Definition (requires API Key): https://www.dictionaryapi.com/products/api-collegiate-dictionary

## Setup
Step 1 - 
Setup the development environment following https://reactnative.dev/docs/environment-setup.

Step 2 - 
Clone this respository

Step 3 - 
Run your preferred virtual android (Android Studio was used in development) and IDE.

Step 4 -
Create a .env file at the root of the repository with:
```bash
# Dictionary API key
API_KEY = {your_API_KEY}
```

Step 5 -
Run the application using the below and follow the CLI instructions:
```bash
# Use NPM start
npm start
```

## Installation on Mobile
Step 1 - 
Setup your android phone for debugging and development following https://reactnative.dev/docs/running-on-device.

Step 2 - 
Run the below to start development on your android phone with USB plugin
```bash
# Use NPM start
npm start
```

Step 3 (optional) - 
Find the APK following the folder path:
android/app/build/outputs/apk/app-release.apk
Step 3.1 - 
Transfer to the android phone and install.

## Designs
https://drive.google.com/drive/folders/1yPdNyy9xPDmtOp5PWxyekbbKMO_5QT9S?usp=sharing

## Backlog
https://docs.google.com/spreadsheets/d/1wNzjEzdkwj1D6NVb_rMD0t9CmaWNXIe85cNZZiL9-68/edit?usp=sharing

## Future
Features: 
- System notifications to have word reminders like flash cards
- Account for words with more than one definition (can implement pagination)
Design: 
- Consider storing API keys on a backend instead


