import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const API_URL = 'https://sistema-odonto-legal.onrender.com/api/profile';

export default function CustomHeader({ title, showLogo }) {
	const navigation = useNavigation();
	const [user, setUser] = useState({ name: '', role: '' }); 

	useEffect(() => {
		async function fetchUser() {
			try {
				const token = await AsyncStorage.getItem('token');
				const response = await axios.get(API_URL, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setUser({ name: response.data.name, role: response.data.role });
			} catch {
				setUser({ name: '', role: '' });
			}
		}
		fetchUser();
	}, []);

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
						<Icon
							name="arrow-left"
							size={28}
							style={styles.arrow}
						/>
					</TouchableOpacity>
					<Text style={styles.title}>{title}</Text>
				</View>
			)}
			<View style={styles.userBox}>
				<Icon
					name="bell-outline"
					size={28}
					color="#fff"
					style={styles.userIcon}
				/>
				<View style={styles.userInfo}>
					<Text style={styles.userName}>{user.name}</Text>
					<Text style={styles.userRole}>{user.role}</Text>
				</View>
				<TouchableOpacity
					onPress={() => navigation.navigate('Profile')}
				>
					<Icon name="chevron-right" size={28} color="#fff" />
				</TouchableOpacity>
			</View>
		</View>
	);
}
