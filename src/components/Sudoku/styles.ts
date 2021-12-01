import { COLORS } from '../../theme/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: COLORS.GREEN,
    width: "100%",
    marginLeft: 5,
    marginRight: 12,
    marginTop: 40,
  },
  item: {
    alignItems: "center",
    flexGrow: 1,
    flexBasis: 0,
    margin: 3,
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
  }
});