import React from "react";
import Main from "./components/MainComponent";
import { StyleSheet } from "react-native";

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent';
import { ConfigureStore } from "./redux/configureStore";

const { persistor, store } = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate 
          loading={<Loading />}
          persistor={persistor}>
      <Main />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
});
