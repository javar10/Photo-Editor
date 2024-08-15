import { StatusBar } from 'expo-status-bar';
import { Camera, CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CameraPreview from './components/CameraPreview';
import PhotoGallery from './components/PhotoGallery';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState(null);
  const [cameraRoll, setCameraRoll] = useState(["file:///var/mobile/Containers/Data/Application/E1538440-0099-44D5-B980-E3CA1F9479CF/Library/Caches/ExponentExperienceData/@anonymous/photoeditor-e4b16595-deb5-466c-b7d4-9a325451cddb/Camera/9ABCB4EA-76CE-4154-88D2-C5F5EA0D2371.jpg", "file:///var/mobile/Containers/Data/Application/E1538440-0099-44D5-B980-E3CA1F9479CF/Library/Caches/ExponentExperienceData/@anonymous/photoeditor-e4b16595-deb5-466c-b7d4-9a325451cddb/Camera/0A53CB6C-266D-45B8-85C1-7027C37DFD80.jpg", "file:///var/mobile/Containers/Data/Application/E1538440-0099-44D5-B980-E3CA1F9479CF/Library/Caches/ExponentExperienceData/@anonymous/photoeditor-e4b16595-deb5-466c-b7d4-9a325451cddb/Camera/11B13F91-20F3-47B2-B7C4-4ECBB939CC42.jpg", "file:///var/mobile/Containers/Data/Application/E1538440-0099-44D5-B980-E3CA1F9479CF/Library/Caches/ExponentExperienceData/@anonymous/photoeditor-e4b16595-deb5-466c-b7d4-9a325451cddb/Camera/C59B83ED-1BB3-41BC-8A57-2FEF26621AC3.jpg", "file:///var/mobile/Containers/Data/Application/E1538440-0099-44D5-B980-E3CA1F9479CF/Library/Caches/ExponentExperienceData/@anonymous/photoeditor-e4b16595-deb5-466c-b7d4-9a325451cddb/Camera/109FF178-3222-4A36-84B7-978FB216BC7E.jpg", "file:///var/mobile/Containers/Data/Application/E1538440-0099-44D5-B980-E3CA1F9479CF/Library/Caches/ExponentExperienceData/@anonymous/photoeditor-e4b16595-deb5-466c-b7d4-9a325451cddb/Camera/D4073CB1-4D9A-476D-99A2-93E5AA3B5636.jpg", "file:///var/mobile/Containers/Data/Application/E1538440-0099-44D5-B980-E3CA1F9479CF/Library/Caches/ExponentExperienceData/@anonymous/photoeditor-e4b16595-deb5-466c-b7d4-9a325451cddb/Camera/DDC93372-1A2B-4375-8DDB-E103CA4B444A.jpg", "file:///var/mobile/Containers/Data/Application/E1538440-0099-44D5-B980-E3CA1F9479CF/Library/Caches/ExponentExperienceData/@anonymous/photoeditor-e4b16595-deb5-466c-b7d4-9a325451cddb/Camera/D4E8AE8D-0558-4423-97DB-9D0705C52AC1.jpg", "file:///var/mobile/Containers/Data/Application/E1538440-0099-44D5-B980-E3CA1F9479CF/Library/Caches/ExponentExperienceData/@anonymous/photoeditor-e4b16595-deb5-466c-b7d4-9a325451cddb/Camera/F9BD2462-78AA-45D7-9569-8E09D59259EC.jpg"])
  const [viewGallery, setViewGallery] = useState(false);
  const camera = useRef(null);

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

  const retakePicture = () => {
    setImage(null)
  }

  const savePicture = () => {
    setCameraRoll([...cameraRoll, image]);
    setImage(null)
  }

  return (
    <View style={styles.container}>
      {viewGallery ? (
        <PhotoGallery cameraRoll={cameraRoll} setCameraRoll={setCameraRoll} setViewGallery={setViewGallery} />
      )
        : !image ? (
          <CameraView style={styles.camera} facing={facing} ref={camera}>
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
          </CameraView>
        )
          : <CameraPreview image={image} retakePicture={retakePicture} savePicture={savePicture} />
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
