import { COLORS, FONTS } from '../../theme';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get("window");
const gridWidth = Math.floor(width * 96/100);
const itemDim = Math.floor(gridWidth / 9) - 4;

console.log('styles log', gridWidth, itemDim);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems:'flex-start'
  },
  gridContainer: {
    backgroundColor: COLORS.GREEN,
    maxWidth: gridWidth,
    maxHeight: gridWidth,
    marginLeft: 8,
    marginTop: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
  item: {
    height: itemDim,
    width: itemDim,
    alignContent: "center",
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
  selectedCell: {
    backgroundColor: COLORS.SELECTED,
  },
  impactedCell: {
    backgroundColor: COLORS.IMPACTED,
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