import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import DenteModal from "./dentemodal";
import SvgIcon from "../../assets/dente.js";

export default function Dente({ numero, estado, onUpdate }) {
  const [aberto, setAberto] = useState(false);

  const getEstiloEstado = () => {
    switch (estado) {
      case "saudável": return styles.saudavel;
      case "ausente": return styles.ausente;
      case "restaurado": return styles.restaurado;
      case "fraturado": return styles.fraturado;
      case "cariado": return styles.cariado;
      case "implante": return styles.implante;
      default: return styles.outro;
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.botao]}
        onPress={() => setAberto(true)}
      >
        <View style={[styles.sombra, getEstiloEstado()]}>
          <SvgIcon width={200} height={200} />
        </View>

        <Text style={styles.numeroDente}>{numero}</Text>
      </TouchableOpacity>

      <Modal visible={aberto} transparent animationType="slide">
        <DenteModal
          numero={numero}
          estadoAtual={estado}
          onFechar={() => setAberto(false)}
          onSalvar={onUpdate}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  botao: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  imagemDente: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  numeroDente: {
    fontWeight: "bold",
    marginTop: 4,
    fontSize: 14,
    color: "#333",
  },

  sombra: {
    width: 50,
    height: 50,
    elevation: 8,
    position: "relative",
    borderRadius: 25
  },

  saudavel: {
    shadowColor: "#4caf50",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  ausente: {
    shadowColor: "#f44336",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  restaurado: {
    shadowColor: "#2196f3",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  fraturado: {
    shadowColor: "#f3ec21",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  cariado: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  implante: {
    shadowColor: "#9521f3",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  outro: {
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },


  saudavel: {
    shadowColor: '#4caf50', // iOS
    backgroundColor: 'rgba(76, 175, 80, 0.3)', // Simulação no Android
  },
  ausente: {
    shadowColor: '#f44336',
    backgroundColor: 'rgba(244, 67, 54, 0.3)',
  },
  restaurado: {
    shadowColor: '#2196f3',
    backgroundColor: 'rgba(33, 150, 243, 0.3)',
  },
  fraturado: {
    shadowColor: '#f3ec21',
    backgroundColor: 'rgba(243, 236, 33, 0.3)',
  },
  cariado: {
    shadowColor: '#000',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  implante: {
    shadowColor: '#9521f3',
    backgroundColor: 'rgba(149, 33, 243, 0.3)',
  },
  outro: {
    shadowColor: '#999',
    backgroundColor: 'rgba(153, 153, 153, 0.3)',
  },
});