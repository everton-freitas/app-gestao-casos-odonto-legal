import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F5F9FC',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1E88E5',
        marginBottom: 16,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 12,
        color: '#1E88E5',
    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#F5F9FC',
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#E2B93B',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    buttonPrimary: {
        backgroundColor: '#1E88E5',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default styles;