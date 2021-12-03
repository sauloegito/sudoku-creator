import React from "react";
import AppLoading from "expo-app-loading";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { ControlNumber } from "../../components/ControlNumber";
import { Sudoku } from "../../components/Sudoku";
import { NumberProps } from "../../components/NumberInput";
import { useGame } from "../../hooks/game";
import { GameValue } from "../../utils/types";
import { styles } from "./styles";

export function EditGame() {
  const { inGame, saveGameEdition, handleCellEditClick, isSelected } = useGame();
  const navigation = useNavigation();

  function handleDiscard() {
    navigation.goBack();
  }

  function handleSave() {
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
        numbers={inGame.levelOption.numbers}
        flatValues={inGame.initialValues}
        handleCellClick={handleCellEditClick}
        numberPropGame={(item: GameValue) => {
          const prop: NumberProps = {
            col: item.col,
            row: item.row,
            value: item.value,
            possibles: [],
            readonly: false,
            selected: isSelected(item),
            valid: item.valid,
          };
          return prop;
        }}
      />
      <View style={styles.allControls}>
        <ControlNumber />
        <View style={styles.gameControls}>
          <TouchableOpacity style={styles.item} onPress={handleDiscard}>
            <AntDesign name="closesquareo" size={24} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={handleSave}>
            <AntDesign name="checksquareo" size={24} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
