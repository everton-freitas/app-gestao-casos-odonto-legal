import React, { useState, useEffect } from 'react';
import {
	ScrollView,
	View,
	Text,
	ActivityIndicator,
	Dimensions,
	StyleSheet,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const monthNames = [
	'Jan',
	'Fev',
	'Mar',
	'Abr',
	'Mai',
	'Jun',
	'Jul',
	'Ago',
	'Set',
	'Out',
	'Nov',
	'Dez',
];

const chartConfig = {
	backgroundColor: '#ffffff',
	backgroundGradientFrom: '#ffffff',
	backgroundGradientTo: '#ffffff',
	decimalPlaces: 0,
	color: (opacity = 1) => `rgba(42, 157, 143, ${opacity})`,
	labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
	style: {
		borderRadius: 16,
	},
	propsForDots: {
		r: '6',
		strokeWidth: '2',
		stroke: '#ffa726',
	},
};

const CasesBarChart = () => {
	const [chartData, setChartData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = await AsyncStorage.getItem('token');
				const response = await axios.get(
					'https://sistema-odonto-legal.onrender.com/api/dash/cases/date',
					{ headers: { Authorization: `Bearer ${token}` } }
				);

				const raw = response.data;
				const filledData = Array(12).fill(0);
				raw.forEach(item => {
					if (item.mes >= 1 && item.mes <= 12) {
						filledData[item.mes - 1] = item.casos;
					}
				});

				setChartData({
					labels: monthNames,
					datasets: [
						{
							data: filledData,
						},
					],
				});
			} catch (error) {
				console.error('Erro ao buscar casos por data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<ActivityIndicator
				size="large"
				color="#0000ff"
				style={{ marginTop: 20 }}
			/>
		);
	}

	if (!chartData) {
		return <Text style={styles.errorText}>Sem dados para exibir.</Text>;
	}

	return (
		<View style={styles.chartContainer}>
			<Text style={styles.chartTitle}>Casos por Mês</Text>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<BarChart
					data={chartData}
					width={700}
					height={250}
					chartConfig={chartConfig}
					verticalLabelRotation={30}
					yAxisLabel=""
					yAxisSuffix=""
					fromZero
					style={{
						marginVertical: 8,
						borderRadius: 16,
					}}
				/>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	chartContainer: {
		marginVertical: 10,
		backgroundColor: '#fff',
		borderRadius: 16,
		padding: 10,
		alignItems: 'center',
	},
	chartTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
		color: '#012130',
	},
	errorText: {
		marginTop: 20,
		fontSize: 16,
		color: 'red',
	},
});

export default CasesBarChart;
