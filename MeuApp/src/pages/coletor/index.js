
import React, { useState, useRef } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ScrollView,
	StyleSheet,
	Button,
	Alert,
	ActivityIndicator,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f0f4f7',
		paddingVertical: 20,
	},
	cameraContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000',
	},
	permissionText: {
		color: '#FFF',
		fontSize: 18,
		textAlign: 'center',
		marginBottom: 20,
	},
	captureButtonContainer: {
		position: 'absolute',
		bottom: 50,
		alignSelf: 'center',
	},
	cardSection: {
		width: '95%',
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 15,
		elevation: 3,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	preview: {
		width: '100%',
		height: 200,
		borderRadius: 8,
		marginBottom: 15,
		backgroundColor: '#e1e1e1',
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 5,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 10,
		marginBottom: 15,
		fontSize: 16,
		color: '#333',
	},
	buttonPrimary: {
		backgroundColor: '#012130',
		padding: 15,
		borderRadius: 8,
		alignItems: 'center',
	},
	buttonText2: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default function ColetorEvidencia() {
	const navigation = useNavigation();

	// --- ESTADOS DA CÂMERA E DO FLUXO ---
	const [permission, requestPermission] = useCameraPermissions();
	const cameraRef = useRef(null);
	const [base64Photo, setBase64Photo] = useState(null); // Armazenará a foto em base64
	const [photoUri, setPhotoUri] = useState(null); // Armazenará a URI para preview
	const [isLoading, setIsLoading] = useState(false);

	// --- ESTADOS DO SEU FORMULÁRIO ORIGINAL ---
	const [protocol, setProtocol] = useState(''); // Novo estado para o protocolo
	const [title, setTitle] = useState('');
	const [testimony, setTestimony] = useState('');
	const [descriptionTechnical, setDescriptionTechnical] = useState('');
	const [condition, setCondition] = useState('');
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [obs, setObs] = useState('');
	const [category, setCategory] = useState('');
	const [openCondition, setOpenCondition] = useState(false);
	const [openCategory, setOpenCategory] = useState(false);

	// --- ITENS DOS DROPDOWNS ---
	const conditionItems = [
		{ label: 'Íntegra', value: 'INTEGRA' },
		{ label: 'Alterada', value: 'ALTERADA' },
		{ label: 'Danificada', value: 'DANIFICADA' },
	];
	const categoryItems = [
		{ label: 'Radiográfica', value: 'RADIOGRAFICA' },
		{ label: 'Fotográfica', value: 'FOTOGRAFICA' },
		{ label: 'Documental', value: 'DOCUMENTAL' },
	];

	const resetForm = () => {
		setProtocol('');
		setTitle('');
		setTestimony('');
		setDescriptionTechnical('');
		setBase64Photo(null);
		setPhotoUri(null);
		setCondition('');
		setLatitude('');
		setLongitude('');
		setObs('');
		setCategory('');
	};

	const handleTakePhoto = async () => {
		if (cameraRef.current) {
			try {
				const result = await cameraRef.current.takePictureAsync();
				const manipResult = await ImageManipulator.manipulateAsync(
					result.uri,
					[{ resize: { width: 680 } }],
					{
						compress: 0.3,
						format: ImageManipulator.SaveFormat.JPEG,
						base64: true,
					}
				);
				setBase64Photo(`data:image/jpeg;base64,${manipResult.base64}`);
				setPhotoUri(manipResult.uri);
			} catch (error) {
				console.error('Erro ao tirar e manipular foto:', error);
				Alert.alert('Erro', 'Não foi possível processar a foto.');
			}
		}
	};

	const handleGetLocation = async () => {
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
		Toast.show({ type: ALERT_TYPE.SUCCESS, title: 'Localização obtida!' });
	};

	const sendEvidence = async () => {
		if (
			!protocol ||
			!title ||
			!descriptionTechnical ||
			!condition ||
			!category
		) {
			Dialog.show({
				type: ALERT_TYPE.WARNING,
				title: 'Campos obrigatórios',
				textBody:
					'Protocolo, Título, Descrição, Condição e Categoria são obrigatórios!',
				button: 'OK',
			});
			return;
		}

		setIsLoading(true);
		const apiURL =
			'https://sistema-odonto-legal.onrender.com/api/evidence/create';
		const dados = {
			title,
			testimony,
			descriptionTechnical,
			photo: base64Photo,
			condition,
			latitude,
			longitude,
			obs,
			category,
		};

		try {
			await axios.post(apiURL, dados, {
				headers: {
					authorization: `Bearer ${await AsyncStorage.getItem(
						'token'
					)}`,
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
					navigation.goBack(); // Volta para a tela anterior
				},
			});
		} catch (error) {
			console.log('Erro ao enviar evidência:', error);
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Erro ao enviar evidência',
				textBody:
					error.response?.data?.message ||
					'Tente novamente mais tarde.',
				button: 'OK',
			});
		} finally {
			setIsLoading(false);
		}
	};

	// --- RENDERIZAÇÃO CONDICIONAL ---

	if (!permission) {
		return <View />;
	}
	if (!permission.granted) {
		return (
			<View style={styles.cameraContainer}>
				<Text style={styles.permissionText}>
					Precisamos da sua permissão para usar a câmera.
				</Text>
				<Button
					title="Conceder Permissão"
					onPress={requestPermission}
				/>
			</View>
		);
	}

	// SE NENHUMA FOTO FOI TIRADA, MOSTRA A CÂMERA
	if (!photoUri) {
		return (
			<View style={styles.cameraContainer}>
				<CameraView
					ref={cameraRef}
					style={StyleSheet.absoluteFill}
					facing="back"
				/>
				<View style={styles.captureButtonContainer}>
					<TouchableOpacity onPress={handleTakePhoto}>
						<Icon name="camera-iris" size={80} color="#fff" />
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	// SE UMA FOTO FOI TIRADA, MOSTRA O FORMULÁRIO COMPLETO
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.cardSection}>
				<Text style={styles.label}>Evidência Capturada</Text>
				<Image source={{ uri: photoUri }} style={styles.preview} />
				<TouchableOpacity
					onPress={() => {
						setPhotoUri(null);
						setBase64Photo(null);
					}}
				>
					<Text
						style={{
							color: 'red',
							textAlign: 'center',
							marginBottom: 20,
						}}
					>
						Tirar outra foto
					</Text>
				</TouchableOpacity>

				<Text style={styles.label}>Nº do Protocolo do Caso:*</Text>
				<TextInput
					style={styles.input}
					value={protocol}
					onChangeText={setProtocol}
					placeholder="Insira o nº do protocolo"
				/>

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

				<Text style={styles.label}>Condição da Evidência:*</Text>
				<DropDownPicker
					open={openCondition}
					value={condition}
					items={conditionItems}
					setOpen={setOpenCondition}
					setValue={setCondition}
					placeholder="Selecione a condição"
					style={styles.input}
					zIndex={2000}
					listMode="SCROLLVIEW"
				/>

				<Text style={styles.label}>Categoria:*</Text>
				<DropDownPicker
					open={openCategory}
					value={category}
					items={categoryItems}
					setOpen={setOpenCategory}
					setValue={setCategory}
					placeholder="Selecione a categoria"
					style={styles.input}
					zIndex={1000}
					listMode="SCROLLVIEW"
				/>

				<Text style={styles.label}>Geolocalização (Opcional)</Text>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 15,
					}}
				>
					<TextInput
						style={[styles.input, { flex: 1, marginBottom: 0 }]}
						value={latitude}
						onChangeText={setLatitude}
						placeholder="Latitude"
						keyboardType="numeric"
					/>
					<TextInput
						style={[
							styles.input,
							{ flex: 1, marginBottom: 0, marginLeft: 10 },
						]}
						value={longitude}
						onChangeText={setLongitude}
						placeholder="Longitude"
						keyboardType="numeric"
					/>
					<TouchableOpacity
						onPress={handleGetLocation}
						style={{ marginLeft: 10 }}
					>
						<Icon name="map-marker" size={30} color="#012130" />
					</TouchableOpacity>
				</View>

				<Text style={styles.label}>Observação:</Text>
				<TextInput
					style={[styles.input, { height: 60 }]}
					value={obs}
					onChangeText={setObs}
					placeholder="Insira uma observação"
					multiline
				/>

				<TouchableOpacity
					style={styles.buttonPrimary}
					onPress={sendEvidence}
					disabled={isLoading}
				>
					{isLoading ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text style={styles.buttonText2}>
							Cadastrar Evidência
						</Text>
					)}
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}
