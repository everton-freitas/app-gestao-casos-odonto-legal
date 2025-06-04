import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	Button,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import CardCases from '../../components/cardCases';
import InputSearch from '../../components/InputSearch';
import Filters from '../../components/filters';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../Colors';

export default function Casos() {
	const [cases, setCases] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [statusFilter, setStatusFilter] = useState('');
	const [protocoloFilter, setProtocoloFilter] = useState('');
	const [dateFilter, setDateFilter] = useState('');
	const casesPerPage = 8;

	const paginatedCases = cases.slice(
		(page - 1) * casesPerPage,
		page * casesPerPage
	);

	const lengthPag = Math.ceil(cases.length / casesPerPage);

	const getData = async () => {
		setLoading(true);
		const token = await AsyncStorage.getItem('token');
		try {
			const response = await axios.get(
				'https://sistema-odonto-legal.onrender.com/api/cases/search/all',
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setCases(response.data);
		} catch (error) {
			console.log('Erro ao buscar dados:', error);
		}
		setLoading(false);
	};

	const applyFilters = async () => {
		setLoading(true);
		const token = await AsyncStorage.getItem('token');
		try {
			const response = await axios.get(
				'https://sistema-odonto-legal.onrender.com/api/cases/search/status',
				{
					headers: { Authorization: `Bearer ${token}` },
					params: {
						status: statusFilter || undefined,
						protocolo: protocoloFilter || undefined,
						date: dateFilter || undefined,
					},
				}
			);
			setCases(response.data);
		} catch (error) {
			console.log(
				'Nenhum caso encontrado!',
				error?.response?.data?.message || error.message
			);
			setStatusFilter('');
		}
		setLoading(false);
	};

	const applyFilterDate = async () => {
		setLoading(true);
		const token = await AsyncStorage.getItem('token');
		try {
			const response = await axios.get(
				'https://sistema-odonto-legal.onrender.com/api/cases/search/date',
				{
					headers: { Authorization: `Bearer ${token}` },
					params: { date: dateFilter },
				}
			);
			setCases(response.data);
			if (response.data.length === 0) {
				getData();
			}
		} catch (err) {
			console.log('Erro!', err.message);
		}
		setLoading(false);
	};

	const protocolSearch = async () => {
		setLoading(true);
		const token = await AsyncStorage.getItem('token');
		try {
			const response = await axios.get(
				'https://sistema-odonto-legal.onrender.com/api/cases/search/protocol',
				{
					headers: { Authorization: `Bearer ${token}` },
					params: { protocol: protocoloFilter },
				}
			);
			setCases([response.data]);
		} catch (err) {
			console.log('Nenhum caso encontrado!', err.message);
		}
		setLoading(false);
	};

	const clearFilters = () => {
		setStatusFilter('');
		setProtocoloFilter('');
		setDateFilter('');
		setPage(1);
		getData();
	};

	useEffect(() => {
		if (statusFilter) {
			applyFilters();
		} else {
			getData();
		}
	}, [statusFilter]);

	if (loading) return null;

	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: COLORS.lightBackground }}
		>
			<View style={styles.headerArea}>
				<Text style={styles.title}>Casos Periciais</Text>
				<View style={styles.buttons}>
					<Button
						title="Adicionar caso"
						color={COLORS.secondary}
						onPress={() => {
							/* navegação para cadastro */
						}}
					/>
					<Button
						title="Limpar filtros"
						color={COLORS.secondary}
						onPress={clearFilters}
					/>
				</View>
			</View>
			<View style={styles.inputArea}>
				<InputSearch
					placeholder="Pesquisar protocolo"
					variant="InputSearch"
					value={protocoloFilter}
					onChangeText={text => {
						setProtocoloFilter(text);
						setPage(1);
					}}
					onSubmitEditing={protocolSearch}
				/>
				<Filters
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
					dateFilter={dateFilter}
					setDateFilter={setDateFilter}
					setPage={setPage}
					applyFilterDate={applyFilterDate}
				/>
			</View>
			<CardCases cases={paginatedCases} />
			<View style={styles.pagination}>
				{Array.from({ length: lengthPag }).map((_, i) => (
					<TouchableOpacity
						key={i}
						style={[styles.pag, page === i + 1 && styles.pagActive]}
						onPress={() => setPage(i + 1)}
					>
						<Text style={styles.pagText}>{i + 1}</Text>
					</TouchableOpacity>
				))}
			</View>
		</ScrollView>
	);
};
