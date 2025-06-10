import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Alert,
	Image,
	ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './styles';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

function formatDate(dateString) {
	if (!dateString) return 'N/A';
	const date = new Date(dateString);
	return date.toLocaleString('pt-BR');
}

function getOrNA(value) {
	return value ? value : 'N/A';
}

export default function CaseReportForm() {
	const navigation = useNavigation();
	const route = useRoute();
	const caseData = route.params?.caseDetails || {};
	const [description, setDescription] = useState('');
	const [conclusion, setConclusion] = useState('');
	const numQuestions = caseData.questions?.length || 0;
	const [answers, setAnswers] = useState(Array(numQuestions).fill(''));
	const [status, setStatus] = useState('');
	const [loadingAI, setLoadingAI] = useState(false);
	const handleGenerateConclusion = async () => {
		setLoadingAI(true);
		const token = await AsyncStorage.getItem('token');
		try {
			const response = await axios.get(
				`https://sistema-odonto-legal.onrender.com/api/llm/generate/case`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					params: {
						case: caseData.protocol,
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

	useEffect(() => {
		if (!caseData || !caseData.id) {
			Alert.alert('Erro', 'Dados do caso não encontrados!', [
				{ text: 'OK', onPress: () => navigation.goBack() },
			]);
		}
	}, [caseData, navigation]);

	const handleAnswerChange = (index, value) => {
		const updatedAnswers = [...answers];
		updatedAnswers[index] = value;
		setAnswers(updatedAnswers);
	};

	const handleSubmit = async () => {
		if (!description || !conclusion || answers.some(a => !a) || !status) {
			Alert.alert('Aviso', 'Preencha todos os campos obrigatórios!');
			return;
		}
		const token = await AsyncStorage.getItem('token');
		try {
			await axios.post(
				'https://sistema-odonto-legal.onrender.com/api/case/report/case',
				{
					description,
					conclusion,
					answers: answers.map(answer => ({ answer })),
				},
				{
					headers: { Authorization: `Bearer ${token}` },
					params: { case: caseData.id },
				}
			);
			await axios.patch(
				'https://sistema-odonto-legal.onrender.com/api/cases/edit/status/protocol',
				{ status },
				{
					headers: { Authorization: `Bearer ${token}` },
					params: { protocol: caseData.protocol },
				}
			);
			Alert.alert('Sucesso', 'Relatório salvo com sucesso!');
			setTimeout(() => {
				navigation.navigate('CaseDetails', {
					protocol: caseData.protocol,
				});
			}, 1000);
		} catch (error) {
			console.error('Erro ao salvar:', error);
			Alert.alert(
				'Erro',
				error.response?.data?.message || 'Erro ao enviar o relatório'
			);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.section}>
				<Text style={styles.label}>Descrição do Caso:*</Text>
				<TextInput
					style={styles.textarea}
					multiline
					value={description}
					onChangeText={setDescription}
				/>
				<Text style={styles.label}>Conclusão:*</Text>
				<TextInput
					style={styles.textarea}
					multiline
					value={conclusion}
					onChangeText={setConclusion}
				/>
				{answers.map((ans, idx) => (
					<View key={idx}>
						<Text style={styles.label}>Pergunta {idx + 1}:*</Text>
						<TextInput
							style={styles.input}
							value={ans}
							onChangeText={text => handleAnswerChange(idx, text)}
						/>
					</View>
				))}
				<Text style={styles.label}>Status do Caso:*</Text>
				<TextInput
					style={styles.input}
					placeholder="Ex: FINALIZADO ou ARQUIVADO"
					value={status}
					onChangeText={setStatus}
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
					style={styles.buttonPrimary}
					onPress={handleSubmit}
				>
					<Text style={styles.buttonText}>Salvar relatório</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Informações Gerais</Text>
				<View style={styles.sectionDivider} />
				<Text style={styles.info}>
					<Text style={styles.label}>Protocolo:</Text>{' '}
					{getOrNA(caseData.protocol)}
				</Text>
				<Text style={styles.info}>
					<Text style={styles.label}>Título:</Text>{' '}
					{getOrNA(caseData.title)}
				</Text>
				<Text style={styles.info}>
					<Text style={styles.label}>Status:</Text>{' '}
					{getOrNA(caseData.status)}
				</Text>
				<Text style={styles.info}>
					<Text style={styles.label}>Tipo de Caso:</Text>{' '}
					{getOrNA(caseData.caseType)}
				</Text>
				<Text style={styles.info}>
					<Text style={styles.label}>Data de Abertura:</Text>{' '}
					{formatDate(caseData.openedAt)}
				</Text>
				<Text style={styles.info}>
					<Text style={styles.label}>Observações:</Text>{' '}
					{getOrNA(caseData.observations)}
				</Text>
				<Text style={styles.info}>
					<Text style={styles.label}>Número de Inquérito:</Text>{' '}
					{getOrNA(caseData.inquiryNumber)}
				</Text>
				<Text style={styles.info}>
					<Text style={styles.label}>Autoridade Requisitante:</Text>{' '}
					{getOrNA(caseData.requestingAuthority)}
				</Text>
				<Text style={styles.info}>
					<Text style={styles.label}>Instituição Requisitante:</Text>{' '}
					{getOrNA(caseData.requestingInstitution)}
				</Text>
			</View>
			{caseData.questions && caseData.questions.length > 0 && (
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Perguntas</Text>
					<View style={styles.sectionDivider} />
					{caseData.questions.map((item, idx) => (
						<Text key={idx} style={styles.info}>
							• {item.question}
						</Text>
					))}
				</View>
			)}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Dados da Vítima</Text>
				<View style={styles.sectionDivider} />
				<Text style={styles.info}>
					<Text style={styles.label}>Nome:</Text>{' '}
					{getOrNA(caseData.patient?.name)}
				</Text>
				<Text style={styles.info}>
					<Text style={styles.label}>NIC:</Text>{' '}
					{getOrNA(caseData.patient?.nic)}
				</Text>
				<Text style={styles.info}>
					<Text style={styles.label}>Idade:</Text>{' '}
					{getOrNA(caseData.patient?.age)}
				</Text>
				<Text style={styles.info}>
					<Text style={styles.label}>Status de Identificação:</Text>{' '}
					{getOrNA(caseData.patient?.identificationStatus)}
				</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Localização do Ocorrido</Text>
				<View style={styles.sectionDivider} />
				<Text style={styles.info}>
					<Text style={styles.label}>Rua:</Text>{' '}
					{getOrNA(caseData.location?.street)}
				</Text>
				<Text style={styles.info}>
					<Text style={styles.label}>Bairro:</Text>{' '}
					{getOrNA(caseData.location?.district)}
				</Text>
				<Text style={styles.info}>
					<Text style={styles.label}>Cidade:</Text>{' '}
					{getOrNA(caseData.location?.city)}
				</Text>
				<Text style={styles.info}>
					<Text style={styles.label}>Estado:</Text>{' '}
					{getOrNA(caseData.location?.state)}
				</Text>
				<Text style={styles.info}>
					<Text style={styles.label}>CEP:</Text>{' '}
					{getOrNA(caseData.location?.zipCode)}
				</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>
					Responsável pela Abertura
				</Text>
				<View style={styles.sectionDivider} />
				<Text style={styles.info}>
					<Text style={styles.label}>Nome:</Text>{' '}
					{getOrNA(caseData.openedBy?.name)}
				</Text>
				<Text style={styles.info}>
					<Text style={styles.label}>Cargo:</Text>{' '}
					{getOrNA(caseData.openedBy?.role)}
				</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Profissionais</Text>
				<View style={styles.sectionDivider} />
				{caseData.professional?.length > 0 ? (
					caseData.professional.map((pessoa, idx) => (
						<View
							key={pessoa._id || idx}
							style={styles.professionalCard}
						>
							<Text style={styles.info}>
								<Text style={styles.label}>Nome:</Text>{' '}
								{getOrNA(pessoa.name)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Cargo:</Text>{' '}
								{getOrNA(pessoa.role)}
							</Text>
						</View>
					))
				) : (
					<Text style={styles.info}>
						Nenhum profissional registrado.
					</Text>
				)}
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Evidências</Text>
				<View style={styles.sectionDivider} />
				{caseData.evidence?.length > 0 ? (
					caseData.evidence.map((evid, idx) => (
						<View key={evid._id || idx} style={styles.card}>
							<Text style={styles.info}>
								<Text style={styles.label}>Título:</Text>{' '}
								{getOrNA(evid.title)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Depoimento:</Text>{' '}
								{getOrNA(evid.testimony)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>
									Descrição Técnica:
								</Text>{' '}
								{getOrNA(evid.descriptionTechnical)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Coletor:</Text>{' '}
								{getOrNA(evid.collector?.name)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Categoria:</Text>{' '}
								{getOrNA(evid.category)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Observações:</Text>{' '}
								{getOrNA(evid.obs)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Latitude:</Text>{' '}
								{getOrNA(evid.latitude)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Longitude:</Text>{' '}
								{getOrNA(evid.longitude)}
							</Text>
							{evid.photo ? (
								<View style={styles.imageWrapper}>
									<Text style={styles.label}>Foto:</Text>
									<Image
										source={{ uri: evid.photo }}
										style={styles.imagePreview}
										resizeMode="cover"
									/>
								</View>
							) : (
								<Text style={styles.info}>
									<Text style={styles.label}>Foto:</Text> Não
									disponível
								</Text>
							)}
							<View style={styles.laudoBox}>
								<Text style={styles.sectionTitle}>
									Laudo Gerado
								</Text>
								<View style={styles.sectionDivider} />
								<Text style={styles.info}>
									<Text style={styles.label}>
										Conclusão do Laudo:
									</Text>{' '}
									{getOrNA(evid.reportEvidence?.note)}
								</Text>
								<Text style={styles.info}>
									<Text style={styles.label}>
										Análise Técnica:
									</Text>{' '}
									{getOrNA(
										evid.reportEvidence
											?.descriptionTechnical
									)}
								</Text>
								<Text style={styles.info}>
									<Text style={styles.label}>
										Concluído por:
									</Text>{' '}
									{getOrNA(
										evid.reportEvidence?.responsible?.name
									)}
								</Text>
								<Text style={styles.info}>
									<Text style={styles.label}>
										Data do Laudo:
									</Text>{' '}
									{formatDate(evid.reportEvidence?.createdAt)}
								</Text>
							</View>
						</View>
					))
				) : (
					<Text style={styles.info}>
						Nenhuma evidência registrada.
					</Text>
				)}
			</View>
		</ScrollView>
	);
}
