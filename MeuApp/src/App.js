import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Routes from './routes';
import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { ActivityIndicator } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
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
