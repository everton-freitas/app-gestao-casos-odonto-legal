import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'https://sistema-odonto-legal.onrender.com/api/profile';

export default function CustomHeader({ title, showLogo }) {
	const navigation = useNavigation();
	const [user, setUser] = useState({ name: '', role: '' });
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchUser() {
			try {
				const token = await AsyncStorage.getItem('token');
				if (!token) throw new Error('Token não encontrado');
				const response = await axios.get(API_URL, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setUser({ name: response.data.name, role: response.data.role });
				setLoading(false);
			} catch (error) {
				setLoading(false);
				navigation.navigate('Login');
			}
		}
		fetchUser();
	}, []);

	if (loading) {
		return (
			<View
				style={[
					styles.header,
					{ justifyContent: 'center', alignItems: 'center' },
				]}
			>
				<ActivityIndicator size="small" color="#1E88E5" />
			</View>
		);
	}

	return (
		<View style={styles.header}>
			{showLogo ? (
				<View style={styles.logoTitleContainer}>
					<Image
						source={require('../assets/logo.png')}
						style={styles.logo}
						resizeMode="contain"
					/>
					<Text style={styles.title}>Dentalysis</Text>
				</View>
			) : (
				<View style={styles.logoTitleContainer}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={styles.backButton}
					>
						<Icon name="arrow-left" style={styles.arrow} />
					</TouchableOpacity>
					<Text style={styles.title}>{title}</Text>
				</View>
			)}
			<View style={styles.userBox}>
				<Icon name="bell-outline" style={styles.userIcon} />
				<View>
					<Text style={styles.userName}>{user.name}</Text>
					<Text style={styles.userRole}>{user.role}</Text>
				</View>
				<TouchableOpacity
					onPress={() => navigation.navigate('Profile')}
				>
					<Icon name="chevron-right" style={styles.userIcon} />
				</TouchableOpacity>
			</View>
		</View>
	);
}
