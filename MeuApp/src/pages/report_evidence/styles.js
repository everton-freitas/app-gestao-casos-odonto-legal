import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F6F8FA',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E88E5',
        marginBottom: 16,
        textAlign: 'center',
    },
    goBack: {
        color: '#1E88E5',
        fontWeight: 'bold',
        marginBottom: 12,
        fontSize: 16,
    },
    evidenceInfo: {
        backgroundColor: '#F6F8FA',
        padding: 16,
        borderRadius: 8,
        marginBottom: 18,
    },
    legend: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#1E88E5',
        marginBottom: 8,
    },
    info: {
        fontSize: 15,
        marginBottom: 4,
        color: '#222',
    },
    label: {
        fontWeight: 'bold',
        color: '#1E88E5',
    },
    imageWrapper: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'flex-start',
    },
    imagePreview: {
        width: 220,
        height: 140,
        borderRadius: 8,
        backgroundColor: '#eee',
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 6,
        elevation: 2,
        marginBottom: 24,
    },
    inputLabel: {
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 4,
        color: '#1E88E5',
    },
    textarea: {
        width: '100%',
        minHeight: 80,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        padding: 8,
        marginBottom: 8,
        backgroundColor: '#F6F8FA',
        textAlignVertical: 'top',
    },
    button: {
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