import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Location from 'expo-location';
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

	const [openCondition, setOpenCondition] = useState(false);
	const [openCategory, setOpenCategory] = useState(false);

	const conditionItems = [
		{ label: 'Íntegra', value: 'INTEGRA' },
		{ label: 'Alterada', value: 'ALTERADA' },
		{ label: 'Danificada', value: 'DANIFICADA' },
		{ label: 'Corrompida', value: 'CORROMPIDO' },
		{ label: 'Apagada', value: 'APAGADA' },
		{ label: 'Volátil', value: 'VOLATIL' },
		{ label: 'Inacessível', value: 'INACESSIVEL' },
	];

	const categoryItems = [
		{ label: 'Radiográfica', value: 'RADIOGRAFICA' },
		{ label: 'Fotográfica', value: 'FOTOGRAFICA' },
		{ label: 'Documental', value: 'DOCUMENTAL' },
		{ label: 'Biológica', value: 'BIOLOGICA' },
		{ label: 'Lesional', value: 'LESIONAL' },
	];

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
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
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
		if (
			!pickerResult.canceled &&
			pickerResult.assets &&
			pickerResult.assets.length > 0
		) {
			const manipResult = await ImageManipulator.manipulateAsync(
				pickerResult.assets[0].uri,
				[{ resize: { width: 800 } }],
				{
					compress: 0.7,
					format: ImageManipulator.SaveFormat.JPEG,
					base64: true,
				}
			);
			setPhoto(`data:image/jpeg;base64,${manipResult.base64}`);
		}
	};

	const handleGetLocation = async () => {
		try {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				Dialog.show({
					type: ALERT_TYPE.DANGER,
					title: 'Permissão negada',
					textBody: 'Permita acesso à localização.',
					button: 'OK',
				});
				return;
			}
			let location = await Location.getCurrentPositionAsync({});
			setLatitude(location.coords.latitude.toString());
			setLongitude(location.coords.longitude.toString());
		} catch (error) {
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Erro ao obter localização',
				textBody: 'Não foi possível obter sua localização.',
				button: 'OK',
			});
		}
	};

	const sendEvidence = async () => {
		if (!title || !descriptionTechnical || !condition) {
			Dialog.show({
				type: ALERT_TYPE.WARNING,
				title: 'Campos obrigatórios',
				textBody:
					'Título, descrição técnica e condição são obrigatórios!',
				button: 'OK',
			});
			return;
		}

		const apiURL =
			'https://sistema-odonto-legal.onrender.com/api/evidence/create';
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
					navigation.navigate('CaseDetails', { protocol });
				},
			});
		} catch (error) {
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Erro ao enviar evidência',
				textBody:
					error.response?.data?.message ||
					'Tente novamente mais tarde.',
				button: 'OK',
			});
		}
	};

	return (
		<ScrollView
			contentContainerStyle={styles.container}
			nestedScrollEnabled={true}
		>
			<View style={styles.cardSection}>
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
				<Text style={styles.label}>
					Testemunhas (Relatos/Depoimentos):
				</Text>
				<TextInput
					style={styles.input}
					value={testimony}
					onChangeText={setTestimony}
					placeholder="Insira os relatos/depoimentos"
				/>
				<Text style={styles.label}>
					Imagens (Radiografias/Fotografias Intraorais):*
				</Text>
				<TouchableOpacity
					style={styles.button}
					onPress={handleImagePick}
				>
					<Text style={styles.buttonText1}>Selecionar Imagem</Text>
				</TouchableOpacity>
				{photo && (
					<Image
						source={{ uri: photo }}
						style={{
							width: 200,
							height: 120,
							marginVertical: 10,
							borderRadius: 8,
						}}
					/>
				)}
				<Text style={styles.label}>Condição da Evidência:*</Text>
				<DropDownPicker
					open={openCondition}
					value={condition}
					items={conditionItems}
					setOpen={setOpenCondition}
					setValue={setCondition}
					setItems={() => {}}
					placeholder="Selecione a condição"
					style={styles.input}
					containerStyle={{ marginBottom: openCondition ? 120 : 8 }}
					zIndex={2000}
					listMode="SCROLLVIEW"
				/>
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
				<TouchableOpacity
					style={styles.button}
					onPress={handleGetLocation}
				>
					<Text style={styles.buttonText1}>
						Usar minha localização
					</Text>
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
				<DropDownPicker
					open={openCategory}
					value={category}
					items={categoryItems}
					setOpen={setOpenCategory}
					setValue={setCategory}
					setItems={() => {}}
					placeholder="Selecione a categoria"
					style={styles.input}
					containerStyle={{ marginBottom: 8 }}
					zIndex={1000}
					listMode="SCROLLVIEW"
				/>
				<TouchableOpacity
					style={styles.buttonPrimary}
					onPress={sendEvidence}
				>
					<Text style={styles.buttonText2}>Cadastrar</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}
