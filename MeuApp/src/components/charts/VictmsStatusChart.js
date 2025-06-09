import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	ActivityIndicator,
	Dimensions,
	StyleSheet,
	ScrollView,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
	color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};
const colorMap = {
	'NÃO IDENTIFICADO': '#023A4A',
	IDENTIFICADO: '#EDBF5F',
	'PARCIALMENTE IDENTIFICADO': '#2A9D8F',
};

const VictimsStatusChart = () => {
	const [chartData, setChartData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = await AsyncStorage.getItem('token');
				const response = await axios.get(
					'https://sistema-odonto-legal.onrender.com/api/dash/victims/status',
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				const formattedData = response.data.map(item => {
					const statusKey = item.status.trim().toUpperCase();
					return {
						name: item.status.trim(),
						population: item.vitimas,
						color: colorMap[statusKey] || '#D3D3D3',
						legendFontColor: '#7F7F7F',
						legendFontSize: 15,
					};
				});

				setChartData(formattedData);
			} catch (error) {
				console.error('Erro ao buscar status das vítimas:', error);
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

	if (chartData.length === 0) {
		return (
			<Text style={styles.errorText}>
				Sem dados de vítimas para exibir.
			</Text>
		);
	}

	return (
    <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Identificação de Vítimas</Text>
        
        <PieChart
            data={chartData}
            width={screenWidth - 80}
            height={220}
            chartConfig={chartConfig}
            accessor={'population'}
            backgroundColor={'transparent'}
            hasLegend={false}
            absolute
            paddingLeft={(screenWidth / 2) - 120} 
        />
        
        <View style={styles.legendContainer}>
            {chartData.map(item => (
                <View key={item.name} style={styles.legendItem}>
                    <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
                    <Text style={styles.legendText}>
                        {`${item.name}: ${item.population}`}
                    </Text>
                </View>
            ))}
        </View>
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
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
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
		textAlign: 'center',
	},
	legendContainer: {
		marginTop: 15,
		width: '100%',
		paddingHorizontal: 20,
	},
	legendItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	legendColorBox: {
		width: 14,
		height: 14,
		borderRadius: 2,
		marginRight: 10,
	},
	legendText: {
		fontSize: 14,
		color: '#333',
	},
});

export default VictimsStatusChart;
