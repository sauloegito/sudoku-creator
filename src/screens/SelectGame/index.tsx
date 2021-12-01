import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { Game, GameValue, MACHINE_STATE_FAIL } from "../../utils/types";
import { useControls } from "../../hooks/controls";
import { styles } from "./styles";
import { game2Play } from "../../utils";

export function SelectGame() {
  const {
    selectedLevel,
    hasNextLevel,
    hasPriorLevel,
    setNextLevel,
    setPriorLevel,
    setInGame,
    games,
    plays,
    setInPlay,
  } = useControls();

  const { navigate } = useNavigation();

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
      const availableGames = games.filter(
        (g) => g.levelOption.id === selectedLevel.id
      );
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
        {hasPriorLevel ? (
          <TouchableOpacity onPress={() => setPriorLevel()}>
            <AntDesign name="doubleleft" size={24} style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <Text>&nbsp;</Text>
        )}
        <Text style={styles.text}>
          {selectedLevel.label} / {Boolean(selectedLevel.count)}
        </Text>
        {hasNextLevel ? (
          <TouchableOpacity onPress={() => setNextLevel()}>
            <AntDesign name="doubleright" size={24} style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <Text>&nbsp;</Text>
        )}
      </View>
      <TouchableOpacity onPress={handleEditGame} style={styles.item}>
        <Text style={styles.text}>Criar</Text>
      </TouchableOpacity>
      {Boolean(selectedLevel.count) && (
        <TouchableOpacity
          onPress={() => handlePlayGame(false)}
          style={styles.item}
        >
          <Text style={styles.text}>Novo Jogo</Text>
        </TouchableOpacity>
      )}
      {selectedLevel.hasSaved && (
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
