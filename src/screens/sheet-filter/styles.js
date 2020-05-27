import { StyleSheet } from "react-native";
import { Colors } from "../../styles";
import { FONT_FAMILY_BOLD, FONT_SIZE_TITLE } from "../../styles/typography";

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    margin: 10,
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
    marginTop: 5,
    marginBottom: 5
  },
  leftFilter: {
    flexGrow: 1,
    marginTop: 5,
    marginRight: 3.5,
    marginLeft: 25,
    elevation: 2,
    borderWidth: 0,
    backgroundColor: '#f5f5f5',
  },
  rightFilter: {
    backgroundColor: '#f5f5f5',
    borderWidth: 0,
    elevation: 2,
    flexGrow: 1,
    marginLeft: 3.5,
    marginTop: 5,
    marginRight: 25,
  },
  input: {
    paddingHorizontal: 10,
    marginHorizontal: 25,
    marginTop: 10,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: "#f5f5f5",
    borderWidth: 0,
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
  listStyle: {
    marginHorizontal: 25,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 4,
    borderWidth: 0,
    bottom: 2.5
  },
  inputContainerStyle: {
    borderWidth: 0,
  },
  notFoundText: {
    height: 40,
    textAlignVertical: 'center',
    marginLeft: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginVertical: 3,
    marginHorizontal: 15
  }
});
