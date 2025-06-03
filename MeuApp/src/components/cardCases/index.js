import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { useNavigation } from '@react-navigation/native';

export default function CardCases() {
	const [cases, setCases] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	useEffect(() => {
		async function fetchCases() {
			setLoading(true);
			try {
				const token = await AsyncStorage.getItem('token');
				console.log('TOKEN:', token); // Veja se o token está correto
				const response = await axios.get(
					'https://sistema-odonto-legal.onrender.com/api/cases',
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				setCases(response.data);
			} catch (error) {
				console.log(
					'Erro ao buscar casos:',
					error?.response?.data || error.message
				);
				Dialog.show({
					type: ALERT_TYPE.DANGER,
					title: 'Erro!',
					textBody: 'Erro ao buscar casos.',
					button: 'OK',
				});
			}
			setLoading(false);
		}
		fetchCases();
	}, []);

	const fetchCaseDetails = async protocol => {
		const token = await AsyncStorage.getItem('token');
		const role = await AsyncStorage.getItem('role');
		if (role === 'ASSISTENTE') {
			Dialog.show({
				type: ALERT_TYPE.WARNING,
				title: 'Acesso negado',
				textBody: 'Seu usuário não tem acesso a editar casos.',
				button: 'OK',
			});
			return;
		}
		try {
			const response = await axios.get(
				'https://sistema-odonto-legal.onrender.com/api/cases/search/protocol',
				{
					headers: { Authorization: `Bearer ${token}` },
					params: { protocol },
				}
			);
			const caseData = response.data;
			const decoded = jwtDecode(token);
			const userId = decoded.id;
			const userRole = decoded.role;
			const isValid = caseData.professional.some(
				prof => prof._id === userId
			);

			if (userRole === 'ASSISTENTE' && !isValid) {
				Dialog.show({
					type: ALERT_TYPE.WARNING,
					title: 'Acesso negado',
					textBody:
						'Você não pode editar este caso, pois não está associado a ele.',
					button: 'OK',
				});
				return;
			}
			// Aqui você pode abrir um modal de edição ou navegar para uma tela de edição
			Dialog.show({
				type: ALERT_TYPE.SUCCESS,
				title: 'Editar',
				textBody: 'Abrir modal de edição aqui.',
				button: 'OK',
			});
		} catch (err) {
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Erro!',
				textBody: 'Erro ao buscar detalhes do caso.',
				button: 'OK',
			});
		}
	};

	const verDetalhes = protocol => {
		navigation.navigate('DetalhesCaso', { protocol });
	};

	const addEvidence = async protocol => {
		const token = await AsyncStorage.getItem('token');
		try {
			const response = await axios.get(
				'https://sistema-odonto-legal.onrender.com/api/cases/search/protocol',
				{
					headers: { Authorization: `Bearer ${token}` },
					params: { protocol },
				}
			);
			const data = response.data;
			const decoded = jwtDecode(token);
			const userId = decoded.id;
			const userRole = decoded.role;
			const isValid = data.professional.some(prof => prof._id === userId);

			if (userRole === 'ASSISTENTE' && !isValid) {
				Dialog.show({
					type: ALERT_TYPE.WARNING,
					title: 'Acesso negado',
					textBody:
						'Você não pode editar este caso, pois não está associado a ele.',
					button: 'OK',
				});
				return;
			}
			navigation.navigate('AdicionarEvidencia', { protocol });
		} catch (err) {
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Erro!',
				textBody: 'Erro ao buscar caso para evidência.',
				button: 'OK',
			});
		}
	};

	const excluirCaso = async protocol => {
		const token = await AsyncStorage.getItem('token');
		const role = await AsyncStorage.getItem('role');
		if (role === 'ASSISTENTE') {
			Dialog.show({
				type: ALERT_TYPE.WARNING,
				title: 'Acesso negado',
				textBody: 'Seu usuário não tem acesso a excluir casos.',
				button: 'OK',
			});
			return;
		}
		Dialog.show({
			type: ALERT_TYPE.WARNING,
			title: 'Deseja excluir este caso?',
			textBody: 'Essa ação não pode ser desfeita.',
			button: 'Sim, excluir!',
			onHide: async () => {
				try {
					await axios.delete(
						'https://sistema-odonto-legal.onrender.com/api/cases/delete/protocol',
						{
							headers: { Authorization: `Bearer ${token}` },
							params: { protocol },
						}
					);
					Dialog.show({
						type: ALERT_TYPE.SUCCESS,
						title: 'Excluído!',
						textBody: 'O caso foi excluído com sucesso.',
						button: 'OK',
					});
					setCases(prev =>
						prev.filter(item => item.protocol !== protocol)
					);
				} catch (error) {
					Dialog.show({
						type: ALERT_TYPE.DANGER,
						title: 'Erro!',
						textBody:
							error.response?.data?.message ||
							'Erro ao excluir o caso.',
						button: 'OK',
					});
				}
			},
		});
	};

	if (loading) {
		return <ActivityIndicator size="large" style={{ flex: 1 }} />;
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{cases.length === 0 ? (
				<Text style={{ textAlign: 'center', marginTop: 32 }}>
					Nenhum caso encontrado.
				</Text>
			) : (
				cases.map((item, idx) => (
					<Card
						key={item.protocol || idx}
						style={styles.card}
						elevation={4}
					>
						<Card.Title
							title={item.title}
							subtitle={`Protocolo: ${item.protocol}`}
						/>
						<Card.Content>
							<Text>Tipo: {item.caseType}</Text>
							<Text>
								Paciente: {item.patient[0]?.nic}
								{item.patient.length > 1
									? ' ... (ver mais)'
									: ''}
							</Text>
							<Text>
								Status:{' '}
								<Text
									style={
										item.status === 'ABERTO'
											? styles.statusAberto
											: item.status === 'FINALIZADO'
												? styles.statusFinalizado
												: styles.statusArquivado
									}
								>
									{item.status}
								</Text>
							</Text>
							<Text>
								Data:{' '}
								{new Date(item.openedAt).toLocaleDateString(
									'pt-BR'
								)}
							</Text>
							<Text>
								Evidências: {item.evidence?.length || 0}
							</Text>
						</Card.Content>
						<Card.Actions>
							<IconButton
								icon="eye-outline"
								onPress={() => verDetalhes(item.protocol)}
								accessibilityLabel="Ver detalhes"
							/>
							<IconButton
								icon="pencil-outline"
								onPress={() => fetchCaseDetails(item.protocol)}
								accessibilityLabel="Editar"
							/>
							<IconButton
								icon="plus-circle-outline"
								onPress={() => addEvidence(item.protocol)}
								accessibilityLabel="Adicionar evidência"
							/>
							{(!item.evidence || item.evidence.length === 0) && (
								<IconButton
									icon="trash-can-outline"
									onPress={() => excluirCaso(item.protocol)}
									accessibilityLabel="Excluir"
									iconColor="#EB5757"
								/>
							)}
						</Card.Actions>
					</Card>
				))
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	card: {
		marginBottom: 16,
	},
	statusAberto: {
		color: '#1E88E5',
		fontWeight: 'bold',
	},
	statusFinalizado: {
		color: '#43A047',
		fontWeight: 'bold',
	},
	statusArquivado: {
		color: '#757575',
		fontWeight: 'bold',
	},
});
