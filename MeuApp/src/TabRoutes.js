import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './pages/home';
import Casos from './pages/casos';
import Vitimas from './pages/vitimas';
import Laudos from './pages/laudos';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#1E88E5',
                tabBarInactiveTintColor: '#888',
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'Casos') iconName = 'file-document';
                    else if (route.name === 'Vitimas') iconName = 'account-group';
                    else if (route.name === 'Laudos') iconName = 'file-certificate';
                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Casos" component={Casos} />
            <Tab.Screen name="Vitimas" component={Vitimas} />
            <Tab.Screen name="Laudos" component={Laudos} />
        </Tab.Navigator>
    );
}