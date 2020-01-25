import {StyleSheet} from 'react-native';
import {  FONT_FAMILY_REGULAR } from '../../styles/typography';

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
    fontFamily: FONT_FAMILY_REGULAR
  },
  dialog: {
    position: 'absolute',
    zIndex: 1,
    height: "100%",
    width: "100%",
  },
  optionalFormView: {
    marginTop: 20,
    overflow: 'hidden'
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 25,
  }
});
