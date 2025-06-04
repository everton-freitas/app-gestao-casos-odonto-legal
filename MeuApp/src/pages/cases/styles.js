import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
	headerArea: {
		padding: 16,
		backgroundColor: COLORS.lightBackground,
	},
	title: {
		color: COLORS.primary,
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 16,
		gap: 8,
	},
	inputArea: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		marginBottom: 16,
		gap: 8,
	},
	pagination: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 16,
	},
	pag: {
		backgroundColor: COLORS.secondary,
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 6,
		marginHorizontal: 4,
	},
	pagActive: {
		backgroundColor: COLORS.primary,
	},
	pagText: {
		color: COLORS.black,
		fontWeight: 'bold',
	},
});

export default styles;