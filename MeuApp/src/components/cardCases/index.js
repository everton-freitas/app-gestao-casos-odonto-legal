import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import styles from './styles';

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
							title={
								<Text style={styles.cardTitle}>
									{item.title}
								</Text>
							}
							subtitle={
								<Text>
									<Text style={styles.cardText}>
										Protocolo:{' '}
									</Text>
									{item.protocol}
								</Text>
							}
						/>
						<Card.Content>
							<Text>
								<Text style={styles.cardText}>Tipo: </Text>
								<Text style={styles.valor}>
									{item.caseType}
								</Text>
							</Text>
							<Text>
								<Text style={styles.cardText}>Paciente: </Text>
								<Text style={styles.valor}>
									{item.patient[0]?.nic}
									{item.patient.length > 1
										? ' ... (ver mais)'
										: ''}
								</Text>
							</Text>
							<Text>
								<Text style={styles.cardText}>Status: </Text>
								<Text
									style={[
										styles.valor,
										item.status === 'ABERTO'
											? styles.statusAberto
											: item.status === 'FINALIZADO'
												? styles.statusFinalizado
												: styles.statusArquivado,
									]}
								>
									{item.status}
								</Text>
							</Text>
							<Text>
								<Text style={styles.cardText}>Data: </Text>
								<Text style={styles.valor}>
									{new Date(item.openedAt).toLocaleDateString(
										'pt-BR'
									)}
								</Text>
							</Text>
							<Text>
								<Text style={styles.cardText}>
									Evidências:{' '}
								</Text>
								<Text style={styles.valor}>
									{item.evidence?.length || 0}
								</Text>
							</Text>
						</Card.Content>
						<Card.Actions>
							<IconButton
								icon="eye-outline"
								onPress={() => verDetalhes(item.protocol)}
								accessibilityLabel="Ver detalhes"
								iconColor={styles.icon.color}
								containerColor={styles.icon.backgroundColor} 
							/>
							<IconButton
								icon="pencil-outline"
								onPress={() => fetchCaseDetails(item.protocol)}
								accessibilityLabel="Editar"
								iconColor={styles.icon.color}
								containerColor={styles.icon.backgroundColor}
							/>
							<IconButton
								icon="plus-circle-outline"
								onPress={() => addEvidence(item.protocol)}
								accessibilityLabel="Adicionar evidência"
								iconColor={styles.icon.color}
								containerColor={styles.icon.backgroundColor}
							/>
							{(!item.evidence || item.evidence.length === 0) && (
								<IconButton
									icon="trash-can-outline"
									onPress={() => excluirCaso(item.protocol)}
									accessibilityLabel="Excluir"
									iconColor="#EB5757"
									containerColor={styles.icon.backgroundColor}
								/>
							)}
						</Card.Actions>
					</Card>
				))
			)}
		</ScrollView>
	);
}
