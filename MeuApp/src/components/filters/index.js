import React, { useState } from 'react';
import { View, TextInput, Platform, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';

const Filters = ({
	statusFilter,
	setStatusFilter,
	dateFilter,
	setDateFilter,
	setPage,
	applyFilterDate,
}) => {
	const [showPicker, setShowPicker] = useState(false);

	const onChange = (event, selectedDate) => {
		setShowPicker(false);
		if (selectedDate) {
			const dateStr = selectedDate.toISOString().split('T')[0];
			setDateFilter(dateStr);
			setPage(1);
		}
	};

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
			<View style={styles.inputDate}>
				<TextInput
					value={dateFilter}
					style={styles.filter}
					placeholder="Data (YYYY-MM-DD)"
					onFocus={() => setShowPicker(true)}
					showSoftInputOnFocus={false}
				/>
				{showPicker && (
					<DateTimePicker
						value={dateFilter ? new Date(dateFilter) : new Date()}
						mode="date"
						display={Platform.OS === 'ios' ? 'spinner' : 'default'}
						onChange={onChange}
					/>
				)}
			</View>
		</View>
	);
};

export default Filters;
