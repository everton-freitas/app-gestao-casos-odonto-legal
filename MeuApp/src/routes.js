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
					<Stack.Screen name="Home" component={TabRoutes} options={{ headerShown: false }} />
				</Stack.Navigator>
			</NavigationContainer>
		</AlertNotificationRoot>
	);
}
