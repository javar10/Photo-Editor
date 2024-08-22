import { StyleSheet, Text, ImageBackground } from "react-native"

const SelectedImage = ({ imgUri, setImgUri, cameraRoll, setCameraRoll, cameraRollArray, setCameraRollArray }) => {
  
  const deleteImage = async () => {
    const index = cameraRollArray.indexOf(imgUri);
    console.log('index: ', index);

    if (index !== -1) {
      const newCameraRoll = [
        ...cameraRoll.slice(0, index),
        ...cameraRoll.slice(index + 1)
      ];
      setCameraRoll(newCameraRoll);
      setImgUri(null)

      console.log('deleted')
    }
  }
  
  return (
    <ImageBackground
      source={{ uri: imgUri }}
      style={styles.container}
    >
      <Text
        style={styles.text}
        onPress={() => setImgUri(null)}
      >
        View Gallery
      </Text>
      <Text
        style={styles.text}
        onPress={() => deleteImage()}
      >
        Delete
      </Text>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    padding: 50,
    color: 'white'
  },
})

export default SelectedImage