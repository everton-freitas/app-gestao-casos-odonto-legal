import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F5F9FC',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E88E5',
        marginBottom: 16,
        alignSelf: 'center',
    },
    label: {
        fontWeight: 'bold',
        color: '#1E88E5',
        marginTop: 12,
        marginBottom: 4,
    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#EDBF5F',
        paddingVertical: 10,
        borderRadius: 8,
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginVertical: 8,
        paddingHorizontal: 16,
    },
    buttonPrimary: {
        width: '100%',
        backgroundColor: '#1E88E5',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    buttonText: {
        color: '#012130',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonText2: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    questionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    selectedProfessionals: {
        marginVertical: 8,
    },
    selectedList: {
        marginLeft: 12,
    },
});

export default styles;


