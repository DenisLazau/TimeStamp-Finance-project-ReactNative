import { View, Text, TouchableOpacity, FlatList, Button } from "react-native";
import styles from "../cssStyles/styles";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SmartReport } from "../models/smart-report";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import EditReport from "../components/EditReport";
import { logout, uploadImage } from "../services/firebase-utils";

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

    const navigation : NavigationProp<ParamListBase>=useNavigation();
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
      <>
         <EditReport isModalVisible={isModalVisible} close={closeAddReport} addSaveLabel="Add Report" addSaveReport={addReport} />
         <Button onPress={openAddReport} title="Add Report" />
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
      </>
    );
    
};

export default HomeScreen;