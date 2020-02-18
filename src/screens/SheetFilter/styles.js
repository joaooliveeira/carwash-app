import { StyleSheet } from "react-native";
import { Colors } from "../../styles";
import { FONT_FAMILY_BOLD, FONT_SIZE_TITLE, FONT_SIZE_TEXT, FONT_FAMILY_REGULAR } from "../../styles/typography";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 15,
    borderRadius: 8
  },
  divider: {
    marginBottom: 5
  },
  sectionDivider: {
    marginTop: 30,
    marginBottom: 5
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  input: {
    paddingVertical: 0,
    paddingHorizontal: 5,
    marginHorizontal: 25,
    fontFamily: FONT_FAMILY_REGULAR
  },
  filterTitle: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: FONT_SIZE_TITLE,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  filterContainer: {
    overflow: 'hidden',
  },
});
