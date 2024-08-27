import {Camera, CameraType, CameraView, useCameraPermission } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, Stylesheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';

export default function App(){
    const [flipcam, setFlipcam] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermission();
    const cameraRef = useRef<CameraView>(null);
    const [foto, setFoto] = useState<string | null>(null);

    if(!permission) {
        return <View />
    }

    if(!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Preciso de permissão</Text>
                <Button onPress={requestPermission} title="Conceder Permissão"/>
            </View>
        )
        function trocarCamera(){
            setFlipcam(current => (current === 'back' ? 'front' : 'back'));
        }
        
        async function compartilharFoto(){
            if (!foto) {
                alert('Tira uma foto antes de compartilhar');
                return;
            }
            if (!(await Sharing.isAvailableAsync())) {
                alert('Uh oh, sharing isnt available on your plataform')
            }

            await Sharing.shareAsync(foto);
        }

        return (
            <View style={styles.container}>
                <CameraView style={styles.camera} ref={cameraRef} facing={flipcam}>
                    <View style={styles.rodape}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={trocarCamera}>
                                <Entypo name="cw" size={24} color="white"/>
                                <Text style={styles.text}>Flip Camera</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={async () => {
                                    if (cameraRef.current) {
                                        let photo = await cameraRef.current.takePictureAsync();
                                        console.log(photo.uri);
                                    }
                                }}
                            >
                                <Entypo name="camera" size={24} color="white"/>
                                <Text style={styles.text}>Tirar foto</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </CameraView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    container: {
        flex: 1
    }
  });
  