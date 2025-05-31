import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
	const navigation = useNavigation();

	async function handleLogout() {
		await AsyncStorage.removeItem('token');
		navigation.reset({
			index: 0,
			routes: [{ name: 'Login' }],
		});
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={handleLogout}>
				<Text style={styles.buttonText}>Sair da conta</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	button: {
		backgroundColor: '#1E88E5',
		padding: 16,
		borderRadius: 8,
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
});
