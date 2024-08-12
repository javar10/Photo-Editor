import { FlatList, Image, Text, StyleSheet } from "react-native"

const PhotoGallery = ({ cameraRoll, setViewGallery }) => {
    const renderImageItem = ({item}) => {
        return (
            <Image 
                source={{ uri: item}}
                width={100}
                height={100}
            />
        )
    }
    
    return (
        <FlatList
            data={cameraRoll}
            renderItem={renderImageItem}
            keyExtractor={(item, index) => index.toString()}                
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