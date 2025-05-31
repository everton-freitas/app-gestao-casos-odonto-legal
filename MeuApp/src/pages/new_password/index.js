import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

export default function NewPassword() {
	const navigation = useNavigation();
	const [cpf, setCpf] = useState('');
	const [senha, setSenha] = useState('');
	const [confirmaSenha, setConfirmaSenha] = useState('');

	async function handleNewPassword() {
		if (senha !== confirmaSenha) {
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Erro',
				textBody: 'As senhas não coincidem!',
				button: 'OK',
			});
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

			Dialog.show({
				type: ALERT_TYPE.SUCCESS,
				title: 'Sucesso!',
				textBody:
					'Nova senha cadastrada com sucesso! Aguarde o seu novo acesso ser aprovado.',
				button: 'OK',
				onHide: () => navigation.navigate('Login'),
			});
		} catch (error) {
			const message =
				error.response?.data?.message ||
				'Erro ao cadastrar nova senha.';
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Erro',
				textBody: message,
				button: 'OK',
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
					<Text style={styles.text}>Cadastre sua nova senha</Text>
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
