import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/MainStyle';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/FontAwesome';
import despesaService from '../services/DespesaService';

export default function CadastrarDespesa({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [comentario, setComentario] = useState('');
  const [valor, setValor] = useState('');
  const [errorTitulo, setErrorTitulo] = useState(null);
  const [errorValor, setErrorValor] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const validar = () => {
    let error = false;
    setErrorValor(null);
    if (valor == '' || valor == null) {
      setErrorValor('Valor é obrigatório');
      error = true;
    }
    return !error;
  };
  const salvar = () => {
    if (validar()) {
      setLoading(true);
      let data = {
        titulo: titulo || '',
        valor: valor,
        descricao: comentario || '',
      };
      console.log(data);
      despesaService
        .cadastrar(data)
        .then((response) => {
          setLoading(false);
          Alert.alert('Sucesso', response.data.message);
          setValor('');
          setComentario('');
          setTitulo('');
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert('Erro', error.response.data.message);
        });
    }
  };
  const voltar = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Principal' }],
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, specificStyle.specificContainer]}
      keyboardVerticalOffset={100}
    >
      <View>
        <Image
          style={{
            width: 200,
            height: 200,
            marginBottom: 20,
            marginTop: 30,
            alignSelf: 'center',
          }}
          source={require('../assets/logo.png')}
        />
        <Text style={[styles.title, specificStyle.title]}>
          Cadastrar Despesa
        </Text>

        <View style={styles.containerMask}>
          <TextInputMask
            placeholder="R$ 0,00"
            type={'money'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$',
              suffixUnit: '',
            }}
            value={valor}
            onChangeText={(value) => {
              setValor(value);
              setErrorValor(null);
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            style={styles.maskedInput}
            ref={(ref) => (valorField = ref)}
          />
        </View>
        <Text style={styles.errorMessage}>{errorValor}</Text>

        <Input
          placeholder="Título"
          value={titulo}
          onChangeText={(value) => {
            setTitulo(value);
            setErrorTitulo(null);
          }}
          errorMessage={errorTitulo}
        />
        <Input
          placeholder="Comentario"
          value={comentario}
          onChangeText={(value) => setComentario(value)}
        />

        {isLoading && <Text>Carregando...</Text>}
        {!isLoading && (
          <>
            <Button
              icon={<Icon name="check" size={15} color="green" />}
              buttonStyle={[styles.buttonStyle, specificStyle.title]}
              title=" Salvar"
              onPress={() => salvar()}
            />
            <Button
              icon={<Icon name="remove" size={15} color="white" />}
              buttonStyle={styles.buttonStyle}
              title=" Cancelar"
              onPress={() => voltar()} // Implemente a função de salvar
            />
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const specificStyle = StyleSheet.create({
  specificContainer: {
    padding: 10,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
  title: {
    color: 'red',
  },
});
