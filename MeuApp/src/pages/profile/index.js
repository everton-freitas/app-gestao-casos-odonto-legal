import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

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
