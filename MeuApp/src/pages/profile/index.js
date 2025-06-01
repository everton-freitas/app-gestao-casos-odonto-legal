import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
			<TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
				<Icon name="logout" style={styles.logoutIcon} />
				<Text style={styles.logoutText}>Sair da conta</Text>
			</TouchableOpacity>
		</View>
	);
}
