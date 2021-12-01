import { FONTS, COLORS } from "../../theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  textValue: {
    fontSize: 18,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
  },
  itemPossible: {
    alignItems: "center",
    flexGrow: 1,
    flexBasis: 0,
  },
  textPossible: {
    fontSize: 8,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
  },
});
