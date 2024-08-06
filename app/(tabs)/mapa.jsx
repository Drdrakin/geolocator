import {useState, useEffect, useRef} from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

export default function mapa() {
    const [location, setLocation] = useState(null);
    const mapRef = useRef(null);

    async function requestLocationPermissions() {
        const {granted} = await Location.requestForegroundPermissionsAsync();
        if(granted){
            const currentPosition = await Location.getCurrentPositionAsync();
            setLocation(currentPosition);
            console.log("Localização atual: ", currentPosition);
        } else {
            console.log("Ferrou")
        }
        
    }

    useEffect(() =>{
        requestLocationPermissions();
    }, []
    )

    return (
        <View style={styles.container}>
            {location && (
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="Localização Atual"
                    />
                </MapView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

