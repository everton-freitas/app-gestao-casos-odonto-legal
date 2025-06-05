import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { headerStyles } from './pages/login/styles';
import { COLORS } from './Colors';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import Login from './pages/login';
import NewPassword from './pages/new_password';
import TabRoutes from './TabRoutes';
import Profile from './pages/profile';
import CaseDetails from './pages/case_details';
import CustomHeader from './components/header';
import ReportEvidence from './pages/report_evidence';

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
						name="CaseDetails"
						component={CaseDetails}
						options={{
							header: () => (
								<CustomHeader title="Detalhes do Caso" />
							),
						}}
					/>
					<Stack.Screen
						name="ReportEvidence"
						component={ReportEvidence}
						options={{
							header: () => (
								<CustomHeader title="Gerar Laudo da Evidência" />
							),
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</AlertNotificationRoot>
	);
}
