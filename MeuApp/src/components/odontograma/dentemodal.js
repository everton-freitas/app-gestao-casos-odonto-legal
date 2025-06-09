import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const estados = ["saudável", "restaurado", "ausente", "cariado", "fraturado", "implante"];

export default function DenteModal({ numero, estadoAtual, onFechar, onSalvar }) {
  const [outro, setOutro] = useState("");

  const selecionar = (estado) => {
    onSalvar(numero, estado);
    onFechar();
  };

  const handleOutro = () => {
    if (outro.trim() !== "") {
      onSalvar(numero, outro.trim());
      onFechar();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.fundo}>
        <TouchableWithoutFeedback>
          <View style={styles.modal}>
            <Text style={styles.titulo}>Dente {numero}</Text>
            <Text style={styles.subtitulo}>
              Estado atual: <Text style={{ fontWeight: "bold" }}>{estadoAtual || "não definido"}</Text>
            </Text>

            <View style={styles.lista}>
              {estados.map((e) => (
                <TouchableOpacity key={e} style={styles.botao} onPress={() => selecionar(e)}>
                  <Text>{e}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.textOutro}><Text style={{ fontWeight: "bold" }}>Outro</Text></Text>
            <View style={styles.outro}>
              <TextInput
                style={styles.input}
                value={outro}
                onChangeText={setOutro}
                placeholder="Descreva outro estado"
              />
              <TouchableOpacity style={styles.botao} onPress={handleOutro}>
                <Text>Enviar</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.botao, { marginTop: 10 }]} onPress={onFechar}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    width: 300,
    borderRadius: 10,
    alignItems: "center",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 14,
    marginBottom: 10,
  },
  lista: {
    width: "100%",
    gap: 10,
    marginTop: 10,
  },
  botao: {
    padding: 10,
    backgroundColor: "#eee",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 6,
  },
  textOutro: {
    marginTop: 12,
  },
  outro: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    flex: 1,
    marginRight: 6,
  },
});
