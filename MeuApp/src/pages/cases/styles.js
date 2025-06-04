import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
	headerArea: {
		padding: 16,
		backgroundColor: COLORS.lightBackground,
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 15,
	},
	button: {
		flex: 1,
		backgroundColor: COLORS.primary,
		padding: 15,
		borderRadius: 8,
		marginRight: 10,
		alignItems: 'center',
	},
	buttonSecondary: {
		flex: 1,
		backgroundColor: COLORS.secondary,
		padding: 15,
		borderRadius: 8,
		alignItems: 'center',
	},
	buttonText: {
		color: COLORS.white,
		fontWeight: 'bold',
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
