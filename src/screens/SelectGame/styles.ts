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
    justifyContent: 'space-evenly',
    paddingTop: 10,
    paddingBottom: 30,
    width: '100%',
  },
  item: {
    backgroundColor: COLORS.ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: '100%',
    minHeight: 64,
    marginBottom: 10,
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