import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles'; 

export default function EvidenceRegistrationPage() {
    const navigation = useNavigation();
    const route = useRoute();
    const protocol = route.params?.protocol;

    const [title, setTitle] = useState('');
    const [testimony, setTestimony] = useState('');
    const [descriptionTechnical, setDescriptionTechnical] = useState('');
    const [photo, setPhoto] = useState(null);
    const [condition, setCondition] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [obs, setObs] = useState('');
    const [category, setCategory] = useState('');

    const resetForm = () => {
        setTitle('');
        setTestimony('');
        setDescriptionTechnical('');
        setPhoto(null);
        setCondition('');
        setLatitude('');
        setLongitude('');
        setObs('');
        setCategory('');
    };

    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Permissão negada',
                textBody: 'Permita acesso à galeria.',
                button: 'OK',
            });
            return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
            base64: true,
        });
        if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
            const manipResult = await ImageManipulator.manipulateAsync(
                pickerResult.assets[0].uri,
                [{ resize: { width: 800 } }],
                { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
            );
            setPhoto(`data:image/jpeg;base64,${manipResult.base64}`);
        }
    };

    const handleGetLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude.toString());
                setLongitude(position.coords.longitude.toString());
            },
            (error) => {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Erro ao obter localização',
                    textBody: 'Não foi possível obter sua localização.',
                    button: 'OK',
                });
            }
        );
    };

    const sendEvidence = async () => {
        if (!title || !descriptionTechnical || !condition) {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Campos obrigatórios',
                textBody: 'Título, descrição técnica e condição são obrigatórios!',
                button: 'OK',
            });
            return;
        }

        const apiURL = 'https://sistema-odonto-legal.onrender.com/api/evidence/create';
        const dados = {
            title,
            testimony,
            descriptionTechnical,
            photo,
            condition,
            latitude,
            longitude,
            obs,
            category,
        };

        try {
            Toast.show({
                type: ALERT_TYPE.INFO,
                title: 'Enviando evidência...',
                textBody: 'Por favor, aguarde',
            });
            await axios.post(apiURL, dados, {
                headers: {
                    authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                params: { protocol },
            });
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Evidência cadastrada!',
                textBody: 'Os dados foram enviados com sucesso.',
                button: 'OK',
                onHide: () => {
                    resetForm();
                    navigation.navigate('Casos');
                },
            });
        } catch (error) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Erro ao enviar evidência',
                textBody: error.response?.data?.message || 'Tente novamente mais tarde.',
                button: 'OK',
            });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Cadastro de Evidências</Text>
            <Text style={styles.label}>Título:*</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Insira um título"
            />
            <Text style={styles.label}>Descrição Técnica:*</Text>
            <TextInput
                style={styles.input}
                value={descriptionTechnical}
                onChangeText={setDescriptionTechnical}
                placeholder="Insira a descrição técnica"
            />
            <Text style={styles.label}>Testemunhas (Relatos/Depoimentos):</Text>
            <TextInput
                style={styles.input}
                value={testimony}
                onChangeText={setTestimony}
                placeholder="Insira os relatos/depoimentos"
            />
            <Text style={styles.label}>Imagens (Radiografias/Fotografias Intraorais):*</Text>
            <TouchableOpacity style={styles.button} onPress={handleImagePick}>
                <Text style={styles.buttonText}>Selecionar Imagem</Text>
            </TouchableOpacity>
            {photo && (
                <Image
                    source={{ uri: photo }}
                    style={{ width: 200, height: 120, marginVertical: 10, borderRadius: 8 }}
                />
            )}
            <Text style={styles.label}>Condição da Evidência:*</Text>
            <Picker
                selectedValue={condition}
                style={styles.input}
                onValueChange={(itemValue) => setCondition(itemValue)}
            >
                <Picker.Item label="Selecione a condição" value="" />
                <Picker.Item label="Íntegra" value="INTEGRA" />
                <Picker.Item label="Alterada" value="ALTERADA" />
                <Picker.Item label="Danificada" value="DANIFICADA" />
                <Picker.Item label="Corrompida" value="CORROMPIDO" />
                <Picker.Item label="Apagada" value="APAGADA" />
                <Picker.Item label="Volátil" value="VOLATIL" />
                <Picker.Item label="Inacessível" value="INACESSIVEL" />
            </Picker>
            <Text style={styles.label}>Latitude:</Text>
            <TextInput
                style={styles.input}
                value={latitude}
                onChangeText={setLatitude}
                placeholder="Insira a latitude"
                keyboardType="numeric"
            />
            <Text style={styles.label}>Longitude:</Text>
            <TextInput
                style={styles.input}
                value={longitude}
                onChangeText={setLongitude}
                placeholder="Insira a longitude"
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleGetLocation}>
                <Text style={styles.buttonText}>Usar minha localização</Text>
            </TouchableOpacity>
            <Text style={styles.label}>Observação:</Text>
            <TextInput
                style={[styles.input, { height: 60 }]}
                value={obs}
                onChangeText={setObs}
                placeholder="Insira uma observação"
                multiline
            />
            <Text style={styles.label}>Categoria:*</Text>
            <Picker
                selectedValue={category}
                style={styles.input}
                onValueChange={(itemValue) => setCategory(itemValue)}
            >
                <Picker.Item label="Selecione a categoria" value="" />
                <Picker.Item label="Radiográfica" value="RADIOGRAFICA" />
                <Picker.Item label="Fotográfica" value="FOTOGRAFICA" />
                <Picker.Item label="Documental" value="DOCUMENTAL" />
                <Picker.Item label="Biológica" value="BIOLOGICA" />
                <Picker.Item label="Lesional" value="LESIONAL" />
            </Picker>
            <TouchableOpacity style={styles.buttonPrimary} onPress={sendEvidence}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};