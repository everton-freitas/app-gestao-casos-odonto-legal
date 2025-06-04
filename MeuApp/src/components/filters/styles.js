import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
  filterArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: COLORS.disabledBackground,
    borderRadius: 5,
    marginRight: 8,
    backgroundColor: COLORS.lightBackground,
    minWidth: 140,
  },
  filter: {
    width: 140,
    color: COLORS.primary,
  },
  inputDate: {
    borderWidth: 1,
    borderColor: COLORS.disabledBackground,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: COLORS.lightBackground,
    minWidth: 120,
    color: COLORS.primary,
  },
});

export default styles;