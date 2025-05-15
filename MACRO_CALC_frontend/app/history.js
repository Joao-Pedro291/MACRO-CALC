import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.0.228:3000'; // Ajuste o IP

export default function History() {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const res = await axios.get(`${API_URL}/history`);
        setHistorico(res.data);
      } catch (err) {
        // Handle error
      }
    };
    fetchHistorico();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Histórico de Cálculos</Text>
      <FlatList
        data={historico}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text>Data: {new Date(item.data).toLocaleDateString()}</Text>
            <Text>Calorias: {item.calorias}</Text>
            <Text>Proteínas: {item.proteinas} g</Text>
            <Text>Carboidratos: {item.carboidratos} g</Text>
            <Text>Gorduras: {item.gorduras} g</Text>
          </View>
        )}
      />
    </View>
  );
}
