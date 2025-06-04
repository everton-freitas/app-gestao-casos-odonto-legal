import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
	container: {
		padding: 16,
		minHeight: '100%',
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.lightBackground,
	},
	goBack: {
		marginBottom: 12,
	},
	goBackText: {
		color: COLORS.primary,
		fontWeight: 'bold',
		fontSize: 16,
	},
	title: {
		color: COLORS.primary,
		fontSize: 26,
		fontWeight: 'bold',
		marginBottom: 18,
		textAlign: 'center',
	},
	section: {
		gap: 18,
	},
	cardSection: {
		backgroundColor: COLORS.lightBackground,
		borderRadius: 10,
		padding: 16,
		marginBottom: 18,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.07,
		shadowRadius: 6,
		elevation: 2,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: COLORS.primary,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.disabledColor,
		marginBottom: 10,
		paddingBottom: 4,
	},
	info: {
		color: COLORS.primary,
		marginBottom: 4,
		fontSize: 15,
	},
	label: {
		fontWeight: 'bold',
		color: COLORS.primary,
	},
	professionalCard: {
		backgroundColor: COLORS.evidence,
		borderRadius: 8,
		padding: 10,
		marginBottom: 8,
	},
	card: {
		backgroundColor: COLORS.evidence,
		borderRadius: 8,
		padding: 12,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: COLORS.disabledBackground,
	},
	imageWrapper: {
		marginTop: 1,
	},
	imagePreview: {
		width: 220,
		height: 140,
		borderRadius: 8,
		marginTop: 4,
		backgroundColor: COLORS.disabledBackground,
	},
	buttonLaudo: {
		backgroundColor: COLORS.secondary,
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 12,
		width: '50%',
	},
	buttonEvidencia: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center', 
    alignItems: 'center',
    alignSelf: 'center',      
    marginTop: 12,
    width: '65%',
},
	buttonText1: {
		color: COLORS.black,
		fontWeight: 'bold',
		fontSize: 16,
	},
	buttonText2: {
		color: COLORS.white,
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default styles;
