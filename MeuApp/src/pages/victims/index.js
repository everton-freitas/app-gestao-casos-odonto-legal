import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import InputSearch from '../../components/inputSearch';
import Filters from '../../components/filters';
import CardVictims from '../../components/cardVictim';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import styles from './styles';
import { COLORS } from '../../Colors';
import Odontograma from '../../components/odontograma/odontograma';

export default function Vitimas() {
	const [victims, setVictims] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [statusFilter, setStatusFilter] = useState('');
	const [nicFilter, setNicFilter] = useState('');
	const [dateFilter, setDateFilter] = useState('');
	const victimsPerPage = 8;

	const paginatedVictims = victims.slice(
		(page - 1) * victimsPerPage,
		page * victimsPerPage
	);

	const lengthPag = Math.ceil(victims.length / victimsPerPage);

	const navigation = useNavigation();

	const getToken = async () => await AsyncStorage.getItem('token');
	const getRole = async () => await AsyncStorage.getItem('role');

	const fetchVictims = async () => {
		setLoading(true);
		const token = await getToken();
		try {
			const response = await axios.get(
				'https://sistema-odonto-legal.onrender.com/api/patient/all/1',
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setVictims(response.data);
		} catch (error) {
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Erro!',
				textBody: 'Erro ao buscar vítimas.',
				button: 'OK',
			});
		}
		setLoading(false);
	};

	const applyFilters = async () => {
		setLoading(true);
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
			setVictims(response.data);
		} catch (error) {
			Toast.show({
				type: ALERT_TYPE.WARNING,
				title: 'Filtro inválido',
				textBody: 'Nenhum resultado encontrado.',
			});
		}
		setLoading(false);
	};

	const searchByNic = async () => {
		setLoading(true);
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
				title: 'NIC inválido',
				textBody: 'Vítima não encontrada.',
			});
		}
		setLoading(false);
	};

	const handleCreateVictim = async () => {
		const role = await getRole();
		if (role === 'ASSISTENTE') {
			Dialog.show({
				type: ALERT_TYPE.WARNING,
				title: 'Acesso negado',
				textBody: 'Seu usuário não pode criar vítimas.',
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
			applyFilters();
		} else {
			fetchVictims();
		}
	}, [statusFilter]);

	if (loading) return null;

	return (
		<ScrollView>
			<View style={styles.headerArea}>
				<View style={styles.buttons}>
					<TouchableOpacity
						style={styles.button}
						onPress={handleCreateVictim}
					>
						<Text onPress={() => navigation.navigate('CreateVictim')} style={styles.buttonText1}>Cadastrar vítima</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.buttonSecondary}
						onPress={clearFilters}
					>
						<Text style={styles.buttonText2}>Limpar filtros</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.inputArea}>
				<InputSearch
					placeholder="Pesquisar NIC"
					variant="InputSearch"
					value={nicFilter}
					onChangeText={text => {
						setNicFilter(text);
						setPage(1);
					}}
					onSubmitEditing={searchByNic}
				/>
				<Filters
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
					dateFilter={dateFilter}
					setDateFilter={setDateFilter}
					setPage={setPage}
					applyFilterDate={applyFilters}
				/>
			</View>
			<CardVictims victims={paginatedVictims} />
			<View style={styles.pagination}>
				{Array.from({ length: lengthPag }).map((_, i) => {
					const isActive = page === i + 1;
					return (
						<TouchableOpacity
							key={i}
							style={[styles.pag, isActive && styles.pagActive]}
							onPress={() => setPage(i + 1)}
						>
							<Text
								style={[
									styles.pagText,
									isActive && { color: COLORS.white },
								]}
							>
								{i + 1}
							</Text>
						</TouchableOpacity>
						
					);
				})}
			</View>
			    
		</ScrollView>
	);
}
