import { useEffect, useState } from "react";
import { FlatList, Image, Text, StyleSheet, Dimensions, View, TouchableOpacity } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import SelectedImage from "./SelectedImage";

const PhotoGallery = ({ cameraRoll, setViewGallery }) => {
    const [numColumns, setNumColumns] = useState(4);
    const [imgSize, setImgSize] = useState(Dimensions.get('window').width / 4);
    const [orientation, setOrientation] = useState('portrait');
    const [imgUri, setImgUri] = useState(null);

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
            <TouchableOpacity onPress={() => setImgUri(item)}>
                <Image
                    source={{ uri: item }}
                    style={{ width: imgSize, height: imgSize }}
                />
            </TouchableOpacity>
        )
    }

    return (
        <>
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
            {imgUri && <SelectedImage imgUri={imgUri} setImgUri={setImgUri} />}
        </>

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