import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Perfil from './Perfil';

function Carteira() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Carteira</Text>
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Principal() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          display: 'flex',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'carteira') {
            iconName = 'home';
          } else if (route.name === 'Notifications') {
            iconName = 'bell';
          } else if (route.name === 'Perfil') {
            iconName = 'account';
          }

          return (
            <MaterialCommunityIcons name={iconName} color={color} size={size} />
          );
        },
      })}
    >
      <Tab.Screen
        name="carteira"
        component={Carteira}
        options={{
          tabBarLabel: 'Carteira',
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
}
