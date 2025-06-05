import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Platform,
	KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import styles from './styles';

export default function Vitimas() {
	const navigation = useNavigation();

	const [victims, setVictims] = useState([]);
	const [statusFilter, setStatusFilter] = useState('');
	const [nicFilter, setNicFilter] = useState('');
	const [dateFilter, setDateFilter] = useState('');
	const [page, setPage] = useState(1);

	const victimsPerPage = 8;
	const paginatedVictims = victims.slice(
		(page - 1) * victimsPerPage,
		page * victimsPerPage
	);

	const getToken = async () => await AsyncStorage.getItem('token');
	const getRole = async () => await AsyncStorage.getItem('role');

	const fetchVictims = async () => {
		const token = await getToken();
		try {
			const response = await axios.get(
				'https://sistema-odonto-legal.onrender.com/api/patient/all/1',
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			console.log('resposta da api', response.data);
			setVictims(response.data);
		} catch (error) {
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Erro!',
				textBody: 'Erro ao buscar vítimas.',
				button: 'OK',
			});
			console.error('erro', error.response.data);
		}
	};

	const handleFilter = async () => {
		const token = await getToken();
		try {
			const response = await axios.get(
				'https://sistema-odonto-legal.onrender.com/api/cases/search/status',
				{
					headers: { Authorization: `Bearer ${token}` },
					params: {
						status: statusFilter || undefined,
						protocolo: nicFilter || undefined,
						date: dateFilter || undefined,
					},
				}
			);
			if (response.data.length === 0) {
				Toast.show({
					type: ALERT_TYPE.WARNING,
					title: 'Nenhum caso encontrado',
					textBody: 'Tente outro filtro.',
				});
			}
			setVictims(response.data);
		} catch (error) {
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Erro!',
				textBody: 'Erro ao filtrar os casos.',
				button: 'OK',
			});
		}
	};

	const handleSearchByNic = async () => {
		const token = await getToken();
		try {
			const response = await axios.get(
				'https://sistema-odonto-legal.onrender.com/api/patient/search',
				{
					headers: { Authorization: `Bearer ${token}` },
					params: { nic: nicFilter },
				}
			);
			setVictims([response.data]);
		} catch (error) {
			Toast.show({
				type: ALERT_TYPE.WARNING,
				title: 'Nenhum nic encontrado!',
				textBody: 'Protocolo inválido.',
			});
		}
	};

	const handleCreateVictim = async () => {
		const role = await getRole();
		if (role === 'ASSISTENTE') {
			Dialog.show({
				type: ALERT_TYPE.WARNING,
				title: 'Acesso negado',
				textBody: 'Seu usuário não pode criar casos.',
				button: 'OK',
			});
		} else {
			navigation.navigate('CadastrarVitima');
		}
	};

	const clearFilters = () => {
		setStatusFilter('');
		setNicFilter('');
		setDateFilter('');
		setPage(1);
		fetchVictims();
	};

	useEffect(() => {
		if (statusFilter) {
			handleFilter();
		} else {
			fetchVictims();
		}
	}, [statusFilter]);

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.title}>Banco de Dados da Vítima</Text>

				<View style={styles.row}>
					<TouchableOpacity
						style={styles.button}
						onPress={handleCreateVictim}
					>
						<Text style={styles.buttonText}>Adicionar Vítima</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.buttonSecondary}
						onPress={clearFilters}
					>
						<Text style={styles.buttonText}>Limpar Filtros</Text>
					</TouchableOpacity>
				</View>

				<TextInput
					style={styles.input}
					placeholder="Pesquisar NIC"
					value={nicFilter}
					onChangeText={setNicFilter}
					onSubmitEditing={handleSearchByNic}
				/>

				<TextInput
					style={styles.input}
					placeholder="Data (AAAA-MM-DD)"
					value={dateFilter}
					onChangeText={setDateFilter}
					onSubmitEditing={handleFilter}
				/>

				<TextInput
					style={styles.input}
					placeholder="Status (ABERTO, FINALIZADO, ARQUIVADO)"
					value={statusFilter}
					onChangeText={text => {
						setStatusFilter(text);
						setPage(1);
					}}
				/>

				{paginatedVictims.map((victim, index) => (
					<View key={index} style={styles.card}>
						<Text style={styles.cardTitle}>{victim.nic}</Text>
						<Text style={styles.cardInfo}>Nome: {victim.name}</Text>
						<Text style={styles.cardInfo}>
							Status: {victim.identificationStatus}
						</Text>
					</View>
				))}

				<View style={styles.pagination}>
					{[...Array(Math.ceil(victims.length / victimsPerPage))].map(
						(_, i) => (
							<TouchableOpacity
								key={i}
								style={styles.pageButton}
								onPress={() => setPage(i + 1)}
							>
								<Text style={styles.pageButtonText}>
									{i + 1}
								</Text>
							</TouchableOpacity>
						)
					)}
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
