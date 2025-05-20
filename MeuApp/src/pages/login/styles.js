import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 24,
        alignItems: 'center',
        elevation: 4,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 16,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 16,
        marginBottom: 16,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 44,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 12,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
    button: {
        width: '100%',
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    link: {
        color: '#007bff',
        marginTop: 8,
        textDecorationLine: 'underline',
    },
});