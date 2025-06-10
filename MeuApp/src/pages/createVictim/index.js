import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Odontograma from "../../components/odontograma/odontograma";
import { Picker } from '@react-native-picker/picker';


const CreateVictim = () => {
  const navigation = useNavigation();
  const APIVICTIM = "https://sistema-odonto-legal.onrender.com/api/patient/create";

  const [formData, setFormData] = useState({
    nic: "",
    name: "N/A",
    age: 0,
    cpf: "",
    gender: "OUTRO",
    location: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      houseNumber: "",
      district: "",
      complement: "",
    },
    identificationStatus: "",
    odontogram: [],
  });

  const [status, setStatus] = useState(false);

  const handleToothUpdate = (toothStates) => {
    setFormData((prevData) => ({
      ...prevData,
      odontogram: toothStates,
    }));
  };

  const handleChange = (name, value) => {
    if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [key]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("token");

    const formattedOdontogram = Object.entries(formData.odontogram)
      .map(([tooth, note]) => ({
        tooth: String(tooth),
        note: note || "",
      }))
      .filter((item) => item.note !== "");

    const dataToSend = {
      ...formData,
      age: parseInt(formData.age),
      location: {
        ...formData.location,
        houseNumber: parseInt(formData.location.houseNumber),
      },
      odontogram: formattedOdontogram,
    };

    try {
      const response = await axios.post(APIVICTIM, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert("Sucesso", "Vítima cadastrada com sucesso!");
      navigation.navigate("Vitimas");
    } catch (err) {
      Alert.alert("Erro", err.response?.data?.message || "Algo deu errado.");
      console.log('erro na criacao de vitima', err.response.data)
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastro da Vítima</Text>

      <TextInput
        style={styles.input}
        placeholder="NIC*"
        value={formData.nic}
        onChangeText={(value) => handleChange("nic", value)}
      />

      <Text style={styles.label}>Status de Identificação*</Text>
      <Picker
        selectedValue={formData.identificationStatus}
        onValueChange={(value) => {
          handleChange("identificationStatus", value);
          setStatus(value === "IDENTIFICADO" || value === "PARCIALMENTE IDENTIFICADO");
        }}
        style={styles.input}
      >
        <Picker.Item label="NÃO IDENTIFICADO" value="NAO IDENTIFICADO" />
        <Picker.Item label="IDENTIFICADO" value="IDENTIFICADO" />
        <Picker.Item label="PARCIALMENTE IDENTIFICADO" value="PARCIALMENTE IDENTIFICADO" />
      </Picker>

      {status && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={formData.name}
            onChangeText={(value) => handleChange("name", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Idade"
            keyboardType="numeric"
            value={formData.age}
            onChangeText={(value) => handleChange("age", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            value={formData.cpf}
            onChangeText={(value) => handleChange("cpf", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Gênero"
            value={formData.gender}
            onChangeText={(value) => handleChange("gender", value)}
          />
          <Text style={styles.subTitle}>Endereço</Text>
          <TextInput
            style={styles.input}
            placeholder="CEP"
            maxLength={8}
            value={formData.location.zipCode}
            onChangeText={(value) => handleChange("location.zipCode", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Rua"
            value={formData.location.street}
            onChangeText={(value) => handleChange("location.street", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Número"
            keyboardType="numeric"
            value={formData.location.houseNumber}
            onChangeText={(value) => handleChange("location.houseNumber", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Bairro"
            value={formData.location.district}
            onChangeText={(value) => handleChange("location.district", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={formData.location.city}
            onChangeText={(value) => handleChange("location.city", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Estado (ex: PE)"
            value={formData.location.state}
            onChangeText={(value) => handleChange("location.state", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Complemento"
            value={formData.location.complement}
            onChangeText={(value) => handleChange("location.complement", value)}
          />

          <Text style={styles.subTitle}>Odontograma</Text>
          <Odontograma onChange={handleToothUpdate} />
        </>
      )}

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Cadastrar Vítima
      </Button>
    </ScrollView>
  );
};

export default CreateVictim;

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
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "600",
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    marginTop: 30,
    padding: 10,
    marginBottom: 80,
  },
});