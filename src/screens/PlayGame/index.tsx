import React from "react";
import AppLoading from "expo-app-loading";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ControlNumber } from "../../components/ControlNumber";
import { useGame } from "../../hooks/game";
import { styles } from "./styles";
import { Sudoku } from "../../components/Sudoku";
import { PlayValue } from "../../utils/types";
import { NumberProps } from "../../components/NumberInput";

export function PlayGame() {
  const { inPlay, isOptions, setIsOptions, restartGame, handleCellPlayClick, isSelected } = useGame();

  const questionIcon: React.ComponentProps<typeof AntDesign>["name"] = isOptions
    ? "questioncircleo"
    : "questioncircle";

    if (!inPlay) {
      return <AppLoading />;
    }
  
    return (
    <View style={styles.container}>
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
