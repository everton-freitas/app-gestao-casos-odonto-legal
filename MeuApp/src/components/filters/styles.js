import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
	filterArea: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 16,
	},
	pickerWrapper: {
		width:'49%',
		borderWidth: 1,
		borderColor: COLORS.disabledColor,
		borderRadius: 5,
		backgroundColor: COLORS.lightBackground,
		color: COLORS.primary,
		alignItems: 'center',
	},
	filter: {
		width: 140,
		color: COLORS.primary,
	},
	inputDate: {
		width:'48%',
		borderWidth: 1,
		borderColor: COLORS.disabledColor,
		borderRadius: 5,
		backgroundColor: COLORS.lightBackground,
		color: COLORS.primary,
		alignItems: 'center',
	},
});

export default styles;
