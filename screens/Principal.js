import * as React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Perfil from './Perfil';
import Carteira from './Carteira';
import EntradasEDespesas from './EntradasEDespesas';
import Servicos from './Servicos';

const Tab = createBottomTabNavigator();

export default function Principal() {
  return (
    <Tab.Navigator
      initialRouteName="Carteira"
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

          if (route.name === 'Carteira') {
            iconName = 'pie-chart';
          } else if (route.name === 'Notifications') {
            iconName = 'bell';
          } else if (route.name === 'Serviços') {
            iconName = 'format-list-checks';
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
        name="Carteira"
        component={Carteira}
        options={{
          tabBarLabel: 'Carteira',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallet" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Entradas e Despesas"
        component={EntradasEDespesas}
        options={{
          tabBarLabel: 'Entradas/Despesas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="transfer" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Serviços"
        component={Servicos}
        options={{
          tabBarLabel: 'Serviços',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="traffic-cone"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/userHolder.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
