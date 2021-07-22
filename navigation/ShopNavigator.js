import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Platform, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsSreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';

import Colors from '../constants/Colors';
import { State } from 'react-native-gesture-handler';
import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const AuthNavigator = createStackNavigator();

const ProductsNavigator = createStackNavigator();

function ProductsStackScreen() {
  return (
    <ProductsNavigator.Navigator
      initialRouteName='ProductsOverview'
      screenOptions={{
        ...defaultNavOptions,
      }}>
      <ProductsNavigator.Screen
        name='ProductsOverview'
        component={ProductsOverviewScreen}
      />
      <ProductsNavigator.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
      />
      <ProductsNavigator.Screen
        name='Cart'
        component={CartScreen}
        options={{ title: 'Your Cart' }}
      />
    </ProductsNavigator.Navigator>
  );
}

const ProductsOptions = {
  drawerIcon: (drawerConfig) => (
    <Ionicons
      name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
      size={23}
      color={drawerConfig.tintColor}
    />
  ),
};

const OrdersNavigator = createStackNavigator();

function OrdersStackScreen() {
  return (
    <OrdersNavigator.Navigator
      initialRouteName='Orders'
      screenOptions={{
        ...defaultNavOptions,
        drawerIcon: (drawerConfig) => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            color={drawerConfig.tintColor}
          />
        ),
      }}>
      <OrdersNavigator.Screen name='Orders' component={OrdersScreen} />
    </OrdersNavigator.Navigator>
  );
}

const OrderOptions = {
  drawerIcon: (drawerConfig) => (
    <Ionicons
      name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
      size={23}
      color={drawerConfig.tintColor}
    />
  ),
};

const AdminNavigator = createStackNavigator();

function AdminStackScreen() {
  return (
    <OrdersNavigator.Navigator
      initialRouteName='Your Products'
      screenOptions={{
        ...defaultNavOptions,
        drawerIcon: (drawerConfig) => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            color={drawerConfig.tintColor}
          />
        ),
      }}>
      <OrdersNavigator.Screen
        name='Your Products'
        component={UserProductsSreen}
      />
      <OrdersNavigator.Screen
        name='Edit Product'
        component={EditProductScreen}
      />
    </OrdersNavigator.Navigator>
  );
}

const AdminOptions = {
  drawerIcon: (drawerConfig) => (
    <Ionicons
      name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
      size={23}
      color={drawerConfig.tintColor}
    />
  ),
};

const ShopNavigator = createDrawerNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const startupComplete = useSelector((state) => state.startup.startupComplete);
  const isSignedIn = useSelector((state) => state.auth.token);

  if (!startupComplete) {
    return <StartupScreen />;
  }

  return (
    <NavigationContainer>
      {!isSignedIn ? (
        <AuthNavigator.Navigator
          screenOptions={{
            ...defaultNavOptions,
          }}>
          <AuthNavigator.Screen
            name='SignIn'
            component={AuthScreen}
            options={{
              animationTypeForReplace: State.isSignout ? 'pop' : 'push',
            }}></AuthNavigator.Screen>
        </AuthNavigator.Navigator>
      ) : (
        <ShopNavigator.Navigator
          initialRouteName='Products'
          drawerContent={(props) => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <Button
                  title='logout'
                  color={Colors.primary}
                  onPress={() => {
                    dispatch(authActions.logout());
                  }}
                />
              </DrawerContentScrollView>
            );
          }}>
          <ShopNavigator.Screen
            name='Products'
            component={ProductsStackScreen}
            options={ProductsOptions}
          />
          <ShopNavigator.Screen
            name='Orders'
            component={OrdersStackScreen}
            options={OrderOptions}
          />
          <ShopNavigator.Screen
            name='Admin'
            component={AdminStackScreen}
            options={AdminOptions}
          />
        </ShopNavigator.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
