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
	ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './styles';
import { Alert } from 'react-native';

export default function LaudoForm() {
	const navigation = useNavigation();
	const route = useRoute();
	const { evidence, protocol } = route.params || {};

	const [conclusion, setConclusion] = useState('');
	const [technicalAnalysis, setTechnicalAnalysis] = useState('');
	const [loading, setLoading] = useState(false);
	const [loadingAI, setLoadingAI] = useState(false);

	const handleGenerateConclusion = async () => {
		setLoadingAI(true);
		const token = await AsyncStorage.getItem('token');
		try {
			const response = await axios.get(
				`https://sistema-odonto-legal.onrender.com/api/llm/generate/laudo`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					params: {
						evidence: evidence._id,
					},
				}
			);
			console.log(response.data);
			setConclusion(response.data);
			Dialog.show({
				type: ALERT_TYPE.SUCCESS,
				title: 'Conclusão gerada!',
				textBody: 'A conclusão foi preenchida com a sugestão da IA.',
				autoClose: 2000,
				button: 'OK',
			});
		} catch (error) {
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Erro ao gerar conclusão',
				textBody:
					error.response?.data?.message ||
					'Tente novamente mais tarde.',
				button: 'OK',
			});
		}
		setLoadingAI(false);
	};

	const handleSubmit = async () => {
		Alert.alert(
			'Confirmar geração do laudo?',
			'Você não poderá editar ou remover o laudo depois de salvo!',
			[
				{
					text: 'Cancelar',
					style: 'cancel',
					onPress: () => console.log('Cancelado!'),
				},
				{
					text: 'Sim!',
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
							navigation.replace('CaseDetails', { protocol });
						} catch (error) {
							Alert.alert(
								'Erro ao salvar o laudo',
								error.response?.data?.message ||
									'Tente novamente mais tarde.',
								[{ text: 'OK' }]
							);
						}
						setLoading(false);
					},
				},
			],
			{ cancelable: false }
		);
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
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Text style={styles.inputLabel}>
							Conclusão do Laudo:*
						</Text>
					</View>
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
						onPress={handleGenerateConclusion}
						disabled={loadingAI}
						style={styles.aiButton}
					>
						{loadingAI ? (
							<ActivityIndicator size="small" color="#fff" />
						) : (
							<Text style={styles.aiButtonText}>
								Gerar conclusão com IA ✨
							</Text>
						)}
					</TouchableOpacity>
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
				<View style={styles.formContainer}>
					<Text style={styles.legend}>Dados da Evidência</Text>
					<View style={styles.sectionDivider} />
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
