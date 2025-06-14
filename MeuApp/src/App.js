import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Routes from './routes';
import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { ActivityIndicator } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); 

export default function App() {


    useEffect(() => {
    async function prepare() {
      await new Promise(resolve => setTimeout(resolve, 2000));

      await SplashScreen.hideAsync(); 
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
