import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import Fonts from '../constants/fonts';
import { commonStyles } from '../constants/commonStyle';

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={[styles.card, commonStyles.shadow]} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={commonStyles.bold_txt}>{product.title}</Text>
      <Text style={commonStyles.price}>${product.price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    marginHorizontal: 20

  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 15,
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: Fonts.medium,
  },
});