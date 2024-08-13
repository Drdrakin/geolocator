import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/banner.jpg')}
          style={styles.mapheader}
        />
      }>
        <ThemedText type="title" style={{marginLeft: 'auto', marginRight:'auto',paddingTop: 10, fontSize: 40}}>Aplicativo de Mapa</ThemedText>
        <ThemedText type="defaultSemiBold">Esse aplicativo consta com um mapa inclinado com possibilidade de visualização 3D das       construções locais
        </ThemedText>
        <ThemedText type="title" style={{marginLeft: 'auto', marginRight:'auto'}}>Roteamento</ThemedText>
        <ThemedText type="defaultSemiBold">Futuramente irá constar com roteamento com a google API
        </ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  mapheader: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
