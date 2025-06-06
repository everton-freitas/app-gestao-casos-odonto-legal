import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.evidence,
		padding: 20,
	},
	evidenceInfo: {
		padding: 16,
		borderRadius: 8,
		marginBottom: 18,
	},
	legend: {
		fontWeight: 'bold',
		fontSize: 20,
		color: COLORS.primary,
		marginBottom: 8,
	},
	info: {
		fontSize: 15,
		marginBottom: 4,
		color: '#222',
	},
	label: {
		fontWeight: 'bold',
		color: COLORS.primary,
	},
	imageWrapper: {
		marginTop: 10,
		marginBottom: 10,
		alignItems: 'flex-start',
	},
	imagePreview: {
		width: 220,
		height: 140,
		borderRadius: 8,
		backgroundColor: '#eee',
	},
	formContainer: {
		backgroundColor: COLORS.white,
		borderRadius: 10,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.07,
		shadowRadius: 6,
		elevation: 2,
		marginBottom: 24,
	},
	inputLabel: {
		fontWeight: 'bold',
		marginTop: 12,
		marginBottom: 4,
		color: COLORS.primary,
	},
	textarea: {
		width: '100%',
		minHeight: 80,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 6,
		padding: 8,
		marginBottom: 8,
		backgroundColor: COLORS.lightBackground,
		textAlignVertical: 'top',
	},
	button: {
		backgroundColor: COLORS.primary,
		paddingVertical: 14,
		borderRadius: 8,
		alignSelf: 'center',
		alignItems: 'center',
		marginTop: 16,
		width: '50%',
	},
	buttonText: {
		color: COLORS.white,
		fontWeight: 'bold',
		fontSize: 16,
	},
	sectionDivider: {
		borderBottomWidth: 1,
		borderBottomColor: COLORS.disabledColor,
		marginBottom: 10,
		marginTop: 2,
	},
});

export default styles;
