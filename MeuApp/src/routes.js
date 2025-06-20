import React from 'react';
import { Platform, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { headerStyles } from './pages/login/styles';
import { COLORS } from './Colors';
import Login from './pages/login';
import NewPassword from './pages/new_password';
import TabRoutes from './TabRoutes';
import Profile from './pages/profile';
import CaseDetails from './pages/case_details';
import CustomHeader from './components/header';
import ReportEvidence from './pages/report_evidence';
import CaseReport from './pages/case_report';
import CreateVictim from './pages/createVictim';
import Vitimas from './pages/victims';
import VictimDetail from './pages/victim_details';
import GenerateReportScreen from './pages/imprimir_laudo';
import ImprimirRelatorio from './pages/imprimir_relatorio';
import CaseCreated from './pages/case_created';
import EvidenceRegistrationPage from './pages/evidence_registration_page';

// Somente importa se não estiver na web
const AlertNotificationRoot =
	Platform.OS !== 'web'
		? require('react-native-alert-notification').AlertNotificationRoot
		: ({ children }) => <>{children}</>;

const Stack = createStackNavigator();

export default function Routes() {
	return (
		<AlertNotificationRoot
			theme={{
				colors: {
					primary: '#1E88E5',
					success: '#E2B93B',
				},
			}}
		>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Login"
					screenOptions={{
						title: 'Dentalysis',
						headerStyle: headerStyles.header,
						headerTintColor: COLORS.primary,
						headerTitleAlign: 'left',
						headerLeft: () => (
							<Image
								source={require('./assets/logo.png')}
								style={headerStyles.logo}
								resizeMode="contain"
							/>
						),
					}}
				>
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="NewPassword" component={NewPassword} />
					<Stack.Screen
						name="Home"
						component={TabRoutes}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Profile"
						component={Profile}
						options={{
							header: () => (
								<CustomHeader title="Sair da conta" />
							),
						}}
					/>

					<Stack.Screen
						name="ImprimirRelatorio"
						component={ImprimirRelatorio}
						options={{
							header: () => (
								<CustomHeader title="Imprimir Relatorio" />
							),
						}}
					/>

					<Stack.Screen
						name="CaseDetails"
						component={CaseDetails}
						options={{
							header: () => (
								<CustomHeader title="Detalhes do Caso" />
							),
						}}
					/>
					<Stack.Screen
						name="CaseCreated"
						component={CaseCreated}
						options={{
							header: () => <CustomHeader title="Criar caso" />,
						}}
					/>
					<Stack.Screen
						name="VictimDetail"
						component={VictimDetail}
						options={{
							header: () => (
								<CustomHeader title="Detalhes da vitima" />
							),
						}}
					/>
					<Stack.Screen
						name="ReportEvidence"
						component={ReportEvidence}
						options={{
							header: () => (
								<CustomHeader title="Laudo da Evidência" />
							),
						}}
					/>
					<Stack.Screen
						name="EvidenceRegistrationPage"
						component={EvidenceRegistrationPage}
						options={{
							header: () => {
								<CustomHeader title="Cadastrar evidencia" />;
							},
						}}
					/>
					<Stack.Screen
						name="Vitimas"
						component={Vitimas}
						options={{
							header: () => {
								<CustomHeader title="Vitimas" />;
							},
						}}
					/>
					<Stack.Screen
						name="CaseReport"
						component={CaseReport}
						options={{
							header: () => (
								<CustomHeader title="Relatório do Caso" />
							),
						}}
					/>
					<Stack.Screen
						name="GenerateReportScreen"
						component={GenerateReportScreen}
						options={{
							header: () => (
								<CustomHeader title="Imprimir laudo" />
							),
						}}
					/>

					<Stack.Screen
						name="CreateVictim"
						component={CreateVictim}
						options={{
							header: () => (
								<CustomHeader title="Cadastrar vitima" />
							),
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</AlertNotificationRoot>
	);
}
