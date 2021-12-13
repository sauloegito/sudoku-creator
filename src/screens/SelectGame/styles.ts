import { FONTS, COLORS } from "./../../theme";
import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    paddingTop: getStatusBarHeight() + 17,
  },
  item: {
    backgroundColor: COLORS.ORANGE,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    width: "100%",
    minHeight: 64,
    marginTop: 10,
  },
  text: {
    paddingHorizontal: 10,
    fontSize: 20,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
  },
});
