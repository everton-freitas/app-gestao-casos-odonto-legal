import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		backgroundColor: COLORS.secondary,
		padding: 16,
		borderRadius: 8,
	},
	buttonText: {
		color: COLORS.black,
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default styles;
