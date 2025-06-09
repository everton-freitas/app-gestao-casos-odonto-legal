import React from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import StatusPieChart from '../../components/charts/StatusPieCharts';
import CasesBarChart from '../../components/charts/CasesBarChart';
import VictimsStatusChart from '../../components/charts/VictmsStatusChart';

export default function Home() {
	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.header}>Dashboard</Text>
				<StatusPieChart />
				<CasesBarChart />
				<VictimsStatusChart />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#f0f4f7',
	},
	container: {
		padding: 20,
	},
	header: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#012130',
		marginBottom: 20,
	},
});
