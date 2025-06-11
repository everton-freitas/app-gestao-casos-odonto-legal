import React from "react";
import { View, Text, StyleSheet, ScrollView, Button, Alert, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import logo from "../../assets/logo.png";

const GenerateReportScreen = () => {
  const route = useRoute();
  const { evidence, protocol, caseDetails, patient } = route.params || {};
  const report = evidence?.reportEvidence;

  const formatDate = (iso) => new Date(iso).toLocaleString("pt-BR");

  const handleGeneratePDF = async () => {
    if (!report) {
      console.log("Erro", "Nenhum laudo disponível para gerar PDF.");
      return;
    }

    const html = `
      <html>
        <body style="font-family: Arial; padding: 20px;">
        <img src="${Image.resolveAssetSource(logo).uri}" />
          <h1 style="text-align: center;">Dentalysis Odonto-Legal</h1>
          <h2>Laudo Técnico - Protocolo Nº ${protocol?.toUpperCase()}</h2>

          <h3>Dados do Caso</h3>
          <p><strong>Instituição Requisitante:</strong> ${caseDetails?.requestingInstitution || "N/A"}</p>
          <p><strong>Autoridade Requisitante:</strong> ${caseDetails?.requestingAuthority || "N/A"}</p>
          <p><strong>Tipo de Caso:</strong> ${caseDetails?.caseType || "N/A"}</p>
          <p><strong>Responsável:</strong> ${caseDetails?.openedBy?.name || "N/A"} (${caseDetails?.openedBy?.role || "N/A"})</p>
          <p><strong>Data do Caso:</strong> ${formatDate(caseDetails?.openedAt)}</p>

          <h3>Dados da Vítima</h3>
          <p><strong>Nome:</strong> ${patient?.name || "N/A"}</p>
          <p><strong>Idade:</strong> ${patient?.age || "N/A"}</p>
          <p><strong>Gênero:</strong> ${patient?.gender || "N/A"}</p>
          <p><strong>Status de Identificação:</strong> ${patient?.identificationStatus || "N/A"}</p>

          <h3>Dados da Evidência</h3>
          <p><strong>Título:</strong> ${evidence?.title || "N/A"}</p>
          <p><strong>Categoria:</strong> ${evidence?.category || "N/A"}</p>
          <p><strong>Condição:</strong> ${evidence?.condition || "N/A"}</p>
          <p><strong>Latitude:</strong> ${evidence?.latitude || "N/A"}</p>
          <p><strong>Longitude:</strong> ${evidence?.longitude || "N/A"}</p>
          <p><strong>Observações:</strong> ${evidence?.obs || "N/A"}</p>
          <p><strong>Depoimentos:</strong> ${evidence?.testimony || "N/A"}</p>
          <p><strong>Descrição Técnica:</strong> ${evidence?.descriptionTechnical || "N/A"}</p>

          <h3>Laudo</h3>
          <p><strong>Nota:</strong> ${report?.note || "N/A"}</p>
          <p><strong>Análise Técnica:</strong> ${report?.descriptionTechnical || "N/A"}</p>
          <p><strong>Concluído por:</strong> ${report?.responsible?.name || "N/A"}</p>
          <p><strong>Data do Laudo:</strong> ${formatDate(report?.createdAt)}</p>

          <br/><br/>
          <p><strong>Assinatura:</strong> _________________________________________</p>
          <p><small>Emitido em: ${formatDate(new Date())}</small></p>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Falha ao gerar ou compartilhar o PDF.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Laudo Técnico - Protocolo Nº {protocol?.toUpperCase()}</Text>

      <Section title="Dados do Caso">
        <Info label="Instituição Requisitante" value={caseDetails?.requestingInstitution} />
        <Info label="Autoridade Requisitante" value={caseDetails?.requestingAuthority} />
        <Info label="Tipo de Caso" value={caseDetails?.caseType} />
        <Info label="Responsável pelo Caso" value={`${caseDetails?.openedBy?.name} (${caseDetails?.openedBy?.role})`} />
        <Info label="Data do Caso" value={formatDate(caseDetails?.openedAt)} />
      </Section>

      <Section title="Dados da Vítima">
        <Info label="Nome" value={patient?.name} />
        <Info label="Idade" value={patient?.age} />
        <Info label="Gênero" value={patient?.gender} />
        <Info label="Status de Identificação" value={patient?.identificationStatus} />
      </Section>

      <Section title="Dados da Evidência">
        <Info label="Título" value={evidence?.title} />
        <Info label="Categoria" value={evidence?.category} />
        <Info label="Condição" value={evidence?.condition} />
        <Info label="Latitude" value={evidence?.latitude} />
        <Info label="Longitude" value={evidence?.longitude} />
        <Info label="Observações" value={evidence?.obs} />
        <Info label="Depoimentos" value={evidence?.testimony} />
        <Info label="Descrição Técnica" value={evidence?.descriptionTechnical} />

        {evidence?.photo && (
          <Image
            source={{ uri: evidence.photo }}
            style={{ height: 200, width: "100%", marginVertical: 10 }}
            resizeMode="contain"
          />
        )}
      </Section>

      <Section title="Laudo Gerado">
        <Info label="Nota" value={report?.note} />
        <Info label="Análise Técnica" value={report?.descriptionTechnical} />
        <Info label="Concluído por" value={report?.responsible?.name} />
        <Info label="Data do Laudo" value={formatDate(report?.createdAt)} />
        <View style={styles.footer}>
        <Text style={styles.signatureLine}>
          <Text style={styles.label}>Assinatura:</Text> ____________________________________________
        </Text>
        <Text style={styles.date}>
          Emitido em: {formatDate(new Date())}
        </Text>
      </View>
      </Section>
      

      <View style={styles.buttonContainer}>
        <Button title="Exportar PDF" onPress={handleGeneratePDF} />
      </View>
    </ScrollView>
  );
};

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Info = ({ label, value }) => (
  <>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value || "N/A"}</Text>
  </>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontWeight: "600",
    color: "#444",
  },
  value: {
    marginBottom: 8,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 40
  },
  footer: {
  marginTop: 40,
  borderTopWidth: 1,
  borderColor: '#ccc',
  paddingTop: 10,
  alignItems: 'flex-start',
},

signatureLine: {
  fontSize: 16,
  marginBottom: 10,
},

label: {
  fontWeight: 'bold',
},

date: {
  fontSize: 12,
  color: '#666',
},
});

export default GenerateReportScreen;