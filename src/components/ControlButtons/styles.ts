import { COLORS, FONTS } from '../../theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  gameControls: {
    paddingTop: 20,
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
  btnControl: {
    alignItems: "center",
    margin: 10,
  },

});