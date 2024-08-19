import { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

const EmojiSticker = ({ stickerSource }) => {
    console.log(stickerSource);
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const savedTranslationX = useSharedValue(0);
    const savedTranslationY = useSharedValue(0);
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = savedScale.value * e.scale;
        })
        .onEnd(() => {
            savedScale.value = scale.value;
        });


    const panGesture = Gesture.Pan()
        .onStart((e) => {
            startX.value = translationX.value;
            startY.value = translationY.value;
        })
        .onUpdate((e) => {
            translationX.value = startX.value + e.translationX / scale.value;
            translationY.value = startY.value + e.translationY /scale.value;
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { translateX: translationX.value },
            { translateY: translationY.value },
        ],
    }));

    const combinedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

    return (
        <GestureDetector gesture={combinedGesture}>
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
