import { StyleSheet } from "react-native";
import {FONT_FAMILY_REGULAR } from "../../styles/typography";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    paddingVertical: 0,
    paddingHorizontal: 5,
    fontFamily: FONT_FAMILY_REGULAR
  },
  card: {
    margin: 15,
    padding: 5,
    borderRadius: 5
  },
});
