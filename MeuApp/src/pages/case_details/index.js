import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	Alert,
	ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../Colors';
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

export default function CaseDetails() {
	const navigation = useNavigation();
	const route = useRoute();
	const { protocol } = route.params || {};
	const [caseDetails, setCaseDetails] = useState(null);
	const [loading, setLoading] = useState(true);

	const addEvidence = protocol => {
		navigation.navigate('AddEvidence', { protocol });
	};

	useEffect(() => {
		const fetchCaseDetails = async () => {
			setLoading(true);
			try {
				const token = await AsyncStorage.getItem('token');
				const response = await axios.get(
					'https://sistema-odonto-legal.onrender.com/api/cases/search/protocol',
					{
						headers: { Authorization: `Bearer ${token}` },
						params: { protocol },
					}
				);
				setCaseDetails(response.data);
			} catch (err) {
				Alert.alert(
					'Erro',
					err.response?.data?.message || 'Tente novamente mais tarde.'
				);
			}
			setLoading(false);
		};
		fetchCaseDetails();
	}, [protocol]);

	if (loading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={COLORS.primary} />
				<Text style={{ color: COLORS.primary, marginTop: 16 }}>
					Carregando detalhes do caso...
				</Text>
			</View>
		);
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				{caseDetails ? (
					<View style={styles.section}>
						<View style={styles.cardSection}>
							<Text style={styles.sectionTitle}>
								Informações Gerais
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Protocolo:</Text>{' '}
								{getOrNA(caseDetails.protocol)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Título:</Text>{' '}
								{getOrNA(caseDetails.title)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Status:</Text>{' '}
								{getOrNA(caseDetails.status)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Tipo de Caso:</Text>{' '}
								{getOrNA(caseDetails.caseType)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>
									Data de Abertura:
								</Text>{' '}
								{formatDate(caseDetails.openedAt)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Observações:</Text>{' '}
								{getOrNA(caseDetails.observations)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>
									Número de Inquérito:
								</Text>{' '}
								{getOrNA(caseDetails.inquiryNumber)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>
									Autoridade Requisitante:
								</Text>{' '}
								{getOrNA(caseDetails.requestingAuthority)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>
									Instituição Requisitante:
								</Text>{' '}
								{getOrNA(caseDetails.requestingInstitution)}
							</Text>
						</View>

						{caseDetails.questions?.length > 0 && (
							<View style={styles.cardSection}>
								<Text style={styles.sectionTitle}>
									Perguntas do Caso
								</Text>
								{caseDetails.questions.map((item, idx) => (
									<Text key={idx} style={styles.info}>
										• {item.question}
									</Text>
								))}
							</View>
						)}

						{caseDetails.caseReport && (
							<View style={styles.cardSection}>
								<Text style={styles.sectionTitle}>
									Relatório Final do Caso
								</Text>
								<Text style={styles.info}>
									<Text style={styles.label}>Descrição:</Text>{' '}
									{getOrNA(
										caseDetails.caseReport.description
									)}
								</Text>
								<Text style={styles.info}>
									<Text style={styles.label}>Conclusão:</Text>{' '}
									{getOrNA(caseDetails.caseReport.conclusion)}
								</Text>
								<Text style={styles.info}>
									<Text style={styles.label}>
										Data de Conclusão:
									</Text>{' '}
									{formatDate(
										caseDetails.caseReport.createdAt
									)}
								</Text>
								<Text style={styles.info}>
									<Text style={styles.label}>
										Responsável:
									</Text>{' '}
									{getOrNA(
										caseDetails.caseReport.responsible?.name
									)}
								</Text>
								{caseDetails.caseReport.answers?.length > 0 && (
									<View>
										<Text style={styles.label}>
											Respostas:
										</Text>
										{caseDetails.caseReport.answers.map(
											(item, idx) => (
												<Text
													key={item._id || idx}
													style={styles.info}
												>
													Resposta {idx + 1}:{' '}
													{getOrNA(item.answer)}
												</Text>
											)
										)}
									</View>
								)}
							</View>
						)}

						{caseDetails.patient?.map((e, i) => (
							<View key={i} style={styles.cardSection}>
								<Text style={styles.sectionTitle}>
									Dados da Vítima {i + 1}
								</Text>
								<Text style={styles.info}>
									<Text style={styles.label}>Nome:</Text>{' '}
									{getOrNA(e.name)}
								</Text>
								<Text style={styles.info}>
									<Text style={styles.label}>NIC:</Text>{' '}
									{getOrNA(e.nic)}
								</Text>
								<Text style={styles.info}>
									<Text style={styles.label}>Idade:</Text>{' '}
									{getOrNA(e.age)}
								</Text>
								<Text style={styles.info}>
									<Text style={styles.label}>Gênero:</Text>{' '}
									{getOrNA(e.gender)}
								</Text>
								<Text style={styles.info}>
									<Text style={styles.label}>
										Status de Identificação:
									</Text>{' '}
									{getOrNA(e.identificationStatus)}
								</Text>
							</View>
						))}

						<View style={styles.cardSection}>
							<Text style={styles.sectionTitle}>
								Localização do Ocorrido
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Rua:</Text>{' '}
								{getOrNA(caseDetails.location?.street)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Bairro:</Text>{' '}
								{getOrNA(caseDetails.location?.district)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Cidade:</Text>{' '}
								{getOrNA(caseDetails.location?.city)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Estado:</Text>{' '}
								{getOrNA(caseDetails.location?.state)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>CEP:</Text>{' '}
								{getOrNA(caseDetails.location?.zipCode)}
							</Text>
						</View>

						<View style={styles.cardSection}>
							<Text style={styles.sectionTitle}>
								Responsável pela Abertura
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Nome:</Text>{' '}
								{getOrNA(caseDetails.openedBy?.name)}
							</Text>
							<Text style={styles.info}>
								<Text style={styles.label}>Cargo:</Text>{' '}
								{getOrNA(caseDetails.openedBy?.role)}
							</Text>
						</View>

						<View style={styles.cardSection}>
							<Text style={styles.sectionTitle}>
								Profissionais
							</Text>
							{caseDetails.professional?.length > 0 ? (
								caseDetails.professional.map((pessoa, idx) => (
									<View
										key={pessoa._id || idx}
										style={styles.professionalCard}
									>
										<Text style={styles.info}>
											<Text style={styles.label}>
												Nome:
											</Text>{' '}
											{getOrNA(pessoa.name)}
										</Text>
										<Text style={styles.info}>
											<Text style={styles.label}>
												Cargo:
											</Text>{' '}
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

						<View style={styles.cardSection}>
							<Text style={styles.sectionTitle}>Evidências</Text>
							{caseDetails.evidence?.length > 0 ? (
								caseDetails.evidence.map((evid, idx) => (
									<View
										key={evid._id || idx}
										style={styles.card}
									>
										<Text style={styles.info}>
											<Text style={styles.label}>
												Título:
											</Text>{' '}
											{getOrNA(evid.title)}
										</Text>
										<Text style={styles.info}>
											<Text style={styles.label}>
												Depoimento:
											</Text>{' '}
											{getOrNA(evid.testimony)}
										</Text>
										<Text style={styles.info}>
											<Text style={styles.label}>
												Descrição Técnica:
											</Text>{' '}
											{getOrNA(evid.descriptionTechnical)}
										</Text>
										<Text style={styles.info}>
											<Text style={styles.label}>
												Condição:
											</Text>{' '}
											{getOrNA(evid.condition)}
										</Text>
										<Text style={styles.info}>
											<Text style={styles.label}>
												Coletor:
											</Text>{' '}
											{getOrNA(evid.collector?.name)}
										</Text>
										<Text style={styles.info}>
											<Text style={styles.label}>
												Categoria:
											</Text>{' '}
											{getOrNA(evid.category)}
										</Text>
										<Text style={styles.info}>
											<Text style={styles.label}>
												Observações:
											</Text>{' '}
											{getOrNA(evid.obs)}
										</Text>
										<Text style={styles.info}>
											<Text style={styles.label}>
												Latitude:
											</Text>{' '}
											{getOrNA(evid.latitude)}
										</Text>
										<Text style={styles.info}>
											<Text style={styles.label}>
												Longitude:
											</Text>{' '}
											{getOrNA(evid.longitude)}
										</Text>
										{evid.photo ? (
											<View style={styles.imageWrapper}>
												<Text style={styles.label}>
													Foto:
												</Text>
												<Image
													source={{ uri: evid.photo }}
													style={styles.imagePreview}
													resizeMode="cover"
												/>
											</View>
										) : (
											<Text style={styles.info}>
												<Text style={styles.label}>
													Foto:
												</Text>{' '}
												Não disponível
											</Text>
										)}
									</View>
								))
							) : (
								<Text style={styles.info}>
									Nenhuma evidência registrada.
								</Text>
							)}
							<TouchableOpacity
								style={styles.button}
								onPress={() =>
									addEvidence(caseDetails.protocol)
								}
							>
								<Text style={styles.buttonText}>
									Adicionar evidências
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				) : (
					<Text style={styles.info}>
						Carregando detalhes do caso...
					</Text>
				)}
			</View>
		</ScrollView>
	);
}
