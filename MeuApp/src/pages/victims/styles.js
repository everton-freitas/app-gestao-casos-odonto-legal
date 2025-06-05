import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#f5f5f5',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 15,
	},
	input: {
		height: 50,
		backgroundColor: '#fff',
		borderRadius: 8,
		paddingHorizontal: 15,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#ddd',
	},
	button: {
		flex: 1,
		backgroundColor: '#007bff',
		color: '#fff',
		padding: 15,
		borderRadius: 8,
		marginRight: 10,
		alignItems: 'center',
	},
	buttonSecondary: {
		flex: 1,
		backgroundColor: '#6c757d',
		padding: 15,
		borderRadius: 8,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
	card: {
		backgroundColor: '#fff',
		padding: 15,
		borderRadius: 8,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#ddd',
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	cardInfo: {
		fontSize: 14,
		color: '#333',
	},
	pagination: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 20,
	},
	pageButton: {
		padding: 10,
		margin: 5,
		backgroundColor: '#007bff',
		borderRadius: 5,
	},
	pageButtonText: {
		color: '#fff',
	},
});
