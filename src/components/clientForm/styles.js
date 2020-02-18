import { StyleSheet } from 'react-native';
import { FONT_FAMILY_REGULAR } from '../../styles/typography';

export const styles = StyleSheet.create({
  card: {
    margin: 2,
    borderRadius: 8
  },
  helperText: {
    marginHorizontal: 5
  },
  input: {
    paddingVertical: 0,
    paddingHorizontal: 5,
    fontFamily: FONT_FAMILY_REGULAR
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20
  }
});
