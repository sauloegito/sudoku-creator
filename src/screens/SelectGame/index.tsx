import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import LevelSelector from "../../components/LevelSelector";
import { useGame } from "../../hooks/game";
import { Game, GameValue, MACHINE_STATE_FAIL, Play } from "../../utils/types";
import { game2Play } from "../../utils";
import { styles } from "./styles";

const SelectGame: React.FC = () => {
  const { selectedLevel, games, plays } = useGame();
  const { navigate } = useNavigation();

  function handlePlayGame(saved: boolean) {
    function loadLastGame(): Play {
      const savedGame = plays[selectedLevel.id];
      if (!savedGame) {
        throw MACHINE_STATE_FAIL;
      }
      return { ...savedGame };
    }

    function playNewGame(): Play {
      const availableGames = games[selectedLevel.id];
      const max = availableGames.length;
      if (max === 0) {
        throw "Nenhum jogo atende o filtro: " + selectedLevel.id;
      }
      const rndIndex = Math.floor(Math.random() * max);
      const selectedGame = availableGames[rndIndex];
      return game2Play(selectedGame);
    }

    navigate("Play", { play: saved ? loadLastGame() : playNewGame() });
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

    navigate("Edit", { game: editNewGame() });
  }

  return (
    <View style={styles.container}>
      <LevelSelector />

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
};

export default SelectGame;
