import React from "react";
import { View, Text, StyleSheet } from "react-native";

const estados = [
  { nome: "Saudável", cor: "#4caf50" },
  { nome: "Ausente", cor: "#f44336" },
  { nome: "Restaurado", cor: "#2196f3" },
  { nome: "Fraturado", cor: "#f3ec21" },
  { nome: "Cariado", cor: "#000000" },
  { nome: "Implante", cor: "#9521f3" },
  { nome: "Outro", cor: "#999999" },
];

const LegendaOdontograma = () => {
  return (
    <View style={styles.legendaOdontograma}>
      {estados.map((estado) => (
        <View style={styles.itemLegenda} key={estado.nome}>
          <View style={[styles.corLegenda, { backgroundColor: estado.cor }]} />
          <Text style={styles.name}>{estado.nome}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  legendaOdontograma: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 32,
    justifyContent: "flex-end",
  },
  itemLegenda: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginRight: 10,
    marginBottom: 6,
  },
  corLegenda: {
    width: 16,
    height: 16,
    borderRadius: 3,
  },
  name: {
    fontSize: 12,
  },
});

export default LegendaOdontograma;