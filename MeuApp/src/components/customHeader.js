import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // ADICIONE ESTA LINHA
import styles from './styles';

export default function CustomHeader({ title, showLogo }) {
	const navigation = useNavigation();

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
						<Icon name="arrow-left" size={28} style={styles.arrow} />
					</TouchableOpacity>
					<Text style={styles.title}>{title}</Text>
				</View>
			)}
		</View>
	);
}
