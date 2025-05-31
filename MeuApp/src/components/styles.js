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
		height: 60,
		marginTop: 44,
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
		marginRight: 8,
	},
	userInfo: {
		marginRight: 4,
	},
	userName: {
		color: COLORS.white,
		fontWeight: 'bold',
		fontSize: 16,
	},
	userRole: {
		color: COLORS.primary,
		fontSize: 13,
		marginTop: -2,
	},
});

export default styles;
