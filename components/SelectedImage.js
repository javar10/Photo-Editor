import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from "react-native"

const SelectedImage = ({ imgUri, setImgUri, cameraRoll, setCameraRoll }) => {
  const deleteImage = () => {
    const index = cameraRoll.indexOf(imgUri);
    const newCameraRoll = cameraRoll.splice(index, 1);
    setCameraRoll(cameraRoll);
    setImgUri(null)
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