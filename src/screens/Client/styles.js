import { StyleSheet } from 'react-native';
import { FONT_FAMILY_REGULAR } from '../../styles/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 15,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  input: {
    paddingVertical: 0,
    paddingHorizontal: 5,
    fontFamily: FONT_FAMILY_REGULAR,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 25,
  },
});
