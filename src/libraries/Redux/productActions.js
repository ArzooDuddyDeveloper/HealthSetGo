import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../../utils/api';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const products = await fetchProducts();
  return products;
});
