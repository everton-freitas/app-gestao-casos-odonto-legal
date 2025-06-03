import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    width: '90%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#808080',
    height: 40,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: COLORS.lightBackground,
    fontSize: 16,
  },
  primary: {
    padding: 0,
  },
  secondary: {
    padding: 10,
    borderColor: '#ccc',
    backgroundColor: COLORS.lightBackground,
  },
});

export default styles;