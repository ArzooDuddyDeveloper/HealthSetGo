import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/colors';
import Fonts from '../constants/fonts';

export default function CustomHeader({ title, onSearch,IconName,onPressLeft }) {
  const navigation = useNavigation();
  const { cartItems } = useSelector((state) => state.cart);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onPressLeft}>
        <Icon name={IconName} size={28} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.rightIcons}>
        {onSearch && (
          <TouchableOpacity onPress={onSearch} style={{ marginRight: 15 }}>
            <Icon name="search" size={28} color="white" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('Cart')}>
          <Icon name="cart" size={28} color="white" />
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.medium,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIcon: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: Colors.rejected,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
});
