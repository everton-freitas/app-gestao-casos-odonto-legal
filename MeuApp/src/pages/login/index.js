import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	Image,
	StyleSheet,
	TouchableOpacity,
	Alert,
	Picker,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'https://sistema-odonto-legal.onrender.com/api/login';

export default function Login() {
	const [role, setRole] = useState('');
	const [cpf, setCpf] = useState('');
	const [password, setPassword] = useState('');
	const navigation = useNavigation();

	async function handleLogin() {
		if (!role || !cpf || !password) {
			Alert.alert('Erro!', 'Preencha todos os campos!');
			return;
		}

		// Exibe um alerta simples de carregando (opcional)
		Alert.alert('Entrando...', 'Verificando credenciais.');

		try {
			const response = await axios.post(API_URL, {
				cpf,
				password,
				role: role.toUpperCase(),
			});
			const token = response.data.token;
			await AsyncStorage.setItem('token', token);
			await AsyncStorage.setItem('role', role.toUpperCase());
			Alert.alert('Sucesso!', 'Login bem-sucedido!');
			navigation.navigate('Inicio'); // Ajuste o nome da tela conforme sua stack
		} catch (error) {
			Alert.alert(
				'Erro!',
				'Erro ao fazer login. Verifique suas credenciais.'
			);
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Image
					source={require('../../assets/logo.png')}
					style={styles.logo}
				/>
				<Text style={styles.title}>Entre para iniciar sua sessão</Text>
				<Picker
					selectedValue={role}
					style={styles.input}
					onValueChange={itemValue => setRole(itemValue)}
				>
					<Picker.Item label="Selecione o usuário" value="" />
					<Picker.Item label="Admin" value="admin" />
					<Picker.Item label="Perito" value="perito" />
					<Picker.Item label="Assistente" value="assistente" />
				</Picker>
				<TextInput
					style={styles.input}
					placeholder="CPF"
					value={cpf}
					onChangeText={setCpf}
					keyboardType="numeric"
				/>
				<TextInput
					style={styles.input}
					placeholder="Senha"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>
				<TouchableOpacity style={styles.button} onPress={handleLogin}>
					<Text style={styles.buttonText}>Entrar</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate('NovaSenha')}
				>
					<Text style={styles.link}>Esqueceu a senha?</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f6fa',
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		width: '90%',
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 24,
		alignItems: 'center',
		elevation: 4,
	},
	logo: {
		width: 120,
		height: 120,
		marginBottom: 16,
		resizeMode: 'contain',
	},
	title: {
		fontSize: 16,
		marginBottom: 16,
		color: '#333',
	},
	input: {
		width: '100%',
		height: 44,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 6,
		marginBottom: 12,
		paddingHorizontal: 10,
		backgroundColor: '#f9f9f9',
	},
	button: {
		width: '100%',
		backgroundColor: '#007bff',
		padding: 12,
		borderRadius: 6,
		alignItems: 'center',
		marginTop: 8,
		marginBottom: 8,
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
	link: {
		color: '#007bff',
		marginTop: 8,
		textDecorationLine: 'underline',
	},
});
