import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Routes from './Routes';
import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { ActivityIndicator } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); // Impede que a splash suma automaticamente

export default function App() {


    useEffect(() => {
    async function prepare() {
      // Simula carregamento de dados
      await new Promise(resolve => setTimeout(resolve, 20000));

      await SplashScreen.hideAsync(); // Esconde a splash depois de carregar
    }

    prepare();
  }, []);


    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
    });

	if (!fontsLoaded) {
		return <ActivityIndicator size="large" style={{ flex: 1 }} />;
	}

	return (
		<PaperProvider>
			<StatusBar style="auto" />
			<Routes />
		</PaperProvider>
	);
}
