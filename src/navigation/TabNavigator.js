import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import Profile from '../screens/Profile/Profile';
import Dashboard from '../screens/Dashboard/Dashboard';
import Cart from '../screens/Cart/Cart';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../constants/colors';
import Fonts from '../constants/fonts';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="grid" color={color} size={size} />
          ),
          tabBarLabel: 'Dashboard',
        }} />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" color={color} size={size} />
          ),
          tabBarLabel: 'Cart',
        }} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
          tabBarLabel: 'Profile',
        }} />
    </Tab.Navigator>
  );
};

const CustomTabBar = ({
  state: { index: activeIndex, routes },
  navigation,
  descriptors,
}: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.tabBar, { paddingBottom: bottom }]}>
      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const { options } = descriptors[route.key];

          return (
            <TabBarButton
              key={route.key}
              active={active}
              options={options}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};

const TabBarButton = ({ active, options, onPress }) => {
  const scale = useSharedValue(active ? 1.2 : 1);
  const opacity = useSharedValue(active ? 1 : 0.5);
  const translateY = useSharedValue(active ? -10 : 0);

  React.useEffect(() => {
    scale.value = withTiming(active ? 1.2 : 1, { duration: 300 });
    opacity.value = withTiming(active ? 1 : 0.5, { duration: 300 });
    translateY.value = withTiming(active ? -10 : 0, { duration: 300 });
  }, [active]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Pressable onPress={onPress} style={styles.buttonContainer}>
      <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
        {options.tabBarIcon ? options.tabBarIcon({ color: active ? Colors.primary : Colors.gray, size: 24 }) : <Text>?</Text>}
      </Animated.View>
      {typeof options.tabBarLabel === 'string' && (
        <Text
          style={{
            fontSize: 12,
            marginTop: 7,
            fontFamily: active ? Fonts.BOLD : Fonts.MEDIUM,
            color: active ? Colors.primary : Colors.gray,
          }}
        >
          {options.tabBarLabel}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    elevation: 8,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
  },
});

export default TabNavigator;
