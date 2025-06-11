import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import logo from "../../assets/logo.png";

const ImprimirRelatorio = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const caseData = route.params?.caseData;

  const formatDate = (iso) => new Date(iso).toLocaleString("pt-BR");

  if (!caseData) {
    return <Text>Dados insuficientes para gerar o relatório.</Text>;
  }

  const gerarHTML = () => {
    const { caseDetails } = caseData;
    const evidencias = caseDetails.evidence || [];
    const respostas = caseDetails.caseReport?.answers || [];

    return `
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial; padding: 16px; }
            h1, h2, h3, h4 { color: #2c3e50; }
            img { max-width: 150px; }
            .section { margin-bottom: 24px; }
            .item { margin-bottom: 8px; }
            .bold { font-weight: bold; }
          </style>
        </head>
        <body>
          <img src="${Image.resolveAssetSource(logo).uri}" />
          <h1>Dentalysis Odonto-Legal</h1>
          <h2>Relatório do Caso - Protocolo Nº ${caseDetails.protocol}</h2>

          <div class="section">
            <h3>Informações do Caso</h3>
            <p><span class="bold">Tipo:</span> ${caseDetails.caseType}</p>
            <p><span class="bold">Data de Abertura:</span> ${formatDate(caseDetails.openedAt)}</p>
            <p><span class="bold">Responsável:</span> ${caseDetails.openedBy?.name} (${caseDetails.openedBy?.role})</p>
          </div>

          <div class="section">
            <h3>Informações da Vítima</h3>
            <p><span class="bold">Nome:</span> ${caseDetails.patient?.name || "N/A"}</p>
            <p><span class="bold">Idade:</span> ${caseDetails.patient?.age || "N/A"}</p>
            <p><span class="bold">Gênero:</span> ${caseDetails.patient?.gender || "N/A"}</p>
            <p><span class="bold">Status de Identificação:</span> ${caseDetails.patient?.identificationStatus}</p>
          </div>

          <div class="section">
            <h3>Evidências Vinculadas</h3>
            ${evidencias.map(e => `
              <div class="item">
                <h4>Evidência ${e.title}</h4>
                <p><span class="bold">Categoria:</span> ${e.category}</p>
                <p><span class="bold">Condição:</span> ${e.condition}</p>
                <p><span class="bold">Coletor:</span> ${e.collector?.name} (${e.collector?.role})</p>
                <p><span class="bold">Descrição Técnica:</span> ${e.descriptionTechnical}</p>
                <p><span class="bold">Data de Coleta:</span> ${formatDate(e.createdAt)}</p>
                <p><span class="bold">Relatos:</span> ${e.testimony || "N/A"}</p>

                <h4>Laudo da Evidência</h4>
                <p><span class="bold">Descrição Técnica:</span> ${e.reportEvidence.descriptionTechnical}</p>
                <p><span class="bold">Conclusão:</span> ${e.reportEvidence.note}</p>
                <p><span class="bold">Responsável:</span> ${e.reportEvidence.responsible.name} (${e.reportEvidence.responsible.role})</p>
                <p><span class="bold">Data:</span> ${formatDate(e.reportEvidence.createdAt)}</p>
              </div>
            `).join("")}
          </div>

          <div class="section">
            <h3>Detalhamento do Caso</h3>
            <p><span class="bold">Título:</span> ${caseDetails.title}</p>
            <p><span class="bold">Status:</span> ${caseDetails.state}</p>
            <p><span class="bold">Inquérito:</span> ${caseDetails.inquiryNumber}</p>
            <p><span class="bold">Instituição:</span> ${caseDetails.requestingInstitution}</p>
            <p><span class="bold">Autoridade:</span> ${caseDetails.requestingAuthority}</p>
          </div>

          ${respostas.length > 0 ? `
            <div class="section">
              <h3>Respostas do Questionário</h3>
              ${respostas.map((resp, idx) => `
                <p><span class="bold">Pergunta ${idx + 1}:</span> ${caseDetails.questions[idx]?.question}</p>
                <p><span class="bold">Resposta:</span> ${resp.answer}</p>
              `).join("")}
            </div>
          ` : ""}

          <div class="section">
            <h3>Responsável pelo Relatório</h3>
            <p><span class="bold">Nome:</span> ${caseDetails.caseReport.responsible.name}</p>
            <p><span class="bold">Cargo:</span> ${caseDetails.caseReport.responsible.role}</p>
            <p><span class="bold">Data:</span> ${formatDate(caseDetails.caseReport.createdAt)}</p>
            <p><strong>Assinatura:</strong> ____________________________________________</p>
            <p><small>Emitido em: ${formatDate(new Date())}</small></p>
          </div>
        </body>
      </html>
    `;
  };

  const gerarPDF = async () => {
    const html = gerarHTML();
    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  };

  return (
    <ScrollView style={styles.container}>
    
    
      <Button title="Exportar PDF" onPress={gerarPDF} />
    </ScrollView>
  );
};

export default ImprimirRelatorio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
