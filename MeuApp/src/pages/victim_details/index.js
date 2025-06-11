import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VictimDetail = () => {
  const route = useRoute();
  const { nic } = route.params;

  const [victim, setVictim] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVictim = async () => {
      const token = await AsyncStorage.getItem('token')
      try {
        const response = await fetch(`https://sistema-odonto-legal.onrender.com/api/patient/search?nic=${nic}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        );
        const data = await response.json();
        console.log(data)
        console.log(nic)
        setVictim(data);

      } catch (error) {
        console.error("Erro ao buscar vítima:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVictim();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} color="#000" />;
  }

  if (!victim) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, color: "red" }}>
          Não foi possível carregar os dados da vítima.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalhes da Vítima</Text>

      <Text style={styles.label}>NIC:</Text>
      <Text style={styles.value}>{victim.nic}</Text>

      <Text style={styles.label}>Status de Identificação:</Text>
      <Text style={styles.value}>{victim.identificationStatus}</Text>

      {(victim.identificationStatus === "IDENTIFICADO" || victim.identificationStatus === "PARCIALMENTE IDENTIFICADO") && (
        <>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{victim.name || "N/A"}</Text>

          <Text style={styles.label}>Idade:</Text>
          <Text style={styles.value}>{victim.age || "N/A"}</Text>

          <Text style={styles.label}>CPF:</Text>
          <Text style={styles.value}>{victim.cpf || "N/A"}</Text>

          <Text style={styles.label}>Gênero:</Text>
          <Text style={styles.value}>{victim.gender || "N/A"}</Text>

          <Text style={styles.subTitle}>Endereço</Text>
          <Text style={styles.value}>Rua: {victim.location?.street || "N/A"}</Text>
          <Text style={styles.value}>Número: {victim.location?.houseNumber || "N/A"}</Text>
          <Text style={styles.value}>Bairro: {victim.location?.district || "N/A"}</Text>
          <Text style={styles.value}>Cidade: {victim.location?.city || "N/A"}</Text>
          <Text style={styles.value}>Estado: {victim.location?.state || "N/A"}</Text>
          <Text style={styles.value}>CEP: {victim.location?.zipCode || "N/A"}</Text>
          <Text style={styles.value}>Complemento: {victim.location?.complement || "N/A"}</Text>
        </>
      )}

      <Text style={styles.subTitle}>Odontograma</Text>

      {victim.odontogram && victim.odontogram.length > 0 ? (
        victim.odontogram.map((item, index) => (
          <View key={index} style={styles.odontogramItem}>
            <Text style={styles.label}>Dente {item.tooth}:</Text>
            <Text style={styles.value}>{item.note || 'N/A'}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.value}>Nenhuma informação odontológica registrada.</Text>
      )}
    </ScrollView>
  );
};

export default VictimDetail;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    fontWeight: "500",
    marginTop: 10,
  },
  value: {
    marginBottom: 10,
    fontSize: 16,
  },
  odontogramItem: {
  flexDirection: 'row',
  gap: 4,
  marginBottom: 20,
},
label: {
  fontWeight: 'bold',
},
value: {
  flex: 1,
},
});