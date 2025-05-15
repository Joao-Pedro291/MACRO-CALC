import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Resultado() {
  const router = useRouter();

  function volta() {
    router.push("/");
  }

  const { userId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [macros, setMacros] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("ID recebido:", userId);

    if (!userId) {
      setError("Usuário não informado.");
      setLoading(false);
      return;
    }

    async function fetchMacros() {
      try {
        const res = await axios.get(
          `http://192.168.0.228:3000/api/calc/${userId}`
        );
        setMacros(res.data);
      } catch (err) {
        setError("Erro ao buscar dados: " + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMacros();
  }, [userId]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>Erro: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.result}>Calorias: {macros.calories}</Text>
      <Text style={styles.result}>Proteínas: {macros.protein}g</Text>
      <Text style={styles.result}>Carboidratos: {macros.carbs}g</Text>
      <Text style={styles.result}>Gorduras: {macros.fats}g</Text>
      <Button title="Voltar para cadastro" onPress={volta} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  result: {
    fontSize: 16,
    marginBottom: 8,
  },
  error: {
    color: "red",
    margin: 20,
    fontSize: 16,
  },
});
