import React from "react";
import Main from "./components/MainComponent";
import { StyleSheet } from "react-native";

export default function App() {
  return <Main />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
});
