import React, {useEffect, useState} from 'react';
import {FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Camera} from 'expo-camera';
import {Ionicons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ListeUtilisateursScreen from './ListeUtilisateursScreen';
import {useNavigation} from "@react-navigation/native";

const CameraScreen = () => {
    const navigation = useNavigation();

    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showDeleteOption, setShowDeleteOption] = useState(false);
    const [showSendOption, setShowSendOption] = useState(false);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [showDurationModal, setShowDurationModal] = useState(false);
    const [selectedDuration, setSelectedDuration] = useState(1);

    useEffect(() => {
        (async () => {
            await requestCameraPermission();
            await requestGalleryPermission();
        })();
    }, []);

    const requestCameraPermission = async () => {
        const {status} = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    const requestGalleryPermission = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const photo = await cameraRef.takePictureAsync();
                console.log(photo);
                setCapturedPhoto(photo);
                setSelectedImage(null);
                setShowDeleteOption(true);
                setShowSendOption(true);
            } catch (error) {
                console.error('Error capturing photo:', error);
                // Afficher un message d'erreur à l'utilisateur
            }
        }
    };

    const deletePhoto = () => {
        setCapturedPhoto(null);
        setSelectedImage(null);
        setShowDeleteOption(false);
        setShowSendOption(false);
    };

    const handleSend = (selectedUser) => {
        console.log('Photo envoyée à l\'utilisateur sélectionné:', selectedUser);
        setShowSendOption(false);
    };

    const toggleFlash = () => {
        setFlashMode(prevMode =>
            prevMode === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off
        );
    };

    const toggleCameraType = () => {
        setCameraType(prevType =>
            prevType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    const openDurationModal = () => {
        setShowDurationModal(true);
    };

    const closeDurationModal = () => {
        setShowDurationModal(false);
    };

    const selectDuration = (duration) => {
        setSelectedDuration(duration);
        closeDurationModal();
    };

    const renderDurationButton = (duration) => {
        return (
            <TouchableOpacity
                style={[styles.durationButton, selectedDuration === duration && styles.activeDurationButton]}
                onPress={() => selectDuration(duration)}
            >
                <Text style={[styles.durationText, selectedDuration === duration && styles.activeDurationText]}>
                    {duration === -1 ? '∞' : `${duration}s`}
                </Text>
            </TouchableOpacity>
        );
    };

    const openDiscussion = () => {
        navigation.navigate('Discussion');
    };

    const chooseFromGallery = async () => {
        try {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status === 'granted') {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
                if (!result.cancelled) {
                    setSelectedImage(result.uri);
                    setShowDeleteOption(true);
                    setShowSendOption(true);
                }
            } else {
                console.log('Permission denied');
            }
        } catch (error) {
            console.log('Error selecting image:', error);
        }
    };

    if (hasPermission === null) {
        return <View/>;
    }

    if (hasPermission === false) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>L'accès à la caméra est refusé.</Text>
                <TouchableOpacity style={styles.permissionButton} onPress={requestCameraPermission}>
                    <Text style={styles.permissionButtonText}>Autoriser l'accès à la caméra</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Ionicons name="settings-outline" size={24} color="#fff"/>
                </TouchableOpacity>
            </View>
            {capturedPhoto || selectedImage ? (
                <View style={styles.photoContainer}>
                    <Image source={{uri: capturedPhoto?.uri || selectedImage}} style={styles.photo}/>
                    {showDeleteOption && (
                        <TouchableOpacity style={styles.deleteButton} onPress={deletePhoto}>
                            <Ionicons name="trash-outline" size={24} color="#fff"/>
                        </TouchableOpacity>
                    )}
                    {showSendOption && (
                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={() => {
                                navigation.navigate('Liste', {photo: capturedPhoto || selectedImage});
                            }}
                        >
                            <Ionicons name="send-outline" size={24} color="#fff"/>
                        </TouchableOpacity>
                    )}
                    {showSendOption && <ListeUtilisateursScreen onSend={handleSend}/>}
                </View>
            ) : (
                <View style={styles.cameraContainer}>
                    <Camera style={styles.camera} ref={ref => setCameraRef(ref)} type={cameraType}
                            flashMode={flashMode}/>
                    <View style={styles.captureContainer}>
                        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                            <Ionicons name="camera-outline" size={40} color="#fff"/>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
                    <Ionicons
                        name={flashMode === Camera.Constants.FlashMode.off ? "flash-off-outline" : "flash-outline"}
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraTypeButton} onPress={toggleCameraType}>
                    <Ionicons name="camera-reverse-outline" size={24} color="#fff"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.galleryButton} onPress={chooseFromGallery}>
                    <Ionicons name="images-outline" size={24} color="#fff"/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.durationButtonContainer} onPress={openDurationModal}>
                <Ionicons name="time-outline" size={24} color="#fff"/>
                <Text style={styles.durationButtonText}>{selectedDuration === -1 ? '∞' : `${selectedDuration}s`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.discussionButton} onPress={openDiscussion}>
                <Ionicons name="chatbubble-outline" size={24} color="black"/>
            </TouchableOpacity>
            <Modal visible={showDurationModal} animationType="slide">
                <View style={styles.durationModalContainer}>
                    <Text style={styles.durationModalTitle}>Choisir la durée de visibilité</Text>
                    <FlatList
                        data={[...Array(10).keys()].map(i => i + 1).concat(-1)}
                        keyExtractor={item => item.toString()}
                        renderItem={({item}) => renderDurationButton(item)}
                        numColumns={4}
                        columnWrapperStyle={styles.durationButtonColumn}
                    />
                    <TouchableOpacity style={styles.durationModalCancelButton} onPress={closeDurationModal}>
                        <Text style={styles.durationModalCancelButtonText}>Annuler</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    headerContainer: {
      position: 'absolute',
      top: 16,
      right: 16,
      zIndex: 1,
    },
    settingsButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    cameraContainer: {
      flex: 1,
      position: 'relative',
    },
    camera: {
      flex: 1,
    },
    captureContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      marginBottom: 16,
    },
    captureButton: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    photoContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    photo: {
      width: '100%',
      height: '100%',
    },
    deleteButton: {
      position: 'absolute',
      top: 16,
      left: 16,
      backgroundColor: 'red',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      opacity: 0.8,
    },
    sendButton: {
      position: 'absolute',
      bottom: 32,
      right: 16,
      backgroundColor: 'green',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      opacity: 0.8,
    },
    bottomContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    flashButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      position: 'absolute',
      bottom: 450,
      right: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    cameraTypeButton: {
      position: 'absolute',
      bottom: 550,
      right: 16,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    galleryButton: {
      position: 'absolute',
      bottom: 500,
      right: 16,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    durationButtonContainer: {
      position: 'absolute',
      top: 120,
      left: 338,
      flexDirection: 'row',
      alignItems: 'center',
    },
    durationButtonText: {
      color: '#fff',
      marginLeft: 8,
    },
    discussionButton: {
      position: 'absolute',
      bottom: 30,
      right: 320,
      backgroundColor: '#fff',
      borderRadius: 50,
      padding: 12,
    },
    durationModalContainer: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    durationModalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      top: 250,
    },
    durationButtonColumn: {
      justifyContent: 'space-between',
    },
    durationButton: {
      margin: 8,
      padding: 8,
      borderWidth: 1,
      borderRadius: 8,
      top: 300,
    },
    activeDurationButton: {
      backgroundColor: '#000',
      borderColor: '#000',
    },
    durationText: {
      fontSize: 16,
      color: '#000',
    },
    activeDurationText: {
      color: '#fff',
    },
    durationModalCancelButton: {
      bottom: 200,
    },
    durationModalCancelButtonText: {
      fontSize: 18,
      color: 'red',
    },
    permissionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    permissionText: {
      fontSize: 16,
      marginBottom: 16,
    },
    permissionButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: '#007AFF',
    },
    permissionButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  
  export default CameraScreen;