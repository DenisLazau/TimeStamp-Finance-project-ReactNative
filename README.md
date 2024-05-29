# ReactNativeSmartReporter

This project will be generated with [EXPO](https://expo.dev/).

In this project you will be re-implementing the **IonicSmartReporter** using **React Native**.
- Use of FireBase as a backend
  - Connection to FireBase
  - User authentication
  - Page protection against unauthorized access
  - Managing documents in FireBase
  - Managing images in FireBase
- Regsitering a user with an email and a password
- Only logged in users can access the application
- A logged in user will be able to report a problem in a location
- Each report will have a title, a description, a location and a photo
- Using Expo to access the camera to capture pictures and the location of the device

## Steps

### Setup your machine for React Native development
> [!NOTE]
> **These steps are not needed on a lab PC - you ONLY need them on your own machine/laptop**  
> **Skip to [Create your project](#create_project) if you are on a lab PC**


> [!TIP]
> First follow the setup steps from the **React Native Country List** assignment.

### <a name="create_project">Create your project</a>

#### Configuring Firebase
> [!NOTE]
> **You can reuse the Firebase project you created for the Ionic project.**
> Or you can creat a new Firebase project for this assignment.
> If you are reusing the Firebase project you can skip the Firebase configuration steps and continue with the **Creat your React .

FireBase is a platform that provides a lot of services that can be used in your applications.
- It is a cloud based solution
- Provides authentication
- Provides a NoSQL database
- Provides a storage solution
- Provides a hosting solution
- Provides a cloud messaging solution
- Provides a cloud function solution

Steps to configure FireBase:
- Go to https://firebase.google.com/ and sign in with your Google account
- Click on the **Go to Console** button (**top right**)
- Click on the **Add Project** button
- Fill in the project name (**Ionic Smart Reporter**), check the confirmation checkbox, and click on the **Continue** button
- If you want you can **disable** the Google Analytics for this project
  - If you did not disable the Google Analytics then click on the **Continue** button
  - Configure Google Analytics by selecting the Google Analytics account
- Click on the **Create project** button
- Wait for the project to be created
- Click on the **Continue** button

For React Native integration we need to add a web application to the project:
- Click on the **Web** icon
- Fill in the application nickname (**Ionic Smart Reporter**)
  - We will not be using **Firebase Hosting** so you can uncheck the checkbox
- Click on the **Register app** button
- From here you can follow the instructions to add the Firebase SDK to your application
  - You can skip this step for now, as we will be adding the Firebase SDK later
- Click on the **Continue to console** button

For our application we will be using the **Authentication**, the **Firestore Database** and **Storage** services:
- Expand the **Build** menu on the left
- To configure the **Authentication** service
  - Click on the **Authentication** icon
  - Click on the **Get started** button
  - From the **Sign-in method** tab enable the **Email/Password** sign-in method and click on the **Save** button
- To configure the **Firestore Database** service
  - Click on the **Firestore Database** icon
  - Click on the **Create database** button
  - Choose the **Location** (you can leave the default one or change to Europe) and click on the **Next** button
  - Choose the **Start in Test mode** 
    - You notice that in the code window there is a rule to allow access to the database until a spcific date (usually 30 days from the creation of the project)
    - You will modify this rule later to allow only authenticated users to access the database
  - Click on the **Create** button
- To configure the **Storage** service
  - Click on the **Storage** icon
  - Click on the **Get started** button
  - Choose the **Start in Test mode** 
    - You notice that in the code window there is a rule to allow access to the storage until a spcific date (usually 30 days from the creation of the project)
    - You will modify this rule later to allow only authenticated users to access the storage
  - Click on the **Next** button
  - If you did not set the locatoin you will be asked to set the location
  - Click on the **Done** button

> [!IMPORTANT]
> For real applications you should modify the rules for the database and the storage to allow only authenticated users to access the data.

#### Create your React Native project
Open a shell prompt (CMD on Windows / shell on *nix - macOS, Linux) and navigate to a directory where you have rights to create directories.  
Here you can create your project by issuing the following command:
```shell
npx create-expo-app ReactNativeSmartReporter --template expo-template-blank-typescript
```
This will create a React Native project based on the **expo-template-blank-typescript** template.

Wait until the initial project is configured and the necessary packages are downloaded and installed in the project.  

Change the current directory to your project directory.
```shell
cd ReactNativeSmartReporter
```
#### Prepare your project to checkout the github assignment on top of the newly created project
Remove the .git directory so that you could checkout the assignment from github and be able to track your project on github
- On Windows if using CMD (Command Prompt)
```shell
rmdir /Q /S .git
```
- On Windows if using PowerShell
```shell
rm -recurse -force .git
```
- On *nix (macOS, Linux)
```shell
rm -rf .git
```
#### Checkout the github assignment on top of the newly created project
Following commands need to be executed in the shell from the project directory. After the last command you will have the **LICENSE** and **README.md** file from the assignment, togehter with some starter project files that will owerrwrite the existing files.
> Initialize the local repo
```shell
git init
```
> Set the online repo. Replace <your-git-repo-URL> with the URL obtained by clicking on the GREEN **<> Code** button on the page of your repository.
```shell
git remote add origin <your-git-repo-URL>
```
> Get the data from the online repo
```shell
git fetch
```
> Reset the local repo so that it will allow existing files
```shell
git reset --mixed origin/main
```
> Rename the "master" branch to "main" as this is the name we are using on github.
```shell
git branch -m main
```
> Setup the local "main" branch to track "origin/main" from the github repo
```shell
git branch --set-upstream-to=origin/main main
```
> Checkout the files from the github repo and owerwrite any local files with the same name as in the online repo
```shell
git checkout -- .
```
#### Add all the files from the newly created project and commit to the github repository's main branch
Following commands need to be executed in the shell from the project directory.
> Add all the local files that are not tracked to the repo
```shell
git add --all
```
> Commit all the changes
```shell
git commit -m "My first commit"
```
> Upload the changes to the online repo
```shell
git push origin main
```
> [!IMPORTANT]
> **DON'T FORGET** Whenever you consider you have completed a part of your project, or at the end of a lab you should add your modifications, commit them and push them to the repository, by issuing the following commands:
```shell
git add --all
git commit -m "Explaining my changes"
git push
```

> [!IMPORTANT]
> **DON'T FORGET** Whenever you clone/checkout a repository you should always install the missing modules by issuing the following command form the project directory:
```shell
npm install
```

#### Continue to work on your project
> [!NOTE]
> Now your project is linked to your assignment and any modifications can be tracked and versioned

### You should use an IDE like Visual Studio Code
From the project directory start **Visual Studio Code**

```shell
code .
```
If you did not configure yet Visual Studio Code with essential plugins please do so by installing the following list of plugins suggested in the previous assignment.

From the menu start a **Terminal** to be able to issue commands directly from the IDE. you can start as many terminals as you need and you can switch between them.

### Start your project in a browser
Open a **Terminal** inside VSCode from the **Terminal** menu.  
To be able to run the application also in the browser you must install the following packages in the project:
```shell
npx expo install react-native-web react-dom @expo/metro-runtime
```

To enable **fast reload** in browse, you need to import in `App.tsx` as a first import statement the following:
```ts
import '@expo/metro-runtime';
```

### Enable navigation in the project
For navigation we can use the [React Navigation](https://reactnative.dev/docs/navigation#react-navigation) package, by installing it in our project.
Open a new **Terminal** and install the following packages:
```shell
npm install @react-navigation/native @react-navigation/native-stack
```

Also we need to install the following dependencies:
```shell
npx expo install react-native-screens react-native-safe-area-context
```

### Now we need to bring our Firebase configuration into the project
First we need to install the Firebase package:
```shell
npx expo install firebase
```

Create a new `FirebaseConfig.ts` file in the root of the project and add the following code:
```ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase with your config
const firebaseConfig = {
	apiKey: '',
	authDomain: '',
	projectId: '',
	storageBucket: '',
	messagingSenderId: '',
	appId: ''
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
```
> [!IMPORTANT]
> Make sure you add your own configuration!

To finish the Firebase integration we need to create a custom metro config as well, so run the following command to create your own custom metro config:
```shell
npx expo customize metro.config.js
```

Next we need to add the following code to the `metro.config.js` file:
```js
const { getDefaultConfig } = require('@expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;
```

#### Start your application in a browser
Open a new **Terminal** and install the following packages:
```shell
npx expo start
```
This will compile your project and launch a local web server that is publishing your app.
- Press `w` to open a browser that will display your application.
- Install the [Expo GO](https://docs.expo.dev/get-started/expo-go/) app on your Android or iOS device and **scan the QR code** displayed to run the app on your device.

> [!IMPORTANT]
> To be able to run the app on your device, you need to be on the same network as your development workstation.

#### Preparing the App Folder Structure
You shpuld organize your project structure and create the necessary folders.
To keep the codebase clean and maintainable, let’s create the following folders in the root directory of the project:
* `app`: This folder will contain the main components of the app.
* `app/cssStyles`: This folder will contain CSS stylesheets or style-related files for the app’s components.
* `app/screens`: Here, we’ll store the screen components that represent the different screens of the app.
* `app/services`: In this folder, we’ll add files responsible for interacting with Firebase services, such as authentication and database operations.
* `app/components`: This folder will hold reusable components used across multiple screens.

#### Create the initial screens
Start with the following three screens:
* `HomeScreen`: This screen will be the main screen of the app and will display a list of reports.
* `DetailsScreen`: This screen will show the details of the selected report from the list on the Home screen.
* `LoginScreen`: This screen will allow users to log in to the app.
* `RegisterScreen`: This screen will allow users to register for the app by providing their email and password.

#### You should also add the navigation parameters
Based on the example from the previus assignment you should define the parameters for each screen for navigation, using `NativeStackScreenProps`.

#### Some basic styles
Please add this code to the `app/cssStyles/styles.ts` file:
```ts
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        width: "100%",
        alignItems: "center",
    },
    image: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 10,
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#f8f4f4",
        borderRadius: 25,
        padding: 10,
        marginVertical: 10,
    },
    buttonContainer: {
        width: "100%",
        height: 50,
        backgroundColor: "#fc5c65",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    loginText: {
        color: "#fc5c65",
        textAlign: "center",
        marginVertical: 10,
    },
    reportsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    report: {
        flexDirection: "row",
        //alignItems: "center",
    },
    reportText: {
        marginLeft: 10,
        fontSize: 18,
    },
    form: {
        width: "100%",
        padding: 20
    },
});

export default styles;
```

Also add the following code to the `app/cssStyles/colors.ts` file:
```ts
const colors = {
    primary: "#fc5c65",
}

export default colors;
```

#### We need some util functions
For this create the `firebase-utils.ts` file in `app/services` with the following content:
```ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig";
import { collection } from "firebase/firestore";

export const login = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
        const user = userCredential.user;
        console.log("User logged in: ", user);
        return user;
    } catch (error) {
        console.log("Login error: ", error);
        throw error;
    }
};

export const signup = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        const user = userCredential.user;
        console.log(user);
        return user;
    } catch (error) {
        console.log("Signup error: ", error);
        throw error;
    }
};

export const saveUserData = async (id: string, firstName: string, lastName: string) => {
    try {
        // Save user data to Firestore
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    return signOut(FIREBASE_AUTH);
}
```

#### Implementing User Registration Feature
For this we create the `RegisterScreen.tsx` file in `app/screens` folder, and add the following code:
```tsx
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../cssStyles/styles";
import colors from "../cssStyles/colors";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { saveUserData, signup } from "../services/firebaseUtils";

const RegisterScreen = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleSignup = async () => {
        setLoading(true);
        try {
            const user = await signup(email, password);
            if (user) {
                const id = user.uid;
                await saveUserData(id, firstName, lastName);
            }
        } catch (error: any) {
            if (error.code === "auth/email-already-in-use") {
                alert("Email already in use.");
            } else if (error.code === "auth/weak-password") {
                alert("Password is too weak.");
            } else {
                alert('Signup error: ' + error.message);
            }
        }
        setLoading(false);
    };

    const handleLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image source={require("../../assets/logo-small.png")} style={styles.image}/>
                    <Text style={styles.title}>Register</Text>

                    <TextInput style={styles.input} placeholder="Firstname" autoCapitalize="none" value={firstName} onChangeText={setFirstName} />
                    <TextInput style={styles.input} placeholder="Lastname" autoCapitalize="none" value={lastName} onChangeText={setLastName} />
                    <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry autoCapitalize="none" value={password} onChangeText={setPassword} />

                    {loading ? 
                        <ActivityIndicator size="large" color={colors.primary} /> :
                        <TouchableOpacity style={styles.buttonContainer} onPress={handleSignup} >
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={handleLogin} >
                        <Text style={styles.loginText}>Already have an account? Login here.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default RegisterScreen;
```

#### Implementing the Login Feature
Based on the example provided for the registration, you should implement the `LoginScreen`.

#### Implement the HomeScreen
This screen should display the list of reports and allow to add a new report

#### Implement the DetailsScreen
Based on the details screen example from the previous assignment and also the Ionic Firebase assignment you should implement the navigation and display of the details of the selected report.

#### Customising App.tsx
You should replace the code from the `App.tsx` with the following:
```tsx
import '@expo/metro-runtime';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './app/screens/HomeScreen';
import DetailsScreen from './app/screens/DetailsScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  const onAuthStateChangedHandler = (user: any) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, onAuthStateChangedHandler);

    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
      // screenOptions={{ headerShown: false }}
      >
        {user? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
         )}             
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```
### Test the application.
If you do not see the updated application, please restart the expo server by pressing `Ctrl+C` and start again on the **terminal** that runs the server:
```shell
Ctrl+C

npx expo start
```

### Extending the application to use the Camera, Gallery and the GPS
First we need some packages.
To work with the Camera we need the `expo-camera` package:
```shell
npm install expo-camera
```
To work with the image Gallery we need the `expo-image-picker` package:
```shell
npm install expo-image-picker
```
To work with the GPS we need the `expo-location` package:
```shell
npm install expo-location
```

#### To use the Camera let's create a separate component
To work with the Camera we will need to check and ask for some permissions.
In the `components` folder create the `TakePicture.tsx` file with the following content:
```tsx
import { View, Button, Modal } from "react-native";
import styles from "../cssStyles/styles";
import { Camera, CameraType, PermissionStatus } from "expo-camera";
import { useEffect, useState } from "react";

const TakePicture = (props: any) => {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);

  const [camera, setCamera] = useState<Camera | null>(null);
  const [type, setType] = useState(CameraType.back);

  const permisionFunction = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();

    setCameraPermission(cameraPermission.status === PermissionStatus.GRANTED);

    if (
      cameraPermission.status !== PermissionStatus.GRANTED
    ) {
      alert('Permission for camera access needed.');
    }
};

useEffect(() => {
    permisionFunction();
}, []);

const takePicture = async () => {
  if (camera) {
    const data = await camera.takePictureAsync();
    props.setImage(data.uri);
    closeCamera();
  }
};

const closeCamera = () => {
  props.closeCamera();
};

return (
    <Modal visible={props.isModalVisible}>
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                <Camera
                    ref={(ref) => setCamera(ref)}
                    style={styles.fixedRatio}
                    type={type}
                    ratio={'1:1'}
                >
                    <View>
                        <Button title={'Take Picture'} onPress={takePicture} />
                        <Button title={'Flip'} onPress={() => {
                            setType(
                                type === CameraType.back
                                ? CameraType.front
                                : CameraType.back
                            );
                            }} />
                        <Button title={'Close'} onPress={closeCamera} />
                    </View>
                </Camera>
            </View>
        </View>
    </Modal>
  );
};

export default TakePicture;
```
#### Next we need to add a way to upload the image to Firestore
For this we need to update the `FirebaseConfig.ts` file:
```ts
// Other imports
import { getStorage } from 'firebase/storage';

// Other code
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
```

Next update the `firebaseUtils.ts` file from the `services` folder to define a function to upload the image. Also make sure to include all the needed elements.
```ts
// Other imports
import { FIREBASE_AUTH, FIREBASE_STORAGE } from "../../FirebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

// Other code
export const uploadImage = async (uri: string, imageName: string) => {
    const user = FIREBASE_AUTH.currentUser;
    const path = `uploads/${user!.uid}/${imageName}`;
    const storageRef = ref(FIREBASE_STORAGE, path);
    try {
        console.log('Uploading image: ', uri);
        // Upload image to Firebase Storage
        await uploadString(storageRef, uri, 'data_url');
        const imageUrl = await getDownloadURL(storageRef);
        console.log('Image uploaded: ', imageUrl);
        return imageUrl;
    } catch (error) {
        console.log('Error uploading image: ', error);
        return null;
    }
}
```

#### Let's add a component to be able to edit a SmartReport
For this we could also define our `SmartReport` interface in the `models` folder in the file `smart-report.ts`:
```ts
export interface SmartReport {
    id?: string;
    title: string;
    text: string;
    imageUrl: string;
    latitude?: number;
    longitude?: number;
    accuracy?: number;
}

export const EMPTY_REPORT: SmartReport = {
    id: undefined,
    title: '',
    text: '',
    imageUrl: '',
    latitude: undefined,
    longitude: undefined,
    accuracy: undefined
};
```

In the `components` folder create the `EditReport.tsx` file with the following content:
```tsx
import { View, Text, TextInput, Image, Modal, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { PermissionStatus } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import TakePicture from "../components/TakePicture";
import { EMPTY_REPORT, SmartReport } from "../models/smart-report";

const EditReport = (props: any) => {
  const [report, setReport] = useState<SmartReport>(EMPTY_REPORT);
  const [galleryPermission, setGalleryPermission] = useState<boolean | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  const permisionFunction = async () => {
    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    setGalleryPermission(imagePermission.status === 'granted');

    if (
      imagePermission.status !== PermissionStatus.GRANTED
    ) {
      alert('Permission for media access needed.');
    }
  };

  useEffect(() => {
      permisionFunction();
  }, []);

  useEffect(() => {
    initFields();
    console.log('EditReport: ', props.report);
  }, [props.report]);

  const initFields = () => {
    if (props.report) {
      setReport(props.report);
      setImageUri(props.report.imageUrl);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const setImage = (uri: string) => {
    console.log('Setting image uri: ', uri);
    setImageUri(uri);
  };

  const openCamera = async () => {
    setModalVisible(true);
  };

  const closeCamera = () => {
    setModalVisible(false);
  };

  const saveReport = async () => {
    report.imageUrl = imageUri??'';
    props.addSaveReport(report);
    setReport(EMPTY_REPORT);
    setImageUri(undefined);
    props.close();
  };

  const close = () => {
    setReport(EMPTY_REPORT);
    setImageUri(undefined);
    props.close();
  };

  return (
    <Modal visible={props.isModalVisible}
        animationType="slide"
        transparent={true}
        onShow={initFields}
        >
      <View style={localStyles.centeredView}>
        <View style={localStyles.modalView}>
          <TakePicture closeCamera={closeCamera} isModalVisible={isModalVisible} setImage={setImage}/>
          <TextInput
              style={localStyles.input}
              placeholder="Add report title"
              onChangeText={(title) => {
                  setReport({ ...report, title, imageUrl: imageUri??'' });
                  console.log(report);
              }}
              value={report.title}
          />
          <TextInput
              style={localStyles.input}
              placeholder="Add report description"
              onChangeText={(text) => {
                  setReport({ ...report, text, imageUrl: imageUri??'' });
                  console.log(report);
              }}
              value={report.text}
          />
          <Image source={{ uri: imageUri }} style={localStyles.image} />
          <View style={localStyles.buttons}>
            <Pressable
              style={[localStyles.button]}
              onPress={pickImage}>
              <Text style={localStyles.textStyle}>Select Picture</Text>
            </Pressable>
            <Pressable
              style={[localStyles.button]}
              onPress={openCamera}>
              <Text style={localStyles.textStyle}>Take Picture</Text>
            </Pressable>
          </View>
          <View style={localStyles.buttons}>
            <Pressable
              style={[localStyles.button]}
              onPress={saveReport}>
              <Text style={localStyles.textStyle}>{props.addSaveLabel}</Text>
            </Pressable>
            <Pressable
              style={[localStyles.button]}
              onPress={close}>
              <Text style={localStyles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 0,
    margin: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f8f4f4",
    borderRadius: 25,
    padding: 10,
    marginVertical: 10,
  },
});

export default EditReport;
```
#### Now we can use these components on our screens
Let's implement the `HomeScreen`:
```tsx
import { View, Text, TouchableOpacity, FlatList, Button } from "react-native";
import styles from "../cssStyles/styles";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SmartReport } from "../models/smart-report";
import { useNavigation } from "@react-navigation/native";
import { logout, uploadImage } from "../services/firebaseUtils";
import EditReport from "../components/EditReport";

const HomeScreen = () => {
    const [reports, setReports] = useState<SmartReport[]>([]);

    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const reportsRef = collection(FIRESTORE_DB, 'reports');
    
        const subscriber = onSnapshot(reportsRef, {
            next: (snapshot) => {
                const reports: SmartReport[] = [];
                snapshot.docs.forEach((doc) => {
                    reports.push({
                        id: doc.id,
                        ...doc.data() as SmartReport
                    });
                });
    
                setReports(reports);
            }
        });
    
        // // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button onPress={logout} title="Logout" />
          ),
        });
    }, [navigation]);

    const addReport = async (report: SmartReport) => {
        try {
            const crtReport = { ...report,
                done: false,
                latitude: report.latitude ?? 0,
                longitude: report.longitude ?? 0,
                accuracy: report.accuracy ?? 0
            };
            
            console.log('Adding report: ', crtReport);
            const imageUrl = await uploadImage(report.imageUrl!, report.id! + '.png');
            if (!imageUrl) {
                console.error('Error uploading image');
                return;
            } else {
                crtReport.imageUrl = imageUrl;
            }

            delete crtReport.id; // remove id from object
            const docRef = await addDoc(collection(FIRESTORE_DB, 'reports'), crtReport);
            console.log('Report added with ID: ', docRef.id);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const openAddReport = () => {
        setModalVisible(true);
    };

    const closeAddReport = () => {
        setModalVisible(false);
    };

    const renderReport = ({ item }: any) => {
        const ref = doc(FIRESTORE_DB, `reports/${item.id}`);
    
        const showDetails = async () => {
            navigation.navigate('Details', {id: item.id})
        };
    
        const deleteItem = async () => {
            deleteDoc(ref);
        };
    
        return (
            <View style={styles.reportsContainer}>
                <TouchableOpacity onPress={showDetails} style={styles.report}>
                    <Text style={styles.reportText}>{item.title}</Text>
                </TouchableOpacity>
                <Ionicons name="trash-bin-outline" size={24} color="red" onPress={deleteItem} />
            </View>
        );
    };
    
    return (
        <View style={styles.container}>
            {reports.length > 0 && (
                <View>
                    <FlatList
                        data={reports}
                        renderItem={renderReport}
                        keyExtractor={(report) => report.id!}
                    />
                </View>
            )}
        </View>
    );
};

export default HomeScreen;
```
Now include the `EditReport` in the `HomeScreen`. Add the below code just above the list of reports.
```tsx
            <EditReport isModalVisible={isModalVisible} close={closeAddReport} addSaveLabel="Add Report" addSaveReport={addReport} />
            <Button onPress={openAddReport} title="Add Report" />
```

#### Next we need to define the DetailsScreen
So let's implement the `DetailsScreen`:
```tsx
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { DetailsScreenProps } from "../../screen-params";
import { EMPTY_REPORT, SmartReport } from "../models/smart-report";
import { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import EditReport from "../components/EditReport";
import { uploadImage } from "../services/firebaseUtils";

const DetailsScreen = ({navigation, route}: DetailsScreenProps) => {
    const [report, setReport] = useState<SmartReport>(EMPTY_REPORT);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const reportDocRef = doc(FIRESTORE_DB, `reports/${route.params.id}`);
    
        const subscriber = onSnapshot(reportDocRef, {
            next: (snapshot) => {
                setReport({id: snapshot.id, ...snapshot.data()} as SmartReport);
            }
        });
    
        // // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, [route.params.id]);

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button onPress={openEditReport} title="Edit" />
          ),
        });
    }, [navigation]);

    const updateReport = async (report: SmartReport) => {
        if (report.imageUrl.startsWith('data:')) {
            const imageUrl = await uploadImage(report.imageUrl!, report.id! + '.png');
            if (!imageUrl) {
                console.error('Error uploading image');
                return;
            } else {
                report.imageUrl = imageUrl;
            }
        }
        console.log('Updating report: ', report.id);
        const reportDocRef = doc(FIRESTORE_DB, `reports/${report.id}`);
        updateDoc(reportDocRef, { title: report.title, 
            text: report.text, imageUrl: report.imageUrl });
    };

    const openEditReport = () => {
        setModalVisible(true);
    };

    const closeEditReport = () => {
        setModalVisible(false);
    };

    return (
        <View>
            <Text>Details Screen</Text>
            <Text>ID: {route.params.id}</Text>
            <Text>Title: {report.title}</Text>
            <Text>Text: {report.text}</Text>
            <Image source={{ uri: report.imageUrl }} style={localStyles.image} />
        </View>
    );
};

const localStyles = StyleSheet.create({
    image: {
      width: 200,
      height: 200,
    },
});
  
export default DetailsScreen;
```
TODO: As for the `HomeScreen` please include the `EditReport` component to use it to edit the current report.

#### Let's add access to the GPS
The only place we will need access to the GPS is where we define/edit our SmartReport, so in `EditReport`.
So here we need to import the `Location` service from `expo-location`:
```tsx
// Other imports
import * as Location from 'expo-location';
```

Next we need to extend our state with some variables:
```tsx
const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
const [location, setLocation] = useState<Location.LocationObject | null>(null);
```

Then we need to update the `permissionFunction` to also check for GPS permission. So add the following code at the end of this function:
```tsx
    const locationPermission = await Location.requestForegroundPermissionsAsync();
    setLocationPermission(locationPermission.granted);
    if (!locationPermission.granted) {
      alert('Permission for location access needed.');
    }
```

Next let's define a function to retrieve the current GPS location:
```tsx
  const getLocation = async () => {
    if (locationPermission) {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } else {
      setLocation(null);
    }
  };
```

Now we can use this function before saving the SmartReport to initialize the location related fields. So replace the code for the `saveReport` function with the following one:
```tsx
  const saveReport = async () => {
    await getLocation();
    report.imageUrl = imageUri??'';
    report.accuracy = location?.coords.accuracy??0;
    report.latitude = location?.coords.latitude??0;
    report.longitude = location?.coords.longitude??0;
    props.addSaveReport(report);
    setReport(EMPTY_REPORT);
    setImageUri(undefined);
    props.close();
  };
```
### Test the application.
If you do not see the updated application, please restart the expo server by pressing `Ctrl+C` and start again on the **terminal** that runs the server:
```shell
Ctrl+C

npx expo start
```

### Build and run on a platform

#### Android
```shell
npm run android
```
#### iOS
```shell
npm run ios
```
### Don't forget
**Don't forget to `push` your modifications to `github`!!!**
