import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    card: {
        marginBottom: 16,
        backgroundColor: COLORS.lightBackground,
    },
    cardTitle: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 20,
    },
    cardText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    valor: {
        color: COLORS.primary,
    },
    statusAberto: {
        color: COLORS.secondary,
        fontWeight: 'bold',
    },
    statusFinalizado: {
        color: COLORS.success,
        fontWeight: 'bold',
    },
    statusArquivado: {
        color: COLORS.disabledBackground,
        fontWeight: 'bold',
    },
    icon: {
        color: COLORS.primary,
        backgroundColor: COLORS.iconsLight,
    },
});

export default styles;
