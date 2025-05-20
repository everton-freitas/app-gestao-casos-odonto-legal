import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'https://sistema-odonto-legal.onrender.com/api/login';

export default function Login() {
	const [open, setOpen] = useState(false);
	const [role, setRole] = useState('');
	const [items, setItems] = useState([
		{ label: 'Admin', value: 'admin' },
		{ label: 'Perito', value: 'perito' },
		{ label: 'Assistente', value: 'assistente' },
	]);
	const [cpf, setCpf] = useState('');
	const [password, setPassword] = useState('');
	const navigation = useNavigation();

	async function handleLogin() {
		if (!role || !cpf || !password) {
			Alert.alert('Erro!', 'Preencha todos os campos!');
			return;
		}

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
			navigation.navigate('Inicio');
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
				<Text style={styles.text}>Entre para iniciar sua sessão</Text>
				<View>
					<DropDownPicker
						style={styles.input}
                        dropDownContainerStyle={styles.dropDownContainer}
						open={open}
						value={role}
						items={items}
						setOpen={setOpen}
						setValue={setRole}
						setItems={setItems}
						placeholder="Selecione o usuário"
					/>
				</View>
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
