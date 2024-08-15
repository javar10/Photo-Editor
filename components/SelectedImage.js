import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from "react-native"

const SelectedImage = ({ imgUri, setImgUri }) => {
  return (
    <ImageBackground
      source={{ uri: imgUri }}
      style={styles.container}
    >
      <Text
        style={styles.x}
        onPress={() => setImgUri(null)}>
        X
      </Text>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  x: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    padding: 50,
  },
})

export default SelectedImage