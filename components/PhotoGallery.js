import { FlatList, Image, Text, StyleSheet, Dimensions } from "react-native"

const PhotoGallery = ({ cameraRoll, setViewGallery }) => {
    const renderImageItem = ({item}) => {
        const imgSize = Dimensions.get('window').width / 4
        return (
            <Image 
                source={{ uri: item}}
                width={imgSize}
                height={imgSize}
            />
        )
    }
    
    return (
        <FlatList
            data={cameraRoll}
            renderItem={renderImageItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}               
            ListHeaderComponent={
                <>
                    <Text 
                    style={styles.x}
                    onPress={() => setViewGallery(false)}>X</Text>
                </>
            }
        />
    )
}

const styles = StyleSheet.create({
    x: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        padding: 50
    }
})

export default PhotoGallery;