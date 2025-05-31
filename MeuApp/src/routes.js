import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import Login from './pages/login';
import { headerStyles } from './pages/login/styles';
import { COLORS } from './colors';
import { AlertNotificationRoot } from 'react-native-alert-notification';

const Stack = createStackNavigator();

export default function Routes() {
	return (
		<AlertNotificationRoot
			theme={{
				colors: {
					primary: '#1E88E5', 
					success: '#27AE60', 
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
				</Stack.Navigator>
			</NavigationContainer>
		</AlertNotificationRoot>
	);
}
