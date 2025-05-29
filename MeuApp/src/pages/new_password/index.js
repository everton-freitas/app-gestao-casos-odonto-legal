import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { showMessage } from "react-native-flash-message";

const logo = require("../../assets/logo.png");

const NewPassword = () => {
  const navigation = useNavigation();
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  async function handleNewPassword() {
    if (senha !== confirmaSenha) {
      showMessage({
        message: "Erro",
        description: "As senhas não coincidem!",
        type: "danger",
      });
      return;
    }

    try {
      await axios.post("https://sistema-odonto-legal.onrender.com/api/alter/password", {
        cpf: cpf,
        password: senha,
      });

      showMessage({
        message: "Sucesso!",
        description: "Nova senha cadastrada com sucesso! Aguarde o seu novo acesso ser aprovado.",
        type: "success",
      });
      setTimeout(() => navigation.navigate("Login"), 1500);

    } catch (error) {
      const message = error.response?.data?.message || "Erro ao cadastrar nova senha.";
      showMessage({
        message: "Erro",
        description: message,
        type: "danger",
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.login}>Cadastre sua nova senha</Text>
        <TextInput
          placeholder="CPF"
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirme sua senha"
          style={styles.input}
          value={confirmaSenha}
          onChangeText={setConfirmaSenha}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleNewPassword}>
          <Text style={styles.buttonText}>Cadastrar nova senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewPassword;