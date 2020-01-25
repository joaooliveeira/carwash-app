import { StyleSheet } from "react-native";
import { Colors } from "../../styles";
import { FONT_FAMILY_BOLD, FONT_SIZE_TITLE, FONT_SIZE_TEXT, FONT_FAMILY_REGULAR } from "../../styles/typography";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 15,
    padding: 5,
    borderRadius: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 5
  },
  input: {
    paddingVertical: 0,
    paddingHorizontal: 5,
    fontFamily: FONT_FAMILY_REGULAR
  },
  filterTitle: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: FONT_SIZE_TITLE,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  divider: {
    borderColor: Colors.PRIMARY,
    marginHorizontal: 15,
    borderTopWidth: 1,
    marginBottom: 25,
  },
  filterContainer: {
    overflow: 'hidden',
  },
});
