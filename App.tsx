import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CameraPreview from './components/CameraPreview';
import PhotoGallery from './components/PhotoGallery';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState(null);
  const [cameraRoll, setCameraRoll] = useState(null);
  const [viewGallery, setViewGallery] = useState(false);
  const camera = useRef(null);

  useEffect(() => {
      const fetchCameraRoll = async () => {
        try {
          const cameraRollString = await AsyncStorage.getItem('cameraRoll');
          const cameraRollArray = JSON.parse(cameraRollString);
          setCameraRoll(cameraRollArray ? cameraRollArray : []);
        } catch (err) {
          console.log('Error: ', err)
          Alert.alert('Error getting images. 😞')
        }
      }
      fetchCameraRoll();
  }, [])

  const listAllKeys = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log('async storage keys: ', keys)
    } catch (error) {
      console.error('Error listing keys:', error);
    }
  };

  // Call the function to list all keys
  listAllKeys();

  // const clearAsyncStorage = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log('AsyncStorage cleared!');
  //   } catch (error) {
  //     console.error('Error clearing AsyncStorage:', error);
  //   }
  // };

  // // Call the function to clear AsyncStorage
  // clearAsyncStorage();


  // useEffect(() => {
  //   console.log('cameraRoll from App.tsx: ', cameraRoll)
  // }, [cameraRoll]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.current.takePictureAsync();
      console.log(photo);
      setImage(photo.uri);
    }
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      {viewGallery
        ? (<PhotoGallery
          cameraRoll={cameraRoll}
          setCameraRoll={setCameraRoll}
          setViewGallery={setViewGallery}
        />
        )
        : (!image
          ? (<CameraView style={styles.camera} facing={facing} ref={camera}>
            <View style={styles.topButtonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => setViewGallery(true)}>
                <Text style={styles.text}>View Gallery</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={takePicture}>
                <Text style={styles.text}>Take Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>)
          : (<CameraPreview image={image} setImage={setImage} cameraRoll={cameraRoll} setCameraRoll={setCameraRoll} />)
        )
      }
    </GestureHandlerRootView>
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
  topButtonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
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
