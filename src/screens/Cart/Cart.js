import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../../libraries/Redux/cartSlice';
import Wrapper from '../../components/Wrapper';
import { commonStyles } from '../../constants/commonStyle';
import CustomButton from '../../components/CustomButton';
import CustomHeader from '../../components/CustomHeader';
import QuantityButton from '../../components/QuantityButton';
import Colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from '../../constants/fonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Cart() {
  const { bottom } = useSafeAreaInsets();

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleIncrement = useCallback((id) => {
    dispatch(incrementQuantity(id));
  }, [dispatch]);

  const handleDecrement = useCallback((id) => {
    dispatch(decrementQuantity(id));
  }, [dispatch]);

  const handleRemove = useCallback((id) => {
    dispatch(removeFromCart(id));
  }, [dispatch]);

  const renderCartItem = useCallback(({ item }) => (
    <View style={[styles.itemContainer, commonStyles.shadow]}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>${item.price} x {item.quantity}</Text>

      <QuantityButton
        quantity={item.quantity}
        onIncrement={() => handleIncrement(item.id)}
        onDecrement={() => handleDecrement(item.id)}
      />

      <CustomButton
        title="Remove"
        onPress={() => handleRemove(item.id)}
        style={styles.removeButton}
      />
    </View>
  ), [handleIncrement, handleDecrement, handleRemove]);

  if (cartItems.length === 0) {
    return (
      <Wrapper>
        <View style={[commonStyles.containerPadding, styles.emptyCartContainer]}>
          <Text style={styles.emptyCart}>Your cart is empty</Text>
          <Icon name={'cart'} size={170} color={Colors.border}/>
        </View>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <CustomHeader title="Cart" />
      <View style={commonStyles.containerPadding}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCartItem}
          showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: bottom + 70 }}
        />
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  emptyCart: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: Colors.gray,
  },
  itemContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: Colors.white,
    borderRadius: 8
  },
  itemTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily:Fonts.medium
  },
  itemPrice: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: Colors.rejected,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
