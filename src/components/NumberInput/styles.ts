import { FONTS, COLORS } from "../../theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textValue: {
    fontSize: 26,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
  },
  viewPossible: {
    width: "100%",
    height: "100%",
  },
  itemPossible: {
    alignItems: "center",
    flexGrow: 1,
    flexBasis: 0,
    margin: 1,
  },
  cellPossible: {
    width: 8,
    height: 8,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textPossible: {
    fontSize: 7,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
  },
  textReadonly: {
    color: COLORS.GRAY_QUATERNARY,
  }
});
