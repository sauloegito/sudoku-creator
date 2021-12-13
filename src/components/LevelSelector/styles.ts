import { FONTS, COLORS } from "./../../theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
export const itemWidth = width;

export const styles = StyleSheet.create({
  btnFloat: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLeft: {
    left: 10,
  },
  btnRight: {
    right: 10,
  },
  icon: {
    color: COLORS.GREEN,
  },
  dataContainer: {
    height: 80,
    paddingVertical: 20,
    alignSelf: 'center',
    backgroundColor: COLORS.GRAY_TERTIARY,
  },
  contentContainer: {
    alignSelf: 'center',
    // flexDirection: 'row',
    // justifyContent: 'space-evenly',
  },
  item: {
    alignItems: "center",
    minWidth: itemWidth,
    // marginRight: 50,
  },
  firstItem: {
    // marginLeft: 50,
  },
  text: {
    color: COLORS.BLACK_PRIMARY,
    fontFamily: FONTS.REGULAR,
    fontSize: 30,
  },
  selected: {
    color: COLORS.ORANGE,
    fontFamily: FONTS.BOLD,
  },
});
