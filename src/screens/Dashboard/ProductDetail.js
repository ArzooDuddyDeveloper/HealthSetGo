import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../libraries/Redux/cartSlice';
import { commonStyles } from '../../constants/commonStyle';
import Wrapper from '../../components/Wrapper';
import CustomButton from '../../components/CustomButton';
import CustomHeader from '../../components/CustomHeader';
import QuantityButton from '../../components/QuantityButton';
import Colors from '../../constants/colors';

export default function ProductDetail({ route, navigation }) {
  const { product } = route.params;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product && product.id && product.title) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
      Alert.alert('Success', 'Product added to cart');
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Error', 'Invalid product data');
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <Wrapper>
      <CustomHeader title="Product Details" />
      <View style={commonStyles.containerPadding}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={commonStyles.bold_txt}>{product.title}</Text>
        <Text style={commonStyles.description}>{product.description}</Text>
        <Text style={commonStyles.price}>${product.price}</Text>
        <QuantityButton
          quantity={quantity}
          onIncrement={incrementQuantity}
          onDecrement={decrementQuantity}/>
        <CustomButton title="Add to Cart" onPress={handleAddToCart} />
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
