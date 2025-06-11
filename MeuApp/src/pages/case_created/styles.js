import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.evidence,
		padding: 20,
	},
	cardSection: {
		backgroundColor: COLORS.white,
		borderRadius: 10,
		padding: 16,
		marginBottom: 18,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.07,
		shadowRadius: 6,
		elevation: 2,
	},
	label: {
		fontWeight: 'bold',
		color: COLORS.primary,
		marginBottom: 8,
	},
	input: {
		width: '100%',
		padding: 10,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 6,
		backgroundColor: COLORS.lightBackground,
		marginBottom: 8,
	},
	button: {
		backgroundColor: COLORS.secondary,
		paddingVertical: 10,
		borderRadius: 8,
		alignSelf: 'flex-start',
		alignItems: 'center',
		marginVertical: 8,
		width: '60%',
	},
	buttonPrimary: {
		width: '65%',
		backgroundColor: COLORS.primary,
		borderRadius: 8,
		paddingVertical: 12,
		alignItems: 'center',
		alignSelf: 'center',
		marginBottom: 10,
		marginTop: 10,
	},
	buttonText: {
		color: COLORS.primary,
		fontWeight: 'bold',
		fontSize: 16,
	},
	buttonText2: {
		color: COLORS.white,
		fontWeight: 'bold',
		fontSize: 16,
	},
	questionContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	selectedProfessionals: {
		marginVertical: 8,
	},
	selectedList: {
		marginLeft: 12,
	},
});

export default styles;
