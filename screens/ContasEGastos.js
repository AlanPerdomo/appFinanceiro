import * as React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';

export default function ContasEGastos({ navigation }) {
  function navigateToAddEntry(tipoEntrada) {
    navigation.navigate('Movimentacao', { tipoEntrada });
  }
  return (
    <View style={styles.container}>
      <Text>O que você deseja cadastrar?</Text>
      <Button
        buttonStyle={styles.buttonStyle}
        icon={<Icon name="plus" size={15} color="white" />}
        title={'Valor de Entrada'}
        onPress={() => navigateToAddEntry('entrada')}
      />
      <Button
        buttonStyle={styles.buttonStyle}
        icon={<Icon name="minus" size={15} color="white" />}
        title={'Conta a Pagar'}
        onPress={() => navigateToAddEntry('despesa')}
      />
      <Button
        buttonStyle={styles.buttonStyle}
        icon={<Icon name="repeat" size={15} color="white" />}
        title={'Conta Recorrente Mensal'}
        onPress={() => navigateToAddEntry('despesaMensal')}
      />
      <Button
        buttonStyle={styles.buttonStyle}
        icon={<Icon name="calendar" size={15} color="white" />}
        title={'Valor Mensal de Entrada'}
        onPress={() => navigateToAddEntry('entradaMensal')}
      />
    </View>
  );
}
