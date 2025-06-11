import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles';

export default function CaseCreated() {
	const navigation = useNavigation();

	const [title, setTitle] = useState('');
	const [inquiryNumber, setInquiryNumber] = useState('');
	const [requestingInstitution, setRequestingInstitution] = useState('');
	const [requestingAuthority, setRequestingAuthority] = useState('');
	const [caseType, setCaseType] = useState('');
	const [observations, setObservations] = useState('');
	const [questions, setQuestions] = useState([{ question: 'N/A' }]);
	const [nic, setNic] = useState(['']);
	const [location, setLocation] = useState({
		street: '',
		houseNumber: '',
		district: '',
		city: '',
		state: '',
		zipCode: '',
		complement: '',
	});
	const [users, setUsers] = useState([]);
	const [envolved, setEnvolved] = useState([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const [openCaseType, setOpenCaseType] = useState(false);
	const [caseTypeItems, setCaseTypeItems] = useState([
		{ label: 'IDENTIFICAÇÃO', value: 'IDENTIFICAÇÃO' },
		{
			label: 'AVALIAÇÃO DE LESÕES CORPORAIS',
			value: 'AVALIAÇÃO DE LESÕES CORPORAIS',
		},
		{ label: 'COLETA DE PROVA', value: 'COLETA DE PROVA' },
		{
			label: 'PERÍCIA DE RESPONSABILIDADE',
			value: 'PERÍCIA DE RESPONSABILIDADE',
		},
		{ label: 'EXAME DE VIOLÊNCIA', value: 'EXAME DE VIOLÊNCIA' },
		{ label: 'ANÁLISE MULTIVÍTIMA', value: 'ANÁLISE MULTIVÍTIMA' },
		{ label: 'OUTROS', value: 'OUTROS' },
	]);

	const limparCampos = () => {
		setNic(['']);
		setTitle('');
		setInquiryNumber('');
		setCaseType('');
		setObservations('');
		setLocation({
			street: '',
			houseNumber: '',
			district: '',
			city: '',
			state: '',
			zipCode: '',
			complement: '',
		});
		setEnvolved([]);
		setDropdownOpen(false);
	};

	const adicionarCampo = () => {
		setNic([...nic, '']);
	};

	const handleChange = (i, valor) => {
		const novosCampos = [...nic];
		novosCampos[i] = valor;
		setNic(novosCampos);
	};

	const handleQuestionChange = (index, value) => {
		const updatedQuestions = [...questions];
		updatedQuestions[index].question = value;
		setQuestions(updatedQuestions);
	};

	const addQuestion = () => {
		setQuestions([...questions, { question: '' }]);
	};

	const removeQuestion = index => {
		const updatedQuestions = [...questions];
		updatedQuestions.splice(index, 1);
		setQuestions(updatedQuestions);
	};

	const handleLocationChange = (field, value) => {
		setLocation(prev => ({
			...prev,
			[field]: field === 'houseNumber' ? value.replace(/\D/g, '') : value,
		}));
	};

	const toggleUser = userId => {
		setEnvolved(prev =>
			prev.includes(userId)
				? prev.filter(id => id !== userId)
				: [...prev, userId]
		);
	};

	useEffect(() => {
		const fetchUsers = async () => {
			const token = await AsyncStorage.getItem('token');
			try {
				const res = await axios.get(
					'https://sistema-odonto-legal.onrender.com/api/search/button',
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					}
				);
				setUsers(res.data);
			} catch (error) {
				Dialog.show({
					type: ALERT_TYPE.DANGER,
					title: 'Erro ao buscar usuários',
					textBody: 'Não foi possível buscar os profissionais.',
					button: 'OK',
				});
			}
		};
		fetchUsers();
	}, []);

	useEffect(() => {
		const cep = location.zipCode;
		if (cep && cep.length === 8 && /^[0-9]{8}$/.test(cep)) {
			fetch(`https://viacep.com.br/ws/${cep}/json/`)
				.then(res => res.json())
				.then(data => {
					if (data.erro) {
						Dialog.show({
							type: ALERT_TYPE.DANGER,
							title: 'Erro',
							textBody: 'CEP não encontrado',
							button: 'OK',
						});
						return;
					}
					setLocation(prev => ({
						...prev,
						street: data.logradouro || '',
						district: data.bairro || '',
						city: data.localidade || '',
						state: data.uf || '',
					}));
				})
				.catch(() => {
					Dialog.show({
						type: ALERT_TYPE.DANGER,
						title: 'Erro',
						textBody: 'Não foi possível consultar o CEP',
						button: 'OK',
					});
				});
		}
	}, [location.zipCode]);

	const handleSubmit = async () => {
		const token = await AsyncStorage.getItem('token');
		const data = {
			nic,
			title,
			inquiryNumber,
			requestingInstitution,
			requestingAuthority,
			caseType,
			observations,
			location,
			questions,
			professional: envolved,
		};

		Dialog.show({
			type: ALERT_TYPE.INFO,
			title: 'Cadastrando...',
			textBody: 'Por favor, aguarde enquanto o caso é cadastrado.',
			autoClose: false,
		});
		setLoading(true);
		try {
			const caseResponse = await axios.post(
				'https://sistema-odonto-legal.onrender.com/api/cases/create',
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);

			Dialog.hide();
			if (caseResponse.status === 201) {
				Dialog.show({
					type: ALERT_TYPE.SUCCESS,
					title: 'Caso cadastrado!',
					textBody: 'Clique em OK para ir para a tela de casos.',
					button: 'OK',
					onHide: () => {
						limparCampos();
						navigation.navigate('Home', { screen: 'Casos' });
					},
				});
			} else {
				Dialog.show({
					type: ALERT_TYPE.DANGER,
					title: 'Erro ao cadastrar o caso',
					textBody:
						caseResponse.err?.response?.data?.message ||
						'Tente novamente mais tarde.',
					button: 'OK',
				});
			}
		} catch (err) {
			Dialog.hide();
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Erro',
				textBody:
					err.response?.data?.message ||
					'Tente novamente mais tarde.',
				button: 'OK',
			});
		}
		setLoading(false);
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.cardSection}>
				<Text style={styles.label}>NIC*:</Text>
				{nic.map((valor, i) => (
					<TextInput
						key={i}
						style={styles.input}
						placeholder={`Campo opcional ${i + 1}`}
						value={valor}
						onChangeText={text => handleChange(i, text)}
					/>
				))}
				<TouchableOpacity
					style={styles.button}
					onPress={adicionarCampo}
				>
					<Text style={styles.buttonText}>Adicionar outro NIC</Text>
				</TouchableOpacity>

				<Text style={styles.label}>Título*:</Text>
				<TextInput
					style={styles.input}
					placeholder="Título"
					value={title}
					onChangeText={setTitle}
				/>
				<Text style={styles.label}>Número do Inquérito*:</Text>
				<TextInput
					style={styles.input}
					placeholder="Número do Inquérito"
					value={inquiryNumber}
					onChangeText={setInquiryNumber}
				/>
				<Text style={styles.label}>Instituição Requisitante*:</Text>
				<TextInput
					style={styles.input}
					placeholder="Instituição requisitante"
					value={requestingInstitution}
					onChangeText={setRequestingInstitution}
				/>
				<Text style={styles.label}>Autoridade Requisitante*:</Text>
				<TextInput
					style={styles.input}
					placeholder="Autoridade requisitante"
					value={requestingAuthority}
					onChangeText={setRequestingAuthority}
				/>
				<Text style={styles.label}>Tipo de Caso*:</Text>
				<DropDownPicker
					open={openCaseType}
					value={caseType}
					items={caseTypeItems}
					setOpen={setOpenCaseType}
					setValue={setCaseType}
					setItems={setCaseTypeItems}
					placeholder="Selecione o tipo de caso"
					style={styles.input}
					containerStyle={{ marginBottom: 8 }}
					zIndex={2000}
					listMode="SCROLLVIEW"
				/>
				<Text style={styles.label}>Observações:</Text>
				<TextInput
					style={[styles.input, { height: 60 }]}
					placeholder="Observações"
					value={observations}
					onChangeText={setObservations}
					multiline
				/>
				<Text style={styles.label}>Perguntas do Requisitante*:</Text>
				{questions.map((q, index) => (
					<View
						key={index}
						style={{ flexDirection: 'row', alignItems: 'center' }}
					>
						<TextInput
							style={[styles.input, { flex: 1 }]}
							placeholder={`Pergunta ${index + 1}`}
							value={q.question}
							onChangeText={text =>
								handleQuestionChange(index, text)
							}
						/>
						{questions.length > 1 && (
							<TouchableOpacity
								onPress={() => removeQuestion(index)}
							>
								<Text style={{ color: 'red', marginLeft: 8 }}>
									Remover
								</Text>
							</TouchableOpacity>
						)}
					</View>
				))}
				<TouchableOpacity style={styles.button} onPress={addQuestion}>
					<Text style={styles.buttonText}>
						Adicionar nova pergunta
					</Text>
				</TouchableOpacity>

				<Text style={styles.label}>CEP:</Text>
				<TextInput
					style={styles.input}
					placeholder="Digite o CEP (apenas números)"
					value={location.zipCode}
					maxLength={8}
					keyboardType="numeric"
					onChangeText={text =>
						handleLocationChange('zipCode', text.replace(/\D/g, ''))
					}
				/>
				<Text style={styles.label}>Rua:</Text>
				<TextInput
					style={styles.input}
					placeholder="Digite o nome da rua"
					value={location.street}
					onChangeText={text => handleLocationChange('street', text)}
				/>
				<Text style={styles.label}>Número:</Text>
				<TextInput
					style={styles.input}
					placeholder="Digite o número da casa"
					value={location.houseNumber}
					keyboardType="numeric"
					onChangeText={text =>
						handleLocationChange('houseNumber', text)
					}
				/>
				<Text style={styles.label}>Bairro:</Text>
				<TextInput
					style={styles.input}
					placeholder="Digite o bairro"
					value={location.district}
					onChangeText={text =>
						handleLocationChange('district', text)
					}
				/>
				<Text style={styles.label}>Estado:</Text>
				<TextInput
					style={styles.input}
					placeholder="Digite o estado"
					value={location.state}
					onChangeText={text => handleLocationChange('state', text)}
				/>
				<Text style={styles.label}>Cidade:</Text>
				<TextInput
					style={styles.input}
					placeholder="Digite a cidade"
					value={location.city}
					onChangeText={text => handleLocationChange('city', text)}
				/>
				<Text style={styles.label}>Complemento:</Text>
				<TextInput
					style={styles.input}
					placeholder="Digite o complemento"
					value={location.complement}
					onChangeText={text =>
						handleLocationChange('complement', text)
					}
				/>

				<Text style={styles.label}>Profissionais Envolvidos:</Text>
				<TouchableOpacity
					style={styles.button}
					onPress={() => setDropdownOpen(!dropdownOpen)}
				>
					<Text style={styles.buttonText}>
						Selecionar profissionais
					</Text>
				</TouchableOpacity>
				{dropdownOpen && (
					<View style={{ marginBottom: 12 }}>
						{users.map(user => (
							<TouchableOpacity
								key={user._id}
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									marginBottom: 4,
								}}
								onPress={() => toggleUser(user._id)}
							>
								<Text style={{ marginRight: 8 }}>
									{envolved.includes(user._id) ? '☑' : '☐'}
								</Text>
								<Text>
									{user.name} ({user.role})
								</Text>
							</TouchableOpacity>
						))}
					</View>
				)}
				{envolved.length > 0 && (
					<View style={{ marginBottom: 12 }}>
						<Text style={{ fontWeight: 'bold' }}>
							Profissionais selecionados:
						</Text>
						{users
							.filter(u => envolved.includes(u._id))
							.map(u => (
								<Text key={u._id}>
									{u.name} ({u.role})
								</Text>
							))}
					</View>
				)}

				<TouchableOpacity
					style={styles.buttonPrimary}
					onPress={handleSubmit}
					disabled={loading}
				>
					{loading ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text style={styles.buttonText2}>Cadastrar</Text>
					)}
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}
