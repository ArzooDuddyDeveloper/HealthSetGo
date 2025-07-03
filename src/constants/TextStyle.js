import { StyleSheet } from 'react-native';
import Fonts from './fonts';
import Colors from './colors';

export const TEXT_STYLES = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },
  subHeading: {
    fontSize: 18,
    fontFamily: Fonts.medium,
    color: Colors.white,
  },
  body: {
    fontSize: 16,
    fontFamily:Fonts.regular,
    color: Colors.black,
  },
  small: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.white,
  },
  buttonText: {
    fontSize: 16,
    fontFamily:Fonts.bold,
    color: Colors.white,
    textAlign: 'center',
  },
});
