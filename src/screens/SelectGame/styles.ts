import { FONTS, COLORS } from './../../theme';
import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: getStatusBarHeight() + 17    
  },
  selection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-end',
    paddingTop: 20,
    paddingBottom: 15,
    fontSize: 20,
    // width: '100%',
    backgroundColor: COLORS.GRAY_TERTIARY,
    fontFamily: FONTS.REGULAR,
  },
  labelPicker: {
    paddingHorizontal: 10,
    paddingTop: 8,
    fontSize: 20,
    fontFamily: FONTS.REGULAR,
    color: COLORS.BLACK_PRIMARY,
  },
  picker: {
    fontSize: 20,
    width: '60%',
    // backgroundColor: COLORS.GRAY_TERTIARY,
    fontFamily: FONTS.REGULAR,
  },
  item: {
    backgroundColor: COLORS.ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: '100%',
    minHeight: 64,
    marginTop: 10,
  },
  text: {
    paddingHorizontal: 10,
    fontSize: 20,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
  },
  icon: {
    fontSize: 20,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
  }
});