import { FONTS, COLORS } from "../../theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  item: {
    alignItems: "center",
    flexGrow: 1,
    flexBasis: 0,
    margin: 3,
  },
  selected: {
    color: COLORS.WHITE,
    fontFamily: FONTS.BOLD,
  },
  unSelected: {
    color: COLORS.GRAY_PRIMARY,
  },
  text: {
    fontSize: 28,
    fontFamily: FONTS.REGULAR,
    padding: 10,
  },
});
