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