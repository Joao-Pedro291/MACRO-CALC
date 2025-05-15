import React, { useState } from "react";
import { View, TextInput, Button, Alert, Picker, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function UserForm() {
  const router = useRouter();

  function vaiPraLista() {
    router.push("/");
  }

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("masculino");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentario");
  const [goal, setGoal] = useState("manter"); // Novo estado

  const handleSaveUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/users", {
        name,
        age: Number(age),
        sex,
        weight: Number(weight),
        height: Number(height),
        activityLevel,
        goal, // Envia o objetivo
      });
      alert("Usuário salvo.");
    } catch (error) {
      alert("Não foi possível salvar o usuário.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} style={styles.input} />
      <TextInput
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <Picker selectedValue={sex} onValueChange={setSex} style={styles.picker}>
        <Picker.Item label="Masculino" value="masculino" />
        <Picker.Item label="Feminino" value="feminino" />
      </Picker>
      <TextInput
        placeholder="Peso (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Altura (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        style={styles.input}
      />
      <Picker selectedValue={activityLevel} onValueChange={setActivityLevel} style={styles.picker}>
        <Picker.Item label="Sedentário" value="sedentario" />
        <Picker.Item label="Leve" value="leve" />
        <Picker.Item label="Moderado" value="moderado" />
        <Picker.Item label="Intenso" value="intenso" />
        <Picker.Item label="Extremo" value="extremo" />
      </Picker>
      {/* Picker de Objetivo */}
      <Picker selectedValue={goal} onValueChange={setGoal} style={styles.picker}>
        <Picker.Item label="Perder peso" value="perder" />
        <Picker.Item label="Manter peso" value="manter" />
        <Picker.Item label="Ganhar peso" value="ganhar" />
      </Picker>

      <Button title="Salvar Usuário" onPress={handleSaveUser} />
      <Button title="Lista de usuários" onPress={vaiPraLista} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
  picker: {
    marginVertical: 6,
  },
});
