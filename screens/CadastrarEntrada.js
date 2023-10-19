import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/MainStyle';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CadastrarEntrada(navigation) {
  const [titulo, setTitulo] = useState('');
  const [comentario, setComentario] = useState('');
  const [valor, setValor] = useState('');
  const [errorTitulo, setErrorTitulo] = useState(null);
  const [errorValor, setErrorValor] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const validar = () => {
    let error = false;
    setErrorTitulo(null);

    if (titulo == null) {
      setErrorTitulo('Título é obrigatório');
    }
    if (valor == null) {
      setErrorTitulo('Valor é obrigatório');
    }
  };
  const salvar = () => {
    if (validar()) {
      setLoading(true);
      let data = {
        titulo: titulo,
        valor: valor,
        comentario: comentario,
      };
    }
  };
  const voltar = () => {
    navigation.navigate('Principal');
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
        <Text style={styles.title}>Cadastrar Entrada</Text>

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
              icon={<Icon name="check" size={15} color="white" />}
              buttonStyle={styles.buttonStyle}
              title="Salvar"
              onPress={() => salvar()} // Implemente a função de salvar
            />
            <Button
              icon={<Icon name="remove" size={15} color="white" />}
              buttonStyle={styles.buttonStyle}
              title="Cancelar"
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
});
