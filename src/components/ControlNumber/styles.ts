import { FONTS, COLORS } from "../../theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    fontSize: 20,
    fontFamily: FONTS.REGULAR,
    padding: 10,
  },
});
