import React, { useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { login } from "../services/firebase-utils"; // Assuming you have a login function in firebaseUtils
import styles from "../cssStyles/styles";
import colors from "../cssStyles/color";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation : NavigationProp<ParamListBase>=useNavigation();

    const handleLogin = async () => {
        setLoading(true);
        try {
            await login(email, password); // Assuming login function returns user data upon successful login
            // Navigate to the Home or Dashboard screen upon successful login
            navigation.navigate("Home"); // Change "Home" to your desired screen name
        } catch (error: any) {
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                alert("Invalid email or password.");
            } else {
                alert('Login error: ' + error.message);
            }
        }
        setLoading(false);
    };

    const handleRegister = () => {
        navigation.navigate("Register");
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image source={require("../../assets/icon.png")} style={styles.image}/>
                    <Text style={styles.title}>Login</Text>

                    <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry autoCapitalize="none" value={password} onChangeText={setPassword} />

                    {loading ? 
                        <ActivityIndicator size="large" color={colors.primary} /> :
                        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin} >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={handleRegister} >
                        <Text style={styles.loginText}>Don't have an account? Register here.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default LoginScreen;
