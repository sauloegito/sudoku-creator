import React from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { StatusBar } from "expo-status-bar";
import Routes from "./src/routes";
import { GameProvider } from "./src/hooks/game";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <GameProvider>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Routes />
    </GameProvider>
  );
}
