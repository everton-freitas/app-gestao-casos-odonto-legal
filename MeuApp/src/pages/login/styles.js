import { StyleSheet } from 'react-native';
import { COLORS } from '../../colors';

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
		padding: 32, // 2rem ≈ 32px
		borderRadius: 10,
		alignItems: 'center',
		elevation: 4, // sombra Android
		shadowColor: '#000', // sombra iOS
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
		width: 320, // 20rem ≈ 320px
	},
	logo: {
		width: 160, // 10rem ≈ 160px
		height: 160,
		resizeMode: 'contain',
		marginBottom: 16,
	},
	cardText: {
		marginVertical: 8, // 0.5rem ≈ 8px
		marginTop: 24, // 1.5rem ≈ 24px
		color: COLORS.text,
		fontSize: 16,
		textAlign: 'center',
	},
	picker: {
		width: '100%',
        height: 44,
        padding: 0,
		marginVertical: 10, // 0.625rem ≈ 10px (aplica em cima e embaixo)
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		backgroundColor: COLORS.lightBackground, // usando sua variável de cor
	},
	input: {
		width: '100%',
		padding: 10, // 0.625rem ≈ 10px
		marginVertical: 10, // 0.625rem ≈ 10px (aplica em cima e embaixo)
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		backgroundColor: COLORS.lightBackground, // usando sua variável de cor
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
		textDecorationLine: 'underline',
	},
});
