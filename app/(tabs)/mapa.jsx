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
            console.log("Localização Negada");
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
                    //Puxa a localização
                    ref={mapRef}
                    //Incrivelmente a propriedade styles é necessária para carregar o mapa na view
                    style={styles.map}
                    //A região Inicial do mapa é traga por essas duas propriedades, que puxam de location
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.04,
                    }}
                >   
                    {/* Elemento puramente visual, apenas um marcador do google maps */}
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        //Texto do marcador
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

