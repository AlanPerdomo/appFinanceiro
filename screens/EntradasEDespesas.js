import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
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

      const recentEntradas = sortedEntradas;
      setEntradas(recentEntradas);
      const somaEntradasCalculada = calcularSoma(recentEntradas);
      setSomaEntradas(somaEntradasCalculada);

      const recentDespesas = sortedDespesas;
      setDespesas(recentDespesas);
      const somaDespesasCalculada = calcularSoma(recentDespesas);
      setSomaDespesas(somaDespesasCalculada);
    } catch (error) {
      console.error('Erro ao buscar dados: ', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  function calcularSoma(itens) {
    return itens.reduce((total, item) => total + extrairValor(item.valor), 0);
  }

  function formatarData(data) {
    const dataObj = new Date(data);
    const dia = dataObj.getDate();
    const mes = dataObj.toLocaleString('pt-BR', { month: 'long' });
    const ano = dataObj.getFullYear();

    return ano === new Date().getFullYear()
      ? `${dia} ${mes}`
      : `${dia} ${mes} ${ano}`;
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

  return (
    <View style={specificStyle.specificContainer}>
      <View style={specificStyle.rowContainer}>
        <View style={specificStyle.listas}>
          <Text style={specificStyle.specificContainer}>
            Soma Entradas: {formatarMoeda(somaEntradas)}
          </Text>
          <Text style={specificStyle.specificContainer}>Entradas Recentes</Text>
          <FlatList
            data={entradas}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={{ fontWeight: 'bold' }}>{item.titulo}</Text>
                <Text style={{ fontWeight: 'bold', color: 'green' }}>
                  Valor: {item.valor}
                </Text>
                <Text style={specificStyle.data}>
                  Data: {formatarData(item.data)}
                </Text>
                <Text>----------------------------------</Text>
              </View>
            )}
          />
        </View>
        <View style={specificStyle.listas}>
          <Text style={specificStyle.specificContainer}>
            Soma Despesas: {formatarMoeda(somaDespesas)}
          </Text>
          <Text style={specificStyle.specificContainer}>Despesas Recentes</Text>
          <FlatList
            data={despesas}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={{ fontWeight: 'bold' }}>{item.titulo}</Text>
                <Text style={{ fontWeight: 'bold', color: 'red' }}>
                  Valor: {item.valor}
                </Text>
                <Text style={specificStyle.data}>
                  Data: {formatarData(item.data)}
                </Text>
                <Text>----------------------------------</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
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
    marginBottom: 10,
  },
  listas: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 125, // Ajuste a margem inferior conforme necessário
  },
  data: {
    fontSize: 10,
  },
});
