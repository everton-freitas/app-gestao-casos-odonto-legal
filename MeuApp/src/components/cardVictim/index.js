import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from '../cardCases/styles'; // Reaproveita os mesmos estilos

export default function CardVictims({ victims }) {
	const navigation = useNavigation();
	const [listVictims, setListVictims] = useState(victims || []);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setListVictims(victims || []);
	}, [victims]);

	if (loading) {
		return <ActivityIndicator size="large" style={{ flex: 1 }} />;
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{listVictims.length === 0 ? (
				<Text style={{ textAlign: 'center', marginTop: 32 }}>
					Nenhuma vítima encontrada.
				</Text>
			) : (
				listVictims.map((victim, index) => (
					<Card
						key={victim.nic || index}
						style={styles.card}
						elevation={4}
					>
						<Card.Title
							title={
								<Text style={styles.cardTitle}>
									{victim.name || 'Vítima sem nome'}
								</Text>
							}
							subtitle={
								<Text>
									<Text style={styles.cardText}>NIC: </Text>
									{victim.nic}
								</Text>
							}
						/>
						<Card.Content>
							<Text>
								<Text style={styles.cardText}>CPF: </Text>
								<Text style={styles.valor}>
									{victim.cpf || 'Não informado'}
								</Text>
							</Text>
							<Text>
								<Text style={styles.cardText}>RG: </Text>
								<Text style={styles.valor}>
									{victim.rg || 'Não informado'}
								</Text>
							</Text>
							<Text>
								<Text style={styles.cardText}>Sexo: </Text>
								<Text style={styles.valor}>
									{victim.sex || 'Não informado'}
								</Text>
							</Text>
							<Text>
								<Text style={styles.cardText}>Idade: </Text>
								<Text style={styles.valor}>
									{victim.age || 'Não informado'}
								</Text>
							</Text>
							<Text>
								<Text style={styles.cardText}>Status: </Text>
								<Text
									style={[
										styles.valor,
										victim.identificationStatus === 'NÃO IDENTIFICADO'
											? styles.statusAberto
											: victim.identificationStatus === 'IDENTIFICADO'
												? styles.statusFinalizado
												: styles.statusArquivado,
									]}
								>
									{victim.identificationStatus}
								</Text>
							</Text>
						</Card.Content>
						<Card.Actions>
							<IconButton
								icon="eye-outline"
								onPress={() =>
									navigation.navigate('VictimDetails', { nic: victim.nic })
								}
								accessibilityLabel="Ver detalhes"
								iconColor={styles.icon.color}
								containerColor={styles.icon.backgroundColor}
							/>
							<IconButton
								icon="pencil-outline"
								onPress={() =>
									navigation.navigate('EditarVitima', { nic: victim.nic })
								}
								accessibilityLabel="Editar vítima"
								iconColor={styles.icon.color}
								containerColor={styles.icon.backgroundColor}
							/>
						</Card.Actions>
					</Card>
				))
			)}
		</ScrollView>
	);
}