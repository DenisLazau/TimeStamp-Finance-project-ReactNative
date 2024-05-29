import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { auth, db, storage } from '../../FirebaseConfig';

export const login = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User logged in: ", user);
        return user;
    } catch (error) {
        console.error('Login error: ', (error as Error).message);
        throw error;
    }
};

export const signup = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user);
        return user;
    } catch (error) {
        console.error('Signup error: ', (error as Error).message);
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
    return signOut(auth);
}

export const uploadImage = async (uri: string, imageName: string) => {
    const user = auth.currentUser;
    const path = `uploads/${user!.uid}/${imageName}`;
    const storageRef = ref(storage, path);
    try {
        console.log('Uploading image: ', uri);
        // Upload image to Firebase Storage
        await uploadString(storageRef, uri, 'data_url');
        const imageUrl = await getDownloadURL(storageRef);
        console.log('Image uploaded: ', imageUrl);
        return imageUrl;
    } catch (error) {
        console.error('Error uploading image: ', (error as Error).message);
        return null;
    }
}
