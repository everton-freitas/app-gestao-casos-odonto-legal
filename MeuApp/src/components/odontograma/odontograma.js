import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Dente from "./dente";
import LegendaOdontograma from "./legendaodontograma";

const dentesInfo = [
  { numero: 18, label: "Terceiro Mol. Sup. Direito" },
  { numero: 17, label: "Segundo Mol. Sup. Direito" },
  { numero: 16, label: "Primeiro Mol. Sup. Direito" },
  { numero: 15, label: "Segundo Pré-molar Sup. Direito" },
  { numero: 14, label: "Primeiro Pré-molar Sup. Direito" },
  { numero: 13, label: "Canino Sup. Direito" },
  { numero: 12, label: "Incisivo Lateral Sup. Direito" },
  { numero: 11, label: "Incisivo Central Sup. Direito" },

  { numero: 21, label: "Incisivo Central Sup. Esquerdo" },
  { numero: 22, label: "Incisivo Lateral Sup. Esquerdo" },
  { numero: 23, label: "Canino Sup. Esquerdo" },
  { numero: 24, label: "Primeiro Pré-molar Sup. Esquerdo" },
  { numero: 25, label: "Segundo Pré-molar Sup. Esquerdo" },
  { numero: 26, label: "Primeiro Mol. Sup. Esquerdo" },
  { numero: 27, label: "Segundo Mol. Sup. Esquerdo" },
  { numero: 28, label: "Terceiro Mol. Sup. Esquerdo" },

  { numero: 48, label: "Terceiro Mol. Inf. Esquerdo" },
  { numero: 47, label: "Segundo Mol. Inf. Esquerdo" },
  { numero: 46, label: "Primeiro Mol. Inf. Esquerdo" },
  { numero: 45, label: "Segundo Pré-molar Inf. Esquerdo" },
  { numero: 44, label: "Primeiro Pré-molar Inf. Esquerdo" },
  { numero: 43, label: "Canino Inf. Esquerdo" },
  { numero: 42, label: "Incisivo Lateral Inf. Esquerdo" },
  { numero: 41, label: "Incisivo Central Inf. Esquerdo" },

  { numero: 31, label: "Incisivo Central Inf. Direito" },
  { numero: 32, label: "Incisivo Lateral Inf. Direito" },
  { numero: 33, label: "Canino Inf. Direito" },
  { numero: 34, label: "Primeiro Pré-molar Inf. Direito" },
  { numero: 35, label: "Segundo Pré-molar Inf. Direito" },
  { numero: 36, label: "Primeiro Mol. Inf. Direito" },
  { numero: 37, label: "Segundo Mol. Inf. Direito" },
  { numero: 38, label: "Terceiro Mol. Inf. Direito" },
];

export default function Odontograma({ onChange }) {
  const estadoInicial = {};
  dentesInfo.forEach(({ numero }) => {
    estadoInicial[numero] = "saudável";
  });

  const [estados, setEstados] = useState(estadoInicial);

  const onUpdateEstado = (numero, novoEstado) => {
    const novoEstadoAtualizado = { ...estados, [numero]: novoEstado };
    setEstados(novoEstadoAtualizado);
    onChange(novoEstadoAtualizado);
  };

  const supDireito = dentesInfo.slice(0, 8).reverse();
  const supEsquerdo = dentesInfo.slice(8, 16);
  const infEsquerdo = dentesInfo.slice(16, 24).reverse();
  const infDireito = dentesInfo.slice(24, 32);

  return (
    <ScrollView contentContainerStyle={styles.odontogramaContainer}>
      <View style={styles.linhaDentes}>
        <View style={styles.dentes}>
          <Text style={styles.toothPosition}>Superior Direito</Text>
          <View style={styles.alignTooth}>
            {supDireito.map(({ numero, label }) => (
              <View key={numero} style={styles.denteWrapper}>
                <Dente numero={numero} estado={estados[numero]} onUpdate={onUpdateEstado} />
              </View>
            ))}
          </View>
        </View>
        <View style={styles.dentes}>
          <Text style={styles.toothPosition}>Superior Esquerdo</Text>
          <View style={styles.alignTooth}>
            {supEsquerdo.map(({ numero, label }) => (
              <View key={numero} style={styles.denteWrapper}>
                <Dente numero={numero} estado={estados[numero]} onUpdate={onUpdateEstado} />
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.linhaDentes}>
        <View style={styles.dentes}>
          <Text style={styles.toothPosition}>Inferior Esquerdo</Text>
          <View style={styles.alignTooth}>
            {infEsquerdo.map(({ numero, label }) => (
              <View key={numero} style={styles.denteWrapper}>
                <Dente numero={numero} estado={estados[numero]} onUpdate={onUpdateEstado} />
              </View>
            ))}
          </View>
        </View>
        <View style={styles.dentes}>
          <Text style={styles.toothPosition}>Inferior Direito</Text>
          <View style={styles.alignTooth}>
            {infDireito.map(({ numero, label }) => (
              <View key={numero} style={styles.denteWrapper}>
                <Dente numero={numero} estado={estados[numero]} onUpdate={onUpdateEstado} />
              </View>
            ))}
          </View>
        </View>
      </View>

      <LegendaOdontograma />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  odontogramaContainer: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  
  linhaDentes: {
    flexDirection: "column",
    gap: 12,
    justifyContent: "center",
    width: "100%",
    marginBottom: 12,
  },
  dentes: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  toothPosition: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 8,
    position: 'relative',
    top: 10,
  },
  alignTooth: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  denteWrapper: {
    alignItems: "center",
    margin: 4,
  },
});