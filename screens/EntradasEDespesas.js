import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import entradaService from '../services/EntradaService';
import despesaService from '../services/DespesaService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EntradasEDespesas() {
  const [entradas, setEntradas] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [somaEntradas, setSomaEntradas] = useState(0);
  const [somaDespesas, setSomaDespesas] = useState(0);

  const fetchData = async () => {
    try {
      const usuarioId = await AsyncStorage.getItem('USER_ID');

      const responseEntradas =
        await entradaService.listarEntradasPorUsuario(usuarioId);

      const responseDespesas =
        await despesaService.listarDespesasPorUsuario(usuarioId);

      const sortedEntradas = responseEntradas.data.sort(
        (a, b) => new Date(b.data) - new Date(a.data),
      );

      const sortedDespesas = responseDespesas.data.sort(
        (a, b) => new Date(b.data) - new Date(a.data),
      );

      const recentEntradas = sortedEntradas.slice(0, 15);
      setEntradas(recentEntradas);
      const somaEntradasCalculada = calcularSoma(recentEntradas);
      setSomaEntradas(somaEntradasCalculada);

      const recentDespesas = sortedDespesas.slice(0, 15);
      setDespesas(recentDespesas);
      const somaDespesasCalculada = calcularSoma(recentDespesas);
      setSomaDespesas(somaDespesasCalculada);
    } catch (error) {
      console.error('Erro ao buscar dados: ', error);
    }
  };
  function calcularSoma(itens) {
    return itens.reduce((total, item) => total + extrairValor(item.valor), 0);
  }

  function formatarData(data) {
    const dataObj = new Date(data);
    const dia = dataObj.getDate();
    const mes = dataObj.toLocaleString('pt-BR', { month: 'long' });
    const ano = dataObj.getFullYear();

    if (ano === new Date().getFullYear()) {
      return `${dia} ${mes}`;
    } else {
      return `${dia} ${mes} ${ano}`;
    }
  }

  const extrairValor = (valorString) => {
    const valorLimpo = valorString.replace(/[^\d,]/g, ''); // Remove caracteres não numéricos, exceto vírgulas
    const valorNumerico = Number(valorLimpo.replace(',', '.'));

    return isNaN(valorNumerico) ? 0 : valorNumerico;
  };
  function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={specificStyle.specificContainer}>
      <View style={specificStyle.rowContainer}>
        <View style={specificStyle.entradas}>
          <Text style={specificStyle.specificContainer}>
            Soma Entradas: {formatarMoeda(somaEntradas)}
          </Text>
          <Text style={specificStyle.specificContainer}>Entradas Recentes</Text>
          {entradas.length === 0 ? (
            <Text>Nenhuma entrada registrada.</Text>
          ) : (
            entradas.map((entrada, index) => (
              <View key={index}>
                <Text style={{ fontWeight: 'bold' }}>{entrada.titulo}</Text>
                <Text style={{ fontWeight: 'bold', color: 'green' }}>
                  Valor: {entrada.valor}
                </Text>
                <Text style={specificStyle.data}>
                  Data: {formatarData(entrada.data)}
                </Text>
                <Text>----------------------------------</Text>
                {/* Adicione mais informações da entrada, se necessário */}
              </View>
            ))
          )}
        </View>
        <View style={specificStyle.despesas}>
          <Text style={specificStyle.specificContainer}>
            Soma Despesas: {formatarMoeda(somaDespesas)}
          </Text>
          <Text style={specificStyle.specificContainer}>Despesas Recentes</Text>
          {despesas.length === 0 ? (
            <Text>Nenhuma despesa registrada.</Text>
          ) : (
            despesas.map((despesa, index) => (
              <View key={index}>
                <Text style={{ fontWeight: 'bold' }}>{despesa.titulo}</Text>
                <Text style={{ fontWeight: 'bold', color: 'red' }}>
                  Valor: {despesa.valor}
                </Text>
                <Text style={specificStyle.data}>
                  Data: {formatarData(despesa.data)}
                </Text>
                <Text>----------------------------------</Text>
                {/* Adicione mais informações da despesa, se necessário */}
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}
const specificStyle = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  specificContainer: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  entradas: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  despesas: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  data: {
    fontSize: 10,
  },
});
