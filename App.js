import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ContainerView, Title } from './styles';

export default function App() {
  return (
    <ContainerView>
      <Title>Ola, seja bem vindo ao Dentalysis!</Title>
      <StatusBar style="auto" />
    </ContainerView>
  );
}


