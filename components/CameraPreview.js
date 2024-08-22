import { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';
import { captureRef } from 'react-native-view-shot';
import EmojiSticker from './EmojiSticker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CameraPreview = ({ image, setImage, cameraRoll, setCameraRoll }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const imageRef = useRef();

    const retakePicture = () => {
        setImage(null)
    }

    const savePicture = async () => {
        const imageToSave = await captureRef(imageRef, {
            format: 'png',
            quality: 1,
            result: 'base64',
        })
        setCameraRoll([...cameraRoll, imageToSave]);
        setImage(null);
    }

    useEffect(() => {
        const updateCameraRoll = async () => {
            const cameraRollString = JSON.stringify(cameraRoll)
            try {
                await AsyncStorage.setItem('cameraRoll', cameraRollString);
            } catch (err) {
                console.log(err)
                Alert.alert('Image not saved. 😞')
            }
        }
        updateCameraRoll();
    }, [cameraRoll])

    const handlePick = (emojiObject) => {
        setSelectedEmoji(emojiObject);
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