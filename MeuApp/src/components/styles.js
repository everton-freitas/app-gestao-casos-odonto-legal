import { StyleSheet } from 'react-native';
import { COLORS } from '../Colors';

const styles = StyleSheet.create({
	header: {
		backgroundColor: COLORS.lightBackground,
	},
	logoTitleContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		marginBottom: 10,
		height: 56,
	},
    logo: {
		width: 32,
		height: 32,
		marginLeft: 16,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginLeft: 12,
		color: COLORS.primary,
	},
	backButton: {
		paddingRight: 8,
		paddingVertical: 8,
	},
	backText: {
		fontSize: 24,
		color: COLORS.primary,
	},
});

export default styles;