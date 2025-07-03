import { StyleSheet, Dimensions } from 'react-native';
import Colors from './colors';
import Fonts from './fonts';

const { width } = Dimensions.get('window');

export const commonStyles = StyleSheet.create({
  input: {
    width: '100%',
    padding: width * 0.04,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: Colors.white,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    marginBottom: 40,
    color: Colors.primary,
    textAlign: 'center',
    fontFamily: Fonts.bold
  },
  containerPadding: {
    paddingHorizontal: width * 0.05,
    marginVertical: 20
  },
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 2,
    shadowRadius: 2,
    elevation: 2
  },
  bold_txt: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.primary,
    textAlign: 'center',
    fontFamily: Fonts.bold
  },
  description: {
    fontSize: 12,
    color: Colors.gray,
    fontFamily: Fonts.medium
  },
  price: {
    fontSize: 16,
    color: Colors.assigned,
    fontFamily: Fonts.medium
  },
});