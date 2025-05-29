import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import Login from './pages/login';
import NewPassword from './pages/new_password';
import { headerStyles } from './pages/login/styles';
import { COLORS } from './colors';

const Stack = createStackNavigator();

export default function Routes() {
	return (
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
			</Stack.Navigator>
		</NavigationContainer>
	);
}
