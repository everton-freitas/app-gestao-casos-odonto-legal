import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
	searchContainer: {
		width: '100%',
		alignItems: 'center',
	},
	input: {
		width: '92%',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: COLORS.disabledColor,
		height: 40,
		paddingVertical: 3,
		paddingHorizontal: 10,
		backgroundColor: COLORS.lightBackground,
		fontSize: 16,
	},
	primary: {
		padding: 0,
	},
	secondary: {
		padding: 10,
		borderColor: COLORS.disabledBackground,
		backgroundColor: COLORS.lightBackground,
	},
});

export default styles;
