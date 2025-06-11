import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function UserTable() {
  const router = useRouter();

  function vaiProCadastro() {
    router.push("/cadastro");
  }

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://192.168.0.228:3000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.age}</Text>
      <Text style={styles.cell}>{item.sex}</Text>
      <Text style={styles.cell}>{item.weight}kg</Text>
      <Text style={styles.cell}>{item.height}cm</Text>
      <Text style={styles.cell}>{item.activityLevel}</Text>
      <Text style={styles.cell}>{item.goal}</Text> 
      <View style={{ flex: 1 }}>
        <Button
          title="Calcular"
          onPress={() =>
            router.push(`/resultado?userId=${item._id || item.id}`)
          }
        />
      </View>
    </View>
  );

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.header}>Usuários Cadastrados</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Nome</Text>
        <Text style={styles.headerCell}>Idade</Text>
        <Text style={styles.headerCell}>Sexo</Text>
        <Text style={styles.headerCell}>Peso</Text>
        <Text style={styles.headerCell}>Altura</Text>
        <Text style={styles.headerCell}>Atividade</Text>
        <Text style={styles.headerCell}>Objetivo</Text> 
        <Text style={styles.headerCell}>Ação</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <Button title="Cadastro" onPress={vaiProCadastro} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    padding: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  cell: {
    flex: 1,
    fontSize: 12,
  },
});
