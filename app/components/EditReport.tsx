import { View, Text, TextInput, Image, Modal, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { PermissionStatus } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import TakePicture from "../components/TakePicture";
import { EMPTY_REPORT, SmartReport } from "../models/smart-report";
import * as Location from 'expo-location';

const EditReport = (props: any) => {
  const [report, setReport] = useState<SmartReport>(EMPTY_REPORT);
  const [galleryPermission, setGalleryPermission] = useState<boolean | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const permisionFunction = async () => {
    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    setGalleryPermission(imagePermission.status === 'granted');

    if (
      imagePermission.status !== PermissionStatus.GRANTED
    ) {
      alert('Permission for media access needed.');
    }
    const locationPermission = await Location.requestForegroundPermissionsAsync();
    setLocationPermission(locationPermission.granted);
    if (!locationPermission.granted) {
      alert('Permission for location access needed.');
    }
  };
  const getLocation = async () => {
    if (locationPermission) {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } else {
      setLocation(null);
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