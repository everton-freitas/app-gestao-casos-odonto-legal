import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';

export default function CardCases({ cases }) {
	const [tableCases, setTableCases] = useState(cases || []);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setTableCases(cases || []);
	}, [cases]);

	if (loading) {
		return <ActivityIndicator size="large" style={{ flex: 1 }} />;
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{tableCases.length === 0 ? (
				<Text style={{ textAlign: 'center', marginTop: 32 }}>
					Nenhum caso encontrado.
				</Text>
			) : (
				tableCases.map((item, idx) => (
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
