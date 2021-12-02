import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  Game,
  GameLevel,
  GameValue,
  LevelOptions,
  MACHINE_STATE_FAIL,
} from "../../utils/types";
import { useGame } from "../../hooks/game";
import { styles } from "./styles";
import { game2Play } from "../../utils";
import { Picker } from "react-native";

export function SelectGame() {
  const {
    selectedLevel,
    setSelectedLevel,
    setInGame,
    games,
    plays,
    setInPlay,
  } = useGame();

  const { navigate } = useNavigation();
  const [levelID, setLevelID] = useState<GameLevel>("REGULAR");

  function handleSelectLevel(item: GameLevel, index: number) {
    setLevelID(item);
    setSelectedLevel(LevelOptions[index]);
  }

  function handlePlayGame(saved: boolean) {
    async function loadLastGame() {
      const saved = plays[selectedLevel.id];
      if (saved) {
        setInPlay(saved);
      } else {
        throw MACHINE_STATE_FAIL;
      }
    }

    function playNewGame(): void {
      const availableGames = games[selectedLevel.id];
      const max = availableGames.length;
      if (max === 0) {
        throw "Nenhum jogo atende o filtro: " + selectedLevel.id;
      }
      const rndIndex = Math.floor(Math.random() * max);
      const selectedGame = availableGames[rndIndex];
      setInPlay(game2Play(selectedGame));
    }

    if (saved) {
      loadLastGame();
    } else {
      playNewGame();
    }
    navigate("Play");
  }

  function handleEditGame() {
    function createSudokuValue(): GameValue[] {
      const values: GameValue[] = [];
      for (let row = 0; row < selectedLevel.numbers.length; row++) {
        for (let col = 0; col < selectedLevel.numbers.length; col++) {
          values.push({ col, row, readonly: false, valid: true });
        }
      }
      return values;
    }

    function editNewGame(): Game {
      return {
        levelOption: selectedLevel,
        type: "DEFAULT",
        initialValues: createSudokuValue(),
      };
    }

    setInGame(editNewGame());
    navigate("Edit");
  }

  return (
    <View style={styles.container}>
      <View style={styles.selection}>
        <Text style={styles.labelPicker}>Nível de Jogo:</Text>
        <Picker
          onValueChange={handleSelectLevel}
          selectedValue={levelID}
          style={styles.picker}
        >
          {LevelOptions.map((level) => (
            <Picker.Item label={level.label} value={level.id} key={level.id} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity onPress={handleEditGame} style={styles.item}>
        <Text style={styles.text}>Criar</Text>
      </TouchableOpacity>
      {Boolean(games[selectedLevel.id].length) && (
        <TouchableOpacity
          onPress={() => handlePlayGame(false)}
          style={styles.item}
        >
          <Text style={styles.text}>Novo Jogo</Text>
        </TouchableOpacity>
      )}
      {Boolean(plays[selectedLevel.id]) && (
        <TouchableOpacity
          onPress={() => handlePlayGame(true)}
          style={styles.item}
        >
          <Text style={styles.text}>Continuar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
