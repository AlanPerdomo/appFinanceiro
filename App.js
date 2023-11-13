import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Principal from './screens/Principal';
import Cadastro from './screens/Cadastro';
import CadastrarEntrada from './screens/CadastrarEntrada';
import CadastrarDespesa from './screens/CadastrarDespesa';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, headerBackground: null }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Principal" component={Principal} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="CadastrarEntrada" component={CadastrarEntrada} />
      <Stack.Screen name="CadastrarDespesa" component={CadastrarDespesa} />
    </Stack.Navigator>
  );
}

function defineInterceptor() {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      return new Promise((resolve, reject) => {
        const originalReq = err.config;
        if (err.response.status === 401 && err.config && !err.config._retry) {
          originalReq._retry = true;
          AsyncStorage.getItem('TOKEN').then((token) => {
            let res = axios
              .put(`${Config.API_URL}token/refresh`, {
                oldToken: token,
              })
              .then((res) => {
                AsyncStorage.setItem('TOKEN', res.data.token);
                originalReq.headers[
                  'Authorization'
                ] = `Bearer ${res.data.token}`;
                return axios(originalReq);
              });
            resolve(res);
          });
        } else {
          reject(err);
        }
      });
    },
  );
}

export default function App() {
  defineInterceptor();
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
