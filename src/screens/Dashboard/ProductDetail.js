import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';

// Redux action to add products to the cart
import { addToCart } from '../../libraries/Redux/cartSlice';

// Common styles and custom components
import { commonStyles } from '../../constants/commonStyle';
import Wrapper from '../../components/Wrapper';
import CustomButton from '../../components/CustomButton';
import CustomHeader from '../../components/CustomHeader';
import QuantityButton from '../../components/QuantityButton';

export default function ProductDetail({ route, navigation }) {
  // Get product details passed via route params
  const { product } = route.params;

  const dispatch = useDispatch(); // Redux dispatch function

  const [quantity, setQuantity] = useState(1); // State to manage selected quantity

  // Function to handle adding product to cart
  const handleAddToCart = () => {
    if (product && product.id && product.title) {
      // Add the product to the cart 'quantity' number of times
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
      Alert.alert('Success', 'Product added to cart');
      navigation.navigate('Dashboard'); // Navigate back to the Dashboard after adding
    } else {
      Alert.alert('Error', 'Invalid product data');
    }
  };

  // Increase product quantity
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Decrease product quantity, minimum is 1
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <Wrapper>
      {/* Custom header with title */}
      <CustomHeader title="Product Details" />

      {/* Product information container */}
      <View style={commonStyles.containerPadding}>
        {/* Product Image */}
        <Image source={{ uri: product.image }} style={styles.image} />

        {/* Product Title */}
        <Text style={commonStyles.bold_txt}>{product.title}</Text>

        {/* Product Description */}
        <Text style={commonStyles.description}>{product.description}</Text>

        {/* Product Price */}
        <Text style={commonStyles.price}>${product.price}</Text>

        {/* Quantity selection buttons */}
        <QuantityButton
          quantity={quantity}
          onIncrement={incrementQuantity}
          onDecrement={decrementQuantity}
        />

        {/* Button to add product to cart */}
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
