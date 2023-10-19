import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Perfil from './Perfil';
import Carteira from './Carteira';
import ContasEGastos from './ContasEGastos';
import Servicos from './Servicos';
import CadastrarDespesa from './CadastrarDespesa';
import CadastrarEntrada from './CadastrarEntrada';

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
            iconName = 'wallet';
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
        component={ContasEGastos}
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
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
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
