import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	Image,
	TouchableOpacity,
	Alert,
	Picker,
} from 'react-native';
import styles from './styles';
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