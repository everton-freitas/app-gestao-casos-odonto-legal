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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CaseDetails from './pages/case_details';
import CustomHeader from './components/header/index';

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
						name="CaseDetails"
						component={CaseDetails}
						options={{
							header: () => (
								<CustomHeader title="Detalhes do Caso" />
							),
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</AlertNotificationRoot>
	);
}