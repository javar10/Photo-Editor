import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from "react-native";
import EmojiPicker from 'rn-emoji-keyboard';
import { useState } from "react";
import EmojiSticker from "./EmojiSticker";

const CameraPreview = ({ image, retakePicture, savePicture }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);

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
            >
                {selectedEmoji && <EmojiSticker stickerSource={selectedEmoji.emoji} />}
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
    stickers: {
        zIndex: 20,
    }
});

export default CameraPreview;