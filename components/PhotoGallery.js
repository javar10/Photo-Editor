import { useEffect, useState } from "react";
import { FlatList, Image, Text, StyleSheet, Dimensions, useWindowDimensions } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';

const PhotoGallery = ({ cameraRoll, setViewGallery }) => {
    const [numColumns, setNumColumns] = useState(4);
    const [imgSize, setImgSize] = useState(Dimensions.get('window').width / 4);
    const [orientation, setOrientation] = useState('portrait');

    useEffect(() => {
        const handleOrientationChange = async () => {
            const { width, height } = Dimensions.get('window');
            const currentOrientation = width > height ? 'landscape' : 'portrait';
            setOrientation(currentOrientation);
            if (currentOrientation === 'landscape') {
                setNumColumns(6);
            } else {
                setNumColumns(4);
            }
            setImgSize(width / numColumns);
        };

        const subscription = ScreenOrientation.addOrientationChangeListener(handleOrientationChange);
        handleOrientationChange();

        return () => {
            ScreenOrientation.removeOrientationChangeListener(subscription);
        };
    
    }, [numColumns]);

    const renderImageItem = ({ item }) => {
        return (
            <Image
                source={{ uri: item }}
                style={{ width: imgSize, height: imgSize }}
            />
        )
    }

    return (
        <FlatList
            data={cameraRoll}
            renderItem={renderImageItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
            key={`${numColumns}-${imgSize}`}
            ListHeaderComponent={
                <Text
                    style={styles.x}
                    onPress={() => setViewGallery(false)}>
                    X
                </Text>
            }
            extraData={imgSize}
        />
    )
}

const styles = StyleSheet.create({
    x: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        padding: 50
    },
})

export default PhotoGallery;