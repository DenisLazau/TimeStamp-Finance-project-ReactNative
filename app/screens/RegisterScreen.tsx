import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../cssStyles/styles";
import colors from "../cssStyles/color";
import { useState } from "react";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { saveUserData, signup } from "../services/firebase-utils";

const RegisterScreen = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation : NavigationProp<ParamListBase>=useNavigation();

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
                    <Image source={require("../../assets/icon.png")} style={styles.image}/>
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