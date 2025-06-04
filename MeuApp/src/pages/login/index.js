import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
	View,
	TextInput,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import styles from './styles';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showNotification } from '../../components/notification';

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
		console.log('Tentando login...');

		if (!role || !cpf || !password) {
			showNotification({
				type: 'DANGER',
				title: 'Erro!',
				message: 'Preencha todos os campos!',
				dialog: true,
			});
			return;
		}

		showNotification({
			type: 'INFO',
			title: 'Entrando...',
			message: 'Verificando credenciais.',
		});

		try {
			console.log({ cpf, password, role: role.toUpperCase() });
			const response = await axios.post(API_URL, {
				cpf,
				password,
				role: role.toUpperCase(),
			});
			console.log('Resposta:', response.data);
			const token = response.data.token;
			await AsyncStorage.setItem('token', token);
			await AsyncStorage.setItem('role', role.toUpperCase());

			showNotification({
				type: 'SUCCESS',
				title: 'Sucesso!',
				message: 'Login bem-sucedido!',
				dialog: true,
				onHide: () => navigation.navigate('Home'),
			});
		} catch (error) {
			console.error('Erro no login', error.response?.data || error);
			showNotification({
				type: 'DANGER',
				title: 'Erro!',
				message: 'Erro ao fazer login. Verifique suas credenciais.',
				dialog: true,
			});
		}
	}

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<View style={styles.container}>
				<View style={styles.card}>
					<Text style={styles.text}>
						Entre para iniciar sua sessão
					</Text>
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
					<TouchableOpacity
						style={styles.button}
						onPress={handleLogin}
					>
						<Text style={styles.buttonText}>Entrar</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate('NewPassword')}
						style={{ marginTop: 0 }}
					>
						<Text style={styles.link}>Esqueceu a senha?</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}