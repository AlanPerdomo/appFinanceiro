import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import usuarioService from '../services/UsuarioService';
import styles from '../style/MainStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingToken, setLoadingToken] = useState(true);

  const entrar = () => {
    let data = {
      username: email,
      password: password,
    };
    usuarioService
      .login(data)
      .then((response) => {
        setLoading(false);
        const userId = response.data.ID;
        AsyncStorage.setItem('USER_ID', userId.toString());
        navigation.reset({
          index: 0,
          routes: [{ name: 'Principal' }],
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Alert.alert('Usuario não existe');
      });
  };

  const logarComToken = (token) => {
    setLoadingToken(true);
    let data = {
      token: token,
    };

    usuarioService
      .loginComToken(data)
      .then((response) => {
        setLoadingToken(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Principal' }],
        });
      })
      .catch((error) => {
        setLoadingToken(false);
      });
  };

  const cadastrar = () => {
    navigation.navigate('Cadastro');
  };

  useEffect(() => {
    AsyncStorage.getItem('TOKEN').then((token) => {
      logarComToken(token);
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={{ width: '100%' }}>
        {isLoadingToken && <Text>Carregando...</Text>}
        {!isLoadingToken && (
          <>
            <Image
              style={{
                width: 200,
                height: 200,
                marginBottom: 20,
                marginTop: 125,
                alignSelf: 'center',
              }}
              source={require('../assets/logo.png')}
            />
            <Text style={{ textAlign: 'center' }} h3>
              Meu Controle Financeiro
            </Text>
            <Input
              placeholder="E-mail"
              leftIcon={{ type: 'font-awesome', name: 'envelope' }}
              onChangeText={(value) => setEmail(value)}
              keyboardType="email-address"
            />
            <Input
              placeholder="Sua senha"
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={(value) => setPassword(value)}
              secureTextEntry={true}
            />

            {isLoading && <ActivityIndicator />}

            {!isLoading && (
              <Button
                icon={<Icon name="check" size={15} color="white" />}
                title="Entrar"
                buttonStyle={styles.buttonStyle}
                onPress={() => entrar()}
              />
            )}

            <Button
              icon={<Icon name="user" size={15} color="white" />}
              title=" Cadastrar"
              buttonStyle={styles.buttonStyle}
              onPress={() => cadastrar()}
            />
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
