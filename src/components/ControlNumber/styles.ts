import { FONTS, COLORS } from "../../theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    flex: 1,
    minWidth: 54,
    alignItems: "center",
    margin: 7,
  },
  selected: {
    color: COLORS.WHITE,
    fontFamily: FONTS.BOLD,
  },
  unSelected: {
    color: COLORS.GRAY_PRIMARY,
  },
  text: {
    fontSize: 34,
    fontFamily: FONTS.REGULAR,
    padding: 10,
  },
});
