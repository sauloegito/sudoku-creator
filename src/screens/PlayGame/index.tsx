import React, { useEffect } from "react";
import AppLoading from "expo-app-loading";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ControlNumber } from "../../components/ControlNumber";
import { useGame } from "../../hooks/game";
import { styles } from "./styles";
import { Sudoku } from "../../components/Sudoku";
import { PlayValue } from "../../utils/types";
import { NumberProps } from "../../components/NumberInput";
import { useNavigation } from "@react-navigation/core";
import { validite } from "../../utils";

export function PlayGame() {
  const {
    inPlay,
    isOptions,
    setIsOptions,
    restartGame,
    saveUndonePlay,
    saveFinishedPlay,
    handleCellPlayClick,
    isSelected,
  } = useGame();

  const { goBack } = useNavigation();
  const questionIcon: React.ComponentProps<typeof AntDesign>["name"] = isOptions
    ? "questioncircle"
    : "questioncircleo";

  if (!inPlay) {
    return <AppLoading />;
  }

  function handleGoBack() {
    saveUndonePlay();
    goBack();
  }

  useEffect(() => {
    if (!inPlay) {
      return;
    }
    if (inPlay.values.every(v => Boolean(v.value))) {
      if (!validite(inPlay.values, inPlay.game.levelOption.numbers)) {
        throw "Alguma coisa errada não está certa!";
      }
      alert("Parabéns!!!");
      saveFinishedPlay();
      goBack();
    }
  }, [inPlay])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnBack} onPress={() => handleGoBack()}>
        <AntDesign name="leftcircleo" size={28} style={styles.icon} />
      </TouchableOpacity>
      <Sudoku
        numbersSize={inPlay.game.levelOption.numbers.length}
        flatValues={inPlay.values}
        handleCellClick={handleCellPlayClick}
        numberPropPlay={(item: PlayValue) => {
          const prop: NumberProps = {
            value: item.value,
            possibles: item.possibles,
            readonly: item.readonly,
            selected: isSelected(item),
          };
          return prop;
        }}
      />
      <View style={styles.allControls}>
        <ControlNumber />

        <View style={styles.gameControls}>
          <TouchableOpacity style={styles.item} onPress={() => restartGame()}>
            <AntDesign name="reload1" size={24} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => setIsOptions(!isOptions)}
          >
            <AntDesign name={questionIcon} size={24} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
