import { StyleSheet } from 'react-native';
import { COLORS } from '../Colors';

const styles = StyleSheet.create({
	header: {
		backgroundColor: COLORS.lightBackground,
		justifyContent: 'center',
	},
	logoTitleContainer: {
		flexDirection: 'row',
        alignItems: 'center', 
        height: 56,           
        marginTop: 40, 
		marginBottom: 5,
	},
    logo: {
		width: 32,
		height: 32,
		marginLeft: 16,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginLeft: 4,
		color: COLORS.primary,
	},
	backButton: {
		paddingRight: 8,
		paddingVertical: 8,
	},
	arrow: {
		color: COLORS.primary,
		marginLeft: 16,
	},
});

export default styles;