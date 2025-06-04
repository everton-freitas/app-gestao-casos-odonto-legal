import React from 'react';
import { View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';

const Filters = ({
	statusFilter,
	setStatusFilter,
	dateFilter,
	setDateFilter,
	setPage,
	applyFilterDate,
}) => {
	return (
		<View style={styles.filterArea}>
			<View style={styles.pickerWrapper}>
				<Picker
					selectedValue={statusFilter}
					style={styles.filter}
					onValueChange={itemValue => {
						setStatusFilter(itemValue);
						setPage(1);
					}}
				>
					<Picker.Item label="Filtrar por:" value="" />
					<Picker.Item label="Todos" value="" />
					<Picker.Item label="Aberto" value="ABERTO" />
					<Picker.Item label="Finalizado" value="FINALIZADO" />
					<Picker.Item label="Arquivado" value="ARQUIVADO" />
				</Picker>
			</View>
			<TextInput
				style={styles.inputDate}
				value={dateFilter}
				placeholder="Data (YYYY-MM-DD)"
				onChangeText={text => {
					setDateFilter(text);
					setPage(1);
				}}
				onSubmitEditing={applyFilterDate}
				keyboardType="numeric"
			/>
		</View>
	);
};

export default Filters;
