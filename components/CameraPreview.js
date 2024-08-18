import { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';
import { captureRef } from 'react-native-view-shot';
import EmojiSticker from './EmojiSticker';

// const CameraPreview = ({ image, retakePicture, savePicture }) => {
    const CameraPreview = ({ image, setImage, cameraRoll, setCameraRoll }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const imageRef = useRef(); 


  const retakePicture = () => {
    setImage(null)
  }

  const savePicture = async () => {
    const imageToSave = await captureRef(imageRef)
    setCameraRoll([...cameraRoll, imageToSave]);
    setImage(null);
  }

    const handlePick = (emojiObject) => {
        console.log(emojiObject)
        setSelectedEmoji(emojiObject);
        /* example emojiObject = {
            "emoji": "❤️",
            "name": "red heart",
            "slug": "red_heart",
            "unicode_version": "0.6",
          }
        */
    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: image }}
                style={styles.image}
                ref={imageRef}
            >
                {selectedEmoji && <EmojiSticker stickerSource={selectedEmoji.emoji} />}

            </ImageBackground>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={retakePicture}>
                    <Text style={styles.text}>Retake Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={savePicture}>
                    <Text style={styles.text}>Save Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setIsOpen(true)}>
                    <Text style={styles.text}>😀</Text>
                </TouchableOpacity>
            </View>

            <EmojiPicker
                onEmojiSelected={handlePick}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                enableRecentlyUsed
            />
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
        flexDirection: 'row',
        backgroundColor: 'transparent',
        position: 'absolute',
        justifyContent: 'space-around',
        bottom: '5%',
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 10
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    stickers: {
        zIndex: 20,
    }
});

export default CameraPreview;