import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import CardCases from '../../components/cardCases';
import InputSearch from '../../components/inputSearch';
import Filters from '../../components/filters';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import { COLORS } from '../../Colors';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

export default function Casos() {
    const navigation = useNavigation();

    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');
    const [protocoloFilter, setProtocoloFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const casesPerPage = 8;

    const paginatedCases = cases.slice(
        (page - 1) * casesPerPage,
        page * casesPerPage
    );

    const lengthPag = Math.ceil(cases.length / casesPerPage);

    const getData = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        try {
            const response = await axios.get(
                'https://sistema-odonto-legal.onrender.com/api/cases/search/all',
            	{
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setCases(response.data);
        } catch (error) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Erro!',
                textBody: 'Erro ao buscar casos.',
                button: 'OK',
            });
        }
        setLoading(false);
    };

    const applyFilters = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        try {
            const response = await axios.get(
                'https://sistema-odonto-legal.onrender.com/api/cases/search/status',
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        status: statusFilter || undefined,
                        protocolo: protocoloFilter || undefined,
                        date: dateFilter || undefined,
                    },
                }
            );
            setCases(response.data);
        } catch (error) {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Nenhum caso encontrado!',
                textBody: error?.response?.data?.message || error.message,
                button: 'OK',
            });
            setStatusFilter('');
        }
        setLoading(false);
    };

    const applyFilterDate = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        try {
            const response = await axios.get(
                'https://sistema-odonto-legal.onrender.com/api/cases/search/date',
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { date: dateFilter },
                }
            );
            setCases(response.data);
            if (response.data.length === 0) {
                getData();
            }
        } catch (err) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Erro!',
                textBody: err.message,
                button: 'OK',
            });
        }
        setLoading(false);
    };

    const protocolSearch = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        try {
            const response = await axios.get(
                'https://sistema-odonto-legal.onrender.com/api/cases/search/protocol',
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { protocol: protocoloFilter },
                }
            );
            setCases([response.data]);
        } catch (err) {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Nenhum caso encontrado!',
                textBody: err.message,
                button: 'OK',
            });
        }
        setLoading(false);
    };

    const clearFilters = () => {
        setStatusFilter('');
        setProtocoloFilter('');
        setDateFilter('');
        setPage(1);
        getData();
    };

    useFocusEffect(
        React.useCallback(() => {
            getData();
        }, [])
    );

    if (loading) return null;

    return (
        <ScrollView>
            <View style={styles.headerArea}>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('CaseCreated')}
                    >
                        <Text style={styles.buttonText1}>Cadastrar caso</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonSecondary}
                        onPress={clearFilters}
                    >
                        <Text style={styles.buttonText2}>Limpar filtros</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.inputArea}>
                <InputSearch
                    placeholder="Pesquisar protocolo"
                    variant="InputSearch"
                    value={protocoloFilter}
                    onChangeText={text => {
                        setProtocoloFilter(text);
                        setPage(1);
                    }}
                    onSubmitEditing={protocolSearch}
                />
                <Filters
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                    setPage={setPage}
                    applyFilterDate={applyFilterDate}
                />
            </View>
            <CardCases cases={paginatedCases} />
            <View style={styles.pagination}>
                {Array.from({ length: lengthPag }).map((_, i) => {
                    const isActive = page === i + 1;
                    return (
                        <TouchableOpacity
                            key={i}
                            style={[styles.pag, isActive && styles.pagActive]}
                            onPress={() => setPage(i + 1)}
                        >
                            <Text
                                style={[
                                    styles.pagText,
                                    isActive && { color: COLORS.white },
                                ]}
                            >
                                {i + 1}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </ScrollView>
    );
}