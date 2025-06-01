import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

export const headerStyles = StyleSheet.create({
	header: {
		backgroundColor: COLORS.lightBackground,
	},
	logo: {
		width: 40,
		height: 40,
		marginLeft: 16,
	},
});

export default StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.primary,
	},
	card: {
		backgroundColor: COLORS.lightBackground,
		padding: 32,
		borderRadius: 10,
		alignItems: 'center',
		elevation: 4,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
		width: 320,
	},
	text: {
		marginVertical: 8,
		color: COLORS.text,
		fontSize: 16,
		textAlign: 'center',
	},
	dropDownContainer: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		backgroundColor: COLORS.lightBackground,
	},
	input: {
		width: '100%',
		padding: 10,
		marginVertical: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		backgroundColor: COLORS.lightBackground,
	},
	button: {
		width: '100%',
		backgroundColor: COLORS.primary,
		padding: 12,
		borderRadius: 6,
		alignItems: 'center',
		marginTop: 8,
		marginBottom: 8,
	},
	buttonText: {
		color: COLORS.white,
		fontWeight: 'bold',
		fontSize: 16,
	},
	link: {
		color: COLORS.info,
		marginTop: 8,
		textDecorationLine: 'none',
	},
});
