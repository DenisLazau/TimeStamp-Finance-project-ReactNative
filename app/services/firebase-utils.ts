import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig";
import { collection } from "firebase/firestore";
import { FIREBASE_STORAGE } from "../../FirebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

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