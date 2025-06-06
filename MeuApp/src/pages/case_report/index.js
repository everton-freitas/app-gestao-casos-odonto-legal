import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	Alert,
	Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './styles';

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
	const [editVictim, setEditVictim] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [victimData, setVictimData] = useState({
		name: caseData.patient?.name || '',
		age: caseData.patient?.age || '',
		cpf: caseData.patient?.cpf || '',
		identificationStatus:
			caseData.patient?.identificationStatus || 'NÃO IDENTIFICADO',
		address: {
			street: caseData.patient?.address?.street || '',
			houseNumber: caseData.patient?.address?.houseNumber || '',
			district: caseData.patient?.address?.district || '',
			city: caseData.patient?.address?.city || '',
			state: caseData.patient?.address?.state || '',
			zipCode: caseData.patient?.address?.zipCode || '',
			complement: caseData.patient?.address?.complement || '',
		},
	});

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

	const confirmEdit = () => {
		Alert.alert(
			'Editar dados da vítima?',
			'Deseja alterar alguma informação da vítima antes de finalizar?',
			[
				{
					text: 'Não, continuar',
					style: 'cancel',
					onPress: () => setEditVictim(false),
				},
				{
					text: 'Sim, editar',
					onPress: () => setShowEditModal(true),
				},
			]
		);
	};

	const handleSubmit = async () => {
		if (showEditModal) {
			Alert.alert(
				'Atenção',
				'Finalize a edição dos dados da vítima antes de enviar'
			);
			return;
		}
		if (!description || !conclusion || answers.some(a => !a) || !status) {
			Alert.alert('Aviso', 'Preencha todos os campos obrigatórios!');
			return;
		}
		const token = await AsyncStorage.getItem('token');
		const updateData = {
			name: victimData.name,
			cpf: victimData.cpf || '',
			identificationStatus: victimData.identificationStatus,
			address: {
				street: victimData.address.street || '',
				district: victimData.address.district || '',
				city: victimData.address.city || '',
				state: victimData.address.state || '',
				zipCode: victimData.address.zipCode || '',
				complement: victimData.address.complement || '',
			},
		};
		if (victimData.age !== '' && !isNaN(Number(victimData.age))) {
			updateData.age = Number(victimData.age);
		}
		if (
			victimData.address.houseNumber !== '' &&
			!isNaN(Number(victimData.address.houseNumber))
		) {
			updateData.address.houseNumber = Number(
				victimData.address.houseNumber
			);
		}
		try {
			if (editVictim && caseData.patient?.nic) {
				await axios.put(
					'https://sistema-odonto-legal.onrender.com/api/patient/update',
					updateData,
					{
						headers: { Authorization: `Bearer ${token}` },
						params: { nic: caseData.patient.nic },
					}
				);
			}
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
			<Text style={styles.title}>Relatório do Caso</Text>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={styles.backButton}
			>
				<Text style={styles.backButtonText}>Voltar</Text>
			</TouchableOpacity>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Informações Gerais</Text>
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
					{caseData.questions.map((item, idx) => (
						<Text key={idx} style={styles.info}>
							• {item.question}
						</Text>
					))}
				</View>
			)}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Dados da Vítima</Text>
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
				<TouchableOpacity
					style={[styles.button, editVictim && styles.buttonEdited]}
					onPress={confirmEdit}
				>
					<Text style={styles.buttonText}>
						{editVictim
							? 'Dados da vítima editados'
							: 'Editar dados da vítima'}
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Localização do Ocorrido</Text>
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
									{/* Imagem pode ser exibida com <Image> se desejar */}
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

			{/* Modal de edição da vítima */}
			<Modal
				visible={showEditModal}
				transparent
				animationType="slide"
				onRequestClose={() => setShowEditModal(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Text style={styles.sectionTitle}>
							Editar Dados da Vítima
						</Text>
						<TextInput
							style={styles.input}
							placeholder="Nome completo"
							value={victimData.name}
							onChangeText={text =>
								setVictimData({ ...victimData, name: text })
							}
						/>
						<TextInput
							style={styles.input}
							placeholder="Idade"
							value={victimData.age?.toString()}
							keyboardType="numeric"
							onChangeText={text =>
								setVictimData({ ...victimData, age: text })
							}
						/>
						<TextInput
							style={styles.input}
							placeholder="CPF"
							value={victimData.cpf}
							onChangeText={text =>
								setVictimData({ ...victimData, cpf: text })
							}
						/>
						<TextInput
							style={styles.input}
							placeholder="Gênero"
							value={victimData.gender}
							onChangeText={text =>
								setVictimData({ ...victimData, gender: text })
							}
						/>
						<TextInput
							style={styles.input}
							placeholder="Status de Identificação"
							value={victimData.identificationStatus}
							onChangeText={text =>
								setVictimData({
									...victimData,
									identificationStatus: text,
								})
							}
						/>
						<Text style={styles.sectionTitle}>Endereço</Text>
						<TextInput
							style={styles.input}
							placeholder="Rua"
							value={victimData.address.street}
							onChangeText={text =>
								setVictimData({
									...victimData,
									address: {
										...victimData.address,
										street: text,
									},
								})
							}
						/>
						<TextInput
							style={styles.input}
							placeholder="Número"
							value={victimData.address.houseNumber?.toString()}
							keyboardType="numeric"
							onChangeText={text =>
								setVictimData({
									...victimData,
									address: {
										...victimData.address,
										houseNumber: text,
									},
								})
							}
						/>
						<TextInput
							style={styles.input}
							placeholder="Bairro"
							value={victimData.address.district}
							onChangeText={text =>
								setVictimData({
									...victimData,
									address: {
										...victimData.address,
										district: text,
									},
								})
							}
						/>
						<TextInput
							style={styles.input}
							placeholder="Cidade"
							value={victimData.address.city}
							onChangeText={text =>
								setVictimData({
									...victimData,
									address: {
										...victimData.address,
										city: text,
									},
								})
							}
						/>
						<TextInput
							style={styles.input}
							placeholder="Estado"
							value={victimData.address.state}
							onChangeText={text =>
								setVictimData({
									...victimData,
									address: {
										...victimData.address,
										state: text,
									},
								})
							}
						/>
						<TextInput
							style={styles.input}
							placeholder="CEP"
							value={victimData.address.zipCode}
							onChangeText={text =>
								setVictimData({
									...victimData,
									address: {
										...victimData.address,
										zipCode: text,
									},
								})
							}
						/>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								marginTop: 16,
							}}
						>
							<TouchableOpacity
								style={[
									styles.button,
									{ flex: 1, marginRight: 8 },
								]}
								onPress={() => {
									setShowEditModal(false);
									setEditVictim(true);
								}}
							>
								<Text style={styles.buttonText}>Salvar</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.button,
									{ flex: 1, backgroundColor: '#EB5757' },
								]}
								onPress={() => setShowEditModal(false)}
							>
								<Text style={styles.buttonText}>Cancelar</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			<Text style={styles.sectionTitle}>Relatório Final do Caso</Text>
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
					style={styles.buttonPrimary}
					onPress={handleSubmit}
				>
					<Text style={styles.buttonText}>Salvar relatório</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}
