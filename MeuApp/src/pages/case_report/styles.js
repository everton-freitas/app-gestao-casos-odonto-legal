import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.evidence,
		padding: 20,
	},
	section: {
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
	sectionTitle: {
		fontWeight: 'bold',
		fontSize: 20,
		color: COLORS.primary,
		marginBottom: 8,
	},
	sectionDivider: {
		borderBottomWidth: 1,
		borderBottomColor: COLORS.disabledColor,
		marginBottom: 10,
		marginTop: 2,
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
	card: {
		backgroundColor: COLORS.lightBackground,
		borderRadius: 8,
		padding: 12,
		marginBottom: 10,
	},
	imageWrapper: {
		marginTop: 1,
	},
	imagePreview: {
		width: 200,
		height: 200,
		borderRadius: 8,
		marginTop: 8,
	},
	laudoBox: {
		backgroundColor: COLORS.lightBackground,
		borderRadius: 8,
		padding: 10,
		marginTop: 8,
	},
	professionalCard: {
		backgroundColor: COLORS.white,
		borderRadius: 8,
		padding: 8,
		marginBottom: 6,
	},
	textarea: {
		backgroundColor: COLORS.lightBackground,
		borderRadius: 8,
		padding: 10,
		marginBottom: 10,
		minHeight: 80,
		textAlignVertical: 'top',
		borderWidth: 1,
		borderColor: '#ddd',
	},
	input: {
		backgroundColor: COLORS.lightBackground,
		borderRadius: 8,
		padding: 10,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#ddd',
	},
	buttonPrimary: {
		backgroundColor: COLORS.primary,
		padding: 14,
		borderRadius: 8,
		alignItems: 'center',
		alignSelf: 'center',
		marginTop: 16,
		width: '65%',
	},
	buttonText: {
		color: COLORS.white,
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default styles;
