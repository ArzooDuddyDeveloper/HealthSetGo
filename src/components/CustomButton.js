import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import Fonts from '../constants/fonts';
import { commonStyles } from '../constants/commonStyle';

export default function CustomButton({ title, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.button, style,commonStyles.shadow]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.orange,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontFamily:Fonts.medium
  },
});