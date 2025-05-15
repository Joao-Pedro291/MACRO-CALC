import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, Picker, Platform } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.0.228:3000'; // Troque para o IP do seu backend

export default function UserForm() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('masculino');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [atividade, setAtividade] = useState('sedentario');

const handleSubmit = async () => {
  try {
    const data = {
      nome,
      idade: Number(idade),
      sexo,
      peso: Number(peso),
      altura: Number(altura),
      atividade,
    };
    const res = await axios.post(`${API_URL}/users`, data);
    Alert.alert('Sucesso', 'Usuário cadastrado/atualizado!');
  } catch (err) {
    console.error(err);
    Alert.alert('Erro', `Falha ao cadastrar usuário: ${err.message}`);
  }
};

  return (
    <View>
      <Text>Nome</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Idade</Text>
      <TextInput
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Sexo</Text>
      {Platform.OS === 'android' ? (
        <Picker selectedValue={sexo} onValueChange={setSexo} style={{ marginBottom: 10 }}>
          <Picker.Item label="Masculino" value="masculino" />
          <Picker.Item label="Feminino" value="feminino" />
        </Picker>
      ) : (
        <TextInput
          value={sexo}
          onChangeText={setSexo}
          style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        />
      )}

      <Text>Peso (kg)</Text>
      <TextInput
        value={peso}
        onChangeText={setPeso}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Altura (cm)</Text>
      <TextInput
        value={altura}
        onChangeText={setAltura}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Nível de Atividade</Text>
      {Platform.OS === 'android' ? (
        <Picker selectedValue={atividade} onValueChange={setAtividade} style={{ marginBottom: 10 }}>
          <Picker.Item label="Sedentário" value="sedentario" />
          <Picker.Item label="Levemente ativo" value="levemente_ativo" />
          <Picker.Item label="Moderadamente ativo" value="moderadamente_ativo" />
          <Picker.Item label="Muito ativo" value="muito_ativo" />
          <Picker.Item label="Extremamente ativo" value="extremamente_ativo" />
        </Picker>
      ) : (
        <TextInput
          value={atividade}
          onChangeText={setAtividade}
          style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        />
      )}

      <Button title="Salvar Usuário" onPress={handleSubmit} />
    </View>
  );
}
