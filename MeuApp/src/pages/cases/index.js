import React, { useEffect, useState } from 'react';
import CardCases from '../../components/cardCases';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Casos() {
	const [cases, setCases] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchCases() {
			const token = await AsyncStorage.getItem('token');
			const response = await axios.get(
				'https://sistema-odonto-legal.onrender.com/api/cases/search/all',
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setCases(response.data);
			setLoading(false);
		}
		fetchCases();
	}, []);

	if (loading) return null;

	return <CardCases cases={cases} />;
}
