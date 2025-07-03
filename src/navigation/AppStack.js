import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../screens/Cart/Cart';
import Profile from '../screens/Profile/Profile';
import ProductDetail from '../screens/Dashboard/ProductDetail';
import TabNavigator from './TabNavigator';
const Stack = createNativeStackNavigator();
export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName='Dashboard' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={TabNavigator} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
}
