import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(3, 115, 122, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
};

const StatusPieChart = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(
                    'https://sistema-odonto-legal.onrender.com/api/dash/cases/status',
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const colors = {
                    ABERTO: '#023A4A',
                    FINALIZADO: '#EDBF5F',
                    ARQUIVADO: '#2A9D8F',
                };

                const formattedData = response.data.map(item => ({
                    name: item.status,
                    casos: item.casos,
                    color: colors[item.status] || '#cccccc',
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,
                }));

                setChartData(formattedData);
            } catch (error) {
                console.error("Erro ao buscar status dos casos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />;
    }

    if (chartData.length === 0) {
        return <Text style={styles.errorText}>Sem dados para exibir.</Text>;
    }

    return (
        <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Distribuição de Casos por Status</Text>
            <PieChart
                data={chartData}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                accessor={'casos'}
                backgroundColor={'transparent'}
                paddingLeft={'15'}
                center={[10, 0]}
                absolute 
            />
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
    }
});

export default StatusPieChart;