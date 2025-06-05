import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	ScrollView,
	Image,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './styles';

export default function LaudoForm() {
	const navigation = useNavigation();
	const route = useRoute();
	const { evidence, protocol } = route.params || {};

	const [conclusion, setConclusion] = useState('');
	const [technicalAnalysis, setTechnicalAnalysis] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		Dialog.show({
			type: ALERT_TYPE.WARNING,
			title: 'Confirmar geração do laudo?',
			textBody:
				'Você não poderá editar ou remover o laudo depois de salvo!',
			button: 'Cancelar',
			buttons: [
				{
					text: 'Sim, gerar laudo!',
					backgroundColor: '#1E88E5',
					onPress: async () => {
						setLoading(true);
						const token = await AsyncStorage.getItem('token');
						const data = {
							descriptionTechnical: technicalAnalysis,
							note: conclusion,
						};
						try {
							await axios.post(
								'https://sistema-odonto-legal.onrender.com/api/report/evidence',
								data,
								{
									headers: {
										Authorization: `Bearer ${token}`,
										'Content-Type': 'application/json',
									},
									params: {
										evidence: evidence._id,
									},
								}
							);
							Dialog.show({
								type: ALERT_TYPE.SUCCESS,
								title: 'Laudo salvo com sucesso!',
								autoClose: 1500,
							});
							setTimeout(() => {
								navigation.replace('CaseDetails', { protocol });
							}, 1500);
						} catch (error) {
							Dialog.show({
								type: ALERT_TYPE.DANGER,
								title: 'Erro ao salvar o laudo',
								textBody:
									error.response?.data?.message ||
									'Tente novamente mais tarde.',
								button: 'OK',
							});
						}
						setLoading(false);
					},
				},
			],
		});
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1, backgroundColor: '#F6F8FA' }}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.formContainer}>
					<Text style={styles.inputLabel}>Análise Técnica:*</Text>
					<TextInput
						style={styles.textarea}
						value={technicalAnalysis}
						onChangeText={setTechnicalAnalysis}
						multiline
						numberOfLines={4}
						placeholder="Digite a análise técnica"
						required
					/>
					<Text style={styles.inputLabel}>Conclusão do Laudo:*</Text>
					<TextInput
						style={styles.textarea}
						value={conclusion}
						onChangeText={setConclusion}
						multiline
						numberOfLines={4}
						placeholder="Digite a conclusão do laudo"
						required
					/>
					<TouchableOpacity
						style={styles.button}
						onPress={handleSubmit}
						disabled={loading || !technicalAnalysis || !conclusion}
					>
						<Text style={styles.buttonText}>
							{loading ? 'Salvando...' : 'Salvar laudo'}
						</Text>
					</TouchableOpacity>
				</View>
				{/* Depois os dados da evidência */}
				<View style={styles.evidenceInfo}>
					<Text style={styles.legend}>Dados da Evidência</Text>
					{evidence?.photo && (
						<View style={styles.imageWrapper}>
							<Image
								source={{ uri: evidence.photo }}
								style={styles.imagePreview}
								resizeMode="cover"
							/>
						</View>
					)}
					<Text style={styles.info}>
						<Text style={styles.label}>Título:</Text>{' '}
						{evidence?.title}
					</Text>
					<Text style={styles.info}>
						<Text style={styles.label}>
							Relatos/Depoimentos Testemunhais:
						</Text>{' '}
						{evidence?.testimony}
					</Text>
					<Text style={styles.info}>
						<Text style={styles.label}>Descrição Técnica:</Text>{' '}
						{evidence?.descriptionTechnical}
					</Text>
					<Text style={styles.info}>
						<Text style={styles.label}>Condição:</Text>{' '}
						{evidence?.condition}
					</Text>
					<Text style={styles.info}>
						<Text style={styles.label}>Categoria:</Text>{' '}
						{evidence?.category}
					</Text>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
