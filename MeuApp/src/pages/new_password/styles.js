import { StyleSheet } from 'react-native';
import { COLORS } from '../../colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.primary, 
	},
	card: {
		backgroundColor: COLORS.white, 
		padding: 32,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 4,
		alignItems: 'center',
		width: 320, 
	},
	logo: {
		width: 160, 
		height: 80,
		marginBottom: 16,
	},
	login: {
		marginVertical: 8,
		color: '#666', 
		fontSize: 16,
		textAlign: 'center',
	},
	input: {
		width: '100%',
		paddingVertical: 10,
		paddingHorizontal: 12,
		marginVertical: 10,
		borderWidth: 1,
		borderColor: '#CCC',
		borderRadius: 5,
		backgroundColor: COLORS.white, 
	},
	button: {
		width: '100%',
		backgroundColor: COLORS.primary,
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 8,
	},
	buttonText: {
		color: COLORS.white,
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default styles;
