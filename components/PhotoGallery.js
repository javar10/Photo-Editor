import { FlatList, Image } from "react-native"

const PhotoGallery = ({ cameraRoll }) => {
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
        />
    )
}

export default PhotoGallery;