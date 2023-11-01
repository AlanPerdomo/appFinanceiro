import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import entradaService from '../services/EntradaService';

export default function Carteira() {
  const [entradas, setEntradas] = useState([]);
  const usuarioId = 63;

  const fetchData = async () => {
    try {
      const response = await entradaService.listarEntradasPorUsuario(usuarioId);

      const sortedEntradas = response.data.sort(
        (a, b) => new Date(b.data) - new Date(a.data),
      );

      const recentEntradas = sortedEntradas.slice(0, 10);

      setEntradas(recentEntradas);
    } catch (error) {
      console.error('Erro ao buscar dados: ', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Carteira</Text>
      <Text>5 Entradas Mais Recentes:</Text>
      {entradas.map((entrada, index) => (
        <View key={index}>
          <Text>{entrada.titulo}</Text>
          <Text style={{ fontWeight: 'bold', color: 'green' }}>
            Valor: {entrada.valor} BRL
          </Text>
          <Text>Data: {entrada.data}</Text>
          {/* Adicione mais informações da entrada, se necessário */}
        </View>
      ))}
    </View>
  );
}
