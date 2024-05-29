import { View, Text, StyleSheet, Image, Button } from "react-native";
import { EMPTY_REPORT, SmartReport } from "../models/smart-report";
import { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import EditReport from "../components/EditReport";
import { DetailsScreenProps } from "../navigation/navigationTypes";
import { uploadImage } from "../services/firebase-utils";

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