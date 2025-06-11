import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.0.228:3000'; 

export default function Calculation() {
  const [resultado, setResultado] = useState(null);

  const calcularMacros = async () => {
    try {
      const userResponse = await axios.get(`${API_URL}/users`);
      const user = userResponse.data[0]; 

      if (!user) {
        Alert.alert('Erro', 'Nenhum usuário cadastrado.');
        return;
      }

      const res = await axios.post(`${API_URL}/calculate`, {
        idade: user.idade,
        sexo: user.sexo,
        peso: user.peso,
        altura: user.altura,
        atividade: user.atividade,
        objetivo: 'manutencao', 
      });

      setResultado(res.data);
    } catch (err) {
      Alert.alert('Erro', 'Falha ao calcular macronutrientes.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Calcular Macronutrientes" onPress={calcularMacros} />
      {resultado && (
        <View style={{ marginTop: 20 }}>
          <Text>Calorias: {resultado.calorias}</Text>
          <Text>Proteínas: {resultado.proteinas} g</Text>
          <Text>Carboidratos: {resultado.carboidratos} g</Text>
          <Text>Gorduras: {resultado.gorduras} g</Text>
        </View>
      )}
    </View>
  );
}
