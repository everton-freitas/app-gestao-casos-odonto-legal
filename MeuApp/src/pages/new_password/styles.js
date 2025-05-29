import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f6fa", // substitua por sua cor primária se desejar
  },
  card: {
    backgroundColor: "#fff", // substitua por sua cor de fundo clara se desejar
    padding: 32,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    alignItems: "center",
    width: 320, // 20rem ≈ 320px
  },
  logo: {
    width: 160, // 10rem ≈ 160px
    height: 80,
    marginBottom: 16,
  },
  login: {
    marginVertical: 8,
    color: "#666", // substitua por sua cor de texto suave se desejar
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    backgroundColor: "#fff", // substitua por sua cor de fundo clara se desejar
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;