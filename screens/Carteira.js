import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usuarioService from '../services/UsuarioService';
import entradaService from '../services/EntradaService';
import despesaService from '../services/DespesaService';

export default function Carteira({ navigation }) {
  const [saldo, setSaldo] = useState('R$');
  const [nomeUsuario, setNomeUsuario] = useState('*Usuario*');

  const fetchData = async () => {
    try {
      const usuarioId = await AsyncStorage.getItem('USER_ID');
      const responseUsuario = await usuarioService.obterUsuario(usuarioId);
      const responseEntradas =
        await entradaService.listarEntradasPorUsuario(usuarioId);
      const responseDespesas =
        await despesaService.listarDespesasPorUsuario(usuarioId);

      const saldoTotal = calcularSaldoTotal(
        responseEntradas.data,
        responseDespesas.data,
      );
      setSaldo(saldoTotal);
      setNomeUsuario(responseUsuario.data.nome);
    } catch (error) {
      console.error('Erro ao buscar dados: ', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  function cadastrarEntrada(tipoEntrada) {
    navigation.navigate('CadastrarEntrada', { tipoEntrada });
  }
  function cadastrarDespesa(tipoDespesa) {
    navigation.navigate('CadastrarDespesa', { tipoDespesa });
  }
  const calcularSaldoTotal = (entradas, despesas) => {
    const totalEntradas = entradas.reduce(
      (total, entrada) => total + extrairValor(entrada.valor),
      0,
    );

    const totalDespesas = despesas.reduce(
      (total, despesa) => total + extrairValor(despesa.valor),
      0,
    );

    return totalEntradas - totalDespesas;
  };

  const extrairValor = (valorString) => {
    const valorLimpo = valorString.replace(/[^\d,]/g, ''); // Remove caracteres não numéricos, exceto vírgulas
    const valorNumerico = Number(valorLimpo.replace(',', '.'));

    return isNaN(valorNumerico) ? 0 : valorNumerico;
  };
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const handleAtualizarSaldo = () => {
    fetchData();
  };
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
      <Text style={styles.title}>Bem Vinda(o), {nomeUsuario}.</Text>
      <>
        <Text
          style={[
            styles.title,
            saldo < 0 ? { color: 'red' } : { color: 'green' },
          ]}
        >
          Saldo: {formatarMoeda(saldo)}
        </Text>
      </>
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
        <Button
          buttonStyle={styles.buttonStyle}
          icon={<Icon name="refresh" size={15} color="#007bff" />}
          title={' Atualizar Saldo'}
          onPress={handleAtualizarSaldo}
        />
      </View>
    </View>
  );
}
