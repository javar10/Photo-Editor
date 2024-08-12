import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from "react-native";

const CameraPreview = ({ image, retakePicture, savePicture }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: image }}
                style={styles.image}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={retakePicture}>
                        <Text style={styles.text}>Retake Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={savePicture}>
                        <Text style={styles.text}>Save Picture</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
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
        backgroundColor: 'transparent'
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default CameraPreview;