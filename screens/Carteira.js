import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';

export default function Carteira({ navigation }) {
  function cadastrarEntrada(tipoEntrada) {
    navigation.navigate('CadastrarEntrada', { tipoEntrada });
  }
  function cadastrarDespesa(tipoDespesa) {
    navigation.navigate('CadastrarDespesa', { tipoDespesa });
  }

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 200,
          height: 200,
          marginBottom: 20,
          alignSelf: 'center',
        }}
        source={require('../assets/logo.png')}
      />
      <Text style={styles.title}>Bem Vinda(o),</Text>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.buttonStyle}
          icon={<Icon name="plus" size={15} color="green" />}
          title={' Adicionar Entrada'}
          onPress={() => cadastrarEntrada('entrada')}
        />

        <Button
          buttonStyle={styles.buttonStyle}
          icon={<Icon name="minus" size={15} color="red" />}
          title={' Adicionar Despesa'}
          onPress={() => cadastrarDespesa('despesa')}
        />
      </View>
    </View>
  );
}
