import React from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import StatusPieChart from '../../components/charts/StatusPieCharts';
import CasesBarChart from '../../components/charts/CasesBarChart';
import VictimsStatusChart from '../../components/charts/VictmsStatusChart';
import styles from './styles';

export default function Home() {
	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.container}>
				<StatusPieChart />
				<CasesBarChart />
				<VictimsStatusChart />
			</ScrollView>
		</SafeAreaView>
	);
};
