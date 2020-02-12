import { StyleSheet } from 'react-native';
import { FONT_FAMILY_REGULAR } from '../../styles/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    margin: 15
  },
  input: {
    paddingVertical: 0,
    paddingHorizontal: 5,
    marginHorizontal: 20,
    fontFamily: FONT_FAMILY_REGULAR
  },
  sectionDivider: {
    marginTop: 30,
    marginBottom: 5
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
