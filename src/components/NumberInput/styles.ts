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
    fontSize: 28,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
  },
  viewPossible: {
    // backgroundColor: COLORS.PINK,
    width: "100%",
    height: "100%",
  },
  itemPossible: {
    alignItems: "center",
    flexGrow: 1,
    flexBasis: 0,
    backgroundColor: COLORS.ORANGE,
  },
  textPossible: {
    width: "95%",
    height: "95%",
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
  },
  textReadonly: {
    color: COLORS.GRAY_QUATERNARY,
  }
});
