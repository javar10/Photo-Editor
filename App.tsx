import {StatusBar} from 'expo-status-bar';
import { Camera, CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CameraPreview from './components/CameraPreview';
import PhotoGallery from './components/PhotoGallery';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [startCamera, setStartCamera] = useState(false); //probably don't need this
  const [image, setImage] = useState(null);
  const [cameraRoll, setCameraRoll] = useState([]);
  const camera = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  // This was setup as a way to grant permission, I'm not going to finish this part right now
  const __startCamera = () => {
    console.log('take picture pressed')
  }

  const takePicture = async () => {
    if(camera) {
      const photo = await camera.current.takePictureAsync();
      console.log(photo);
      setImage(photo.uri);
    }
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const retakePicture = () => {
    setImage(null)
  }

  const savePicture = () => {
    setCameraRoll([...cameraRoll, image]);
    console.log(cameraRoll);
    setImage(null)
  }

  return (
    <View style={styles.container}>
      <PhotoGallery cameraRoll={cameraRoll} />
      {!image ? (
      <CameraView style={styles.camera} facing={facing} ref={camera}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.text}>Take Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </CameraView>
      )
    : <CameraPreview image={image} retakePicture={retakePicture} savePicture={savePicture}/>
  }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
