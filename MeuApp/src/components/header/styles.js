import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
	header: {
		backgroundColor: COLORS.lightBackground,
		justifyContent: 'center',
	},
	logoTitleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 60,
		marginTop: 44,
		marginBottom: 5,
	},
	logo: {
		width: 40,
		height: 40,
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
		fontSize: 28,
		color: COLORS.primary,
		marginLeft: 16,
	},
	userBox: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.icons,
		borderRadius: 20,
		paddingHorizontal: 8,
		position: 'absolute',
		right: 16,
		top: 51,
	},
	userIcon: {
		fontSize: 28,
		color: COLORS.white,
	},
	userName: {
		color: COLORS.white,
		fontWeight: 'bold',
		fontSize: 16,
	},
	userRole: {
		color: COLORS.white,
		fontSize: 13,
		marginTop: -2,
	},
});

export default styles;
