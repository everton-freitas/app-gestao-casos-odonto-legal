import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: '#f5f5f5',
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#1E88E5',
		marginBottom: 16,
		textAlign: 'center',
	},
	backButton: {
		marginBottom: 16,
		alignSelf: 'flex-start',
	},
	backButtonText: {
		color: '#1E88E5',
		fontWeight: 'bold',
	},
	section: {
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 16,
		marginBottom: 16,
		elevation: 2,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#1E88E5',
		marginBottom: 8,
	},
	info: {
		fontSize: 15,
		marginBottom: 2,
		color: '#333',
	},
	label: {
		fontWeight: 'bold',
		color: '#1E88E5',
	},
	button: {
		backgroundColor: '#1E88E5',
		padding: 10,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 10,
	},
	buttonEdited: {
		backgroundColor: '#43A047',
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
	buttonPrimary: {
		backgroundColor: '#1E88E5',
		padding: 14,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 16,
	},
	card: {
		backgroundColor: '#f0f0f0',
		borderRadius: 8,
		padding: 12,
		marginBottom: 10,
	},
	imageWrapper: {
		marginTop: 8,
	},
	laudoBox: {
		backgroundColor: '#e3f2fd',
		borderRadius: 8,
		padding: 10,
		marginTop: 8,
	},
	professionalCard: {
		backgroundColor: '#f0f0f0',
		borderRadius: 8,
		padding: 8,
		marginBottom: 6,
	},
	textarea: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 10,
		marginBottom: 10,
		minHeight: 80,
		textAlignVertical: 'top',
		borderWidth: 1,
		borderColor: '#ddd',
	},
	input: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 10,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#ddd',
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.4)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 20,
		width: '90%',
		maxWidth: 400,
	},
});

export default styles;
