import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function NewPassword() {
	const navigation = useNavigation();
	const [cpf, setCpf] = useState('');
	const [senha, setSenha] = useState('');
	const [confirmaSenha, setConfirmaSenha] = useState('');

	async function handleNewPassword() {
		if (senha !== confirmaSenha) {
			Alert.alert('Erro', 'As senhas não coincidem!');
			return;
		}

		try {
			await axios.post(
				'https://sistema-odonto-legal.onrender.com/api/alter/password',
				{
					cpf: cpf,
					password: senha,
				}
			);

			Alert.alert(
				'Sucesso!',
				'Nova senha cadastrada com sucesso! Aguarde o seu novo acesso ser aprovado.',
				[
					{
						text: 'OK',
						onPress: () => navigation.navigate('Login'),
					},
				]
			);
		} catch (error) {
			const message =
				error.response?.data?.message ||
				'Erro ao cadastrar nova senha.';
			Alert.alert('Erro', message);
		}
	}

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<View style={styles.container}>
				<View style={styles.card}>
					<Text style={styles.login}>Cadastre sua nova senha</Text>
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
						value={senha}
						onChangeText={setSenha}
						secureTextEntry
					/>
					<TextInput
						style={styles.input}
						placeholder="Confirme sua senha"
						value={confirmaSenha}
						onChangeText={setConfirmaSenha}
						secureTextEntry
					/>
					<TouchableOpacity
						style={styles.button}
						onPress={handleNewPassword}
					>
						<Text style={styles.buttonText}>
							Cadastrar nova senha
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}
