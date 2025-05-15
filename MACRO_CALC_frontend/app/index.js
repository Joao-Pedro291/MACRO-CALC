import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Picker } from 'react-native';
import axios from 'axios';

export default function UserForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('masculino');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentario');

  const handleSaveUser = async () => {
    try {
      const response = await axios.post('http://192.168.0.228:3000/api/users', {
        name,
        age: Number(age),
        sex,
        weight: Number(weight),
        height: Number(height),
        activityLevel,
      });
      Alert.alert('Sucesso', 'Usuário salvo com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o usuário');
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput placeholder="Idade" value={age} onChangeText={setAge} keyboardType="numeric" />
      {/* Aqui você pode usar Picker para sexo */}
      <Picker selectedValue={sex} onValueChange={setSex}>
        <Picker.Item label="Masculino" value="masculino" />
        <Picker.Item label="Feminino" value="feminino" />
      </Picker>
      <TextInput placeholder="Peso (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" />
      <TextInput placeholder="Altura (cm)" value={height} onChangeText={setHeight} keyboardType="numeric" />
      <Picker selectedValue={activityLevel} onValueChange={setActivityLevel}>
        <Picker.Item label="Sedentário" value="sedentario" />
        <Picker.Item label="Leve" value="leve" />
        <Picker.Item label="Moderado" value="moderado" />
        <Picker.Item label="Intenso" value="intenso" />
        <Picker.Item label="Extremo" value="extremo" />
      </Picker>
      <Button title="Salvar Usuário" onPress={handleSaveUser} />
    </View>
  );
}
