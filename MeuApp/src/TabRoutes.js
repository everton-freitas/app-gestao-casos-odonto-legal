import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './pages/home';
import Casos from './pages/cases';
import Vitimas from './pages/victims';
import ColetorEvidencia from './pages/coletor';
import Profile from './pages/profile'; // Importa a tela de sair
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomHeader from './components/header/index';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				header: () => {
					if (route.name === 'Início') {
						return <CustomHeader showLogo />;
					} else {
						return <CustomHeader title={route.name} />;
					}
				},
				tabBarActiveTintColor: '#EDBF5F',
				tabBarInactiveTintColor: '#F5F9FC',
				tabBarStyle: {
					backgroundColor: '#012130',
				},
				tabBarIcon: ({ color, size }) => {
					let iconName;
					if (route.name === 'Início') iconName = 'home';
					else if (route.name === 'Casos') iconName = 'file-document';
					else if (route.name === 'Vítimas')
						iconName = 'account-group';
					else if (route.name === 'Coletor') iconName = 'camera';
					else if (route.name === 'Sair') iconName = 'logout';
					return <Icon name={iconName} size={size} color={color} />;
				},
			})}
		>
			<Tab.Screen name="Início" component={Home} />
			<Tab.Screen name="Casos" component={Casos} />
			<Tab.Screen name="Coletor" component={ColetorEvidencia} />
			<Tab.Screen name="Vítimas" component={Vitimas} />
			<Tab.Screen name="Sair" component={Profile} />
		</Tab.Navigator>
	);
}
