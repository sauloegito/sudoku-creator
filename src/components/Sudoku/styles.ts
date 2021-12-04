import { COLORS, FONTS } from '../../theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems:'flex-start'
  },
  gridContainer: {
    justifyContent: 'center',
    backgroundColor: COLORS.GREEN,
    width: "96%",
    marginLeft: 8,
    marginTop: 40,
  },
  item: {
    alignItems: "center",
    flexGrow: 1,
    flexBasis: 0,
    margin: 2,
  },
  grid: {
    borderEndColor: COLORS.ORANGE,
    borderBottomColor: COLORS.ORANGE,
    borderEndWidth: 1,
    borderBottomWidth: 1,
  },
  endLine: {
    borderEndColor: COLORS.YELLOW,
    borderEndWidth: 2,
  },
  bottomLine: {
    borderBottomColor: COLORS.YELLOW,
    borderBottomWidth: 2,
  },
  endNone: {
    borderEndWidth: 0,
  },
  bottomNone: {
    borderBottomWidth: 0,
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
  btnControl: {
    alignItems: "center",
    margin: 10,
  },

});