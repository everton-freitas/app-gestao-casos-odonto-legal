import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: COLORS.evidence,
        paddingHorizontal: 20,
    },
    logoutRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 32,
    },
    logoutIcon: {
        marginRight: 12,
		color: COLORS.error,
		fontSize: 28,
    },
    logoutText: {
        color: COLORS.error,
        fontSize: 20,
    },
});

export default styles;