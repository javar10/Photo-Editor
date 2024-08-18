import { View, Text, StyleSheet } from 'react-native';

const EmojiSticker = ({ stickerSource }) => {
    console.log(stickerSource);
    return (
        <View style={styles.container}>
            <Text style={styles.sticker}>{stickerSource}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sticker: {
        margin: 'auto',
        fontSize: 140,
    }
})
export default EmojiSticker;
