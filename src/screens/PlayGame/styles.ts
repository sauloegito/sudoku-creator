import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems:'flex-start'
  },
  btnBack: {
    marginTop: 40,
    marginBottom: -20,
  },
  allControls: {
    width: "100%",
    flexDirection: "column",
    marginBottom: 40,
  },
  gameControls: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-evenly',
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
  },
  icon: {
    color: COLORS.WHITE,
  },
  item: {
    alignItems: "center",
    margin: 10,
  },
});
