import { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle} from 'react-native-reanimated';

const EmojiSticker = ({ stickerSource }) => {
    console.log(stickerSource);
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = savedScale.value * e.scale;
        })
        .onEnd(() => {
            savedScale.value = scale.value;
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{scale: scale.value}],
    }));

    return (
        <GestureDetector gesture={pinchGesture}>
            <Animated.View style={[styles.container, animatedStyle]}>
                <Text style={styles.sticker}>{stickerSource}</Text>
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: '50%',
        left: '50%',
    },
    sticker: {
        fontSize: 75,
    }
})
export default EmojiSticker;
