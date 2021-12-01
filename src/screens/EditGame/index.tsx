import React from "react";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { ControlNumber } from "../../components/ControlNumber";
import { Sudoku } from "../../components/Sudoku";
import { useGame } from "../../hooks/game";
import { styles } from "./styles";
import AppLoading from "expo-app-loading";
import { GameValue } from "../../utils/types";
import { NumberProps } from "../../components/NumberInput";

export function EditGame() {
  const { inGame, saveGameEdition, handleCellEditClick, isSelected } = useGame();
  const navigation = useNavigation();

  function handleDiscartar() {
    navigation.goBack();
  }

  function handlePersistir() {
    try {
      saveGameEdition();
    } finally {
      navigation.goBack();
    }
  }

  if (!inGame) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Sudoku
        numbersSize={inGame.levelOption.numbers.length}
        flatValues={inGame.initialValues}
        handleCellClick={handleCellEditClick}
        numberPropGame={(item: GameValue) => {
          const prop: NumberProps = {
            value: item.value,
            possibles: [],
            readonly: false,
            selected: isSelected(item),
          };
          return prop;
        }}
      />
      <View style={styles.allControls}>
        <ControlNumber />
        <View style={styles.gameControls}>
          <TouchableOpacity style={styles.item} onPress={handleDiscartar}>
            <AntDesign name="closesquareo" size={24} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={handlePersistir}>
            <AntDesign name="checksquareo" size={24} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
