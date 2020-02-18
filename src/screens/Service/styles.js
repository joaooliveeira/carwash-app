import { StyleSheet } from 'react-native';
import { FONT_FAMILY_REGULAR } from '../../styles/typography';

export const styles = StyleSheet.create({
  card: {
    margin: 15,
    borderRadius: 8
  },
  divider: {
    marginBottom: 5
  },
  input: {
    paddingVertical: 0,
    paddingHorizontal: 5,
    marginHorizontal: 20,
    fontFamily: FONT_FAMILY_REGULAR
  },
  helperText: {
    marginHorizontal: 25
  },
  sectionDivider: {
    marginTop: 30,
    marginBottom: 5
  },
  newClientIcon: {
    position: "absolute",
    right: 10,
    top: 13,
    zIndex: 1
  },
  dialog: {
    position: 'absolute',
    zIndex: 1,
    height: "100%",
    width: "100%"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: 'space-around',
    marginVertical: 15
  }
});
