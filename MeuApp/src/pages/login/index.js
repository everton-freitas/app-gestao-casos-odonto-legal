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
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();

	async function handleLogin() {
		if (!role || !cpf || !password) {
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Erro!',
				textBody: 'Preencha todos os campos!',
				button: 'OK',
			});
			return;
		}

		setLoading(true);
		Toast.show({
			type: ALERT_TYPE.INFO,
			title: 'Entrando...',
			textBody: 'Verificando credenciais.',
		});

		try {
			const response = await axios.post(API_URL, {
				cpf,
				password,
				role: role.toUpperCase(),
			});
			Toast.hide();
			const token = response.data.token;
			await AsyncStorage.setItem('token', token);
			Dialog.show({
				type: ALERT_TYPE.SUCCESS,
				title: 'Sucesso!',
				textBody: 'Login bem-sucedido!',
				button: 'OK',
				onHide: () => navigation.navigate('Home'),
			});
		} catch (error) {
			Toast.hide();
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Erro!',
				textBody: 'Erro ao fazer login. Verifique suas credenciais.',
				button: 'OK',
			});
		} finally {
			setLoading(false);
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
							disabled={loading}
						/>
					</View>
					<TextInput
						style={styles.input}
						placeholder="CPF"
						value={cpf}
						onChangeText={setCpf}
						keyboardType="numeric"
						editable={!loading}
					/>
					<TextInput
						style={styles.input}
						placeholder="Senha"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
						editable={!loading}
					/>
					<TouchableOpacity
						style={[styles.button, loading && { opacity: 0.6 }]}
						onPress={handleLogin}
						disabled={loading}
					>
						<Text style={styles.buttonText}>Entrar</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate('NewPassword')}
						style={{ marginTop: 0 }}
						disabled={loading}
					>
						<Text style={styles.link}>Esqueceu a senha?</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}
