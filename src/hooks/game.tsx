import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  stringifyGames,
  stringifyPlays,
  stringifySudoku,
  validite,
} from "../utils";
import {
  Game,
  LevelInfo,
  LevelOptions,
  Play,
  SavedGames,
  SavedPlays,
} from "../utils/types";

const GAMES_STORAGE = "@sudoku-creator:games";
const PLAYS_STORAGE = "@sudoku-creator:plays";

interface GameContextData {
  selectedLevel: LevelInfo;
  selectedIndexLevel: number;
  setSelectedIndexLevel: (newIndex: number) => void;

  games: SavedGames;
  saveGameEdition: (newGame: Game) => void;

  plays: SavedPlays;
  savePlayedLevel: (play: Play | null) => void;
}

export const GameContext = createContext({} as GameContextData);
interface ContextProviderProps {
  children: React.ReactNode;
}

function GameProvider({ children }: ContextProviderProps) {
  const _initialLevelIndex = 2;

  const [selectedLevel, setSelectedLevel] = useState(
    LevelOptions[_initialLevelIndex]
  );

  function getSelectedIndexLevel(): number {
    return LevelOptions.indexOf(selectedLevel);
  }

  function setSelectedIndexLevel(newIndex: number): void {
    setSelectedLevel(LevelOptions[newIndex]);
  }

  // const [selectedType, _setSelectedType] = useState<GameType>("DEFAULT");

  const [games, setGames] = useState<SavedGames>({
    BEGINNER: [],
    EASY: [],
    REGULAR: [],
    HARD: [],
    EXTREME: [],
  });

  const [plays, setPlays] = useState<SavedPlays>({
    BEGINNER: null,
    EASY: null,
    REGULAR: null,
    HARD: null,
    EXTREME: null,
  });

  useEffect(() => {
    function loadStorageGames() {
      AsyncStorage.getItem(GAMES_STORAGE, (fail, result) => {
        if (fail) {
          console.log("*** getItem", GAMES_STORAGE, "falha", fail, result);
        } else if (result && result !== "[]") {
          const games: SavedGames = JSON.parse(result);
          // console.log(
          //   "*** getItem",
          //   GAMES_STORAGE,
          //   "sucesso",
          //   stringifyGames(games)
          // );
          setGames(games);
        }
      });
    }

    function loadStoragePlays() {
      AsyncStorage.getItem(PLAYS_STORAGE, (fail, result) => {
        if (fail) {
          console.log("*** getItem", GAMES_STORAGE, "falha", fail, result);
        } else if (result) {
          const plays: SavedPlays = JSON.parse(result);
          // console.log(
          //   "*** getItem",
          //   GAMES_STORAGE,
          //   "sucesso",
          //   stringifyPlays(plays)
          // );
          setPlays(plays);
        }
      });
    }

    loadStoragePlays();
    loadStorageGames();
  }, []);

  async function saveStoragePlays(plays: SavedPlays) {
    await AsyncStorage.setItem(PLAYS_STORAGE, JSON.stringify(plays), (fail) => {
      if (fail) {
        console.log("setItem", PLAYS_STORAGE, fail);
      }
    });
  }

  async function saveStorageGames(games: SavedGames) {
    await AsyncStorage.setItem(GAMES_STORAGE, JSON.stringify(games), (fail) => {
      if (fail) {
        console.log("setItem", GAMES_STORAGE, fail);
      }
    });
  }

  function refreshPlaysList(plays: SavedPlays) {
    setPlays(plays);
    saveStoragePlays(plays);
  }

  function savePlayedLevel(play: Play | null) {
    const tempPlays: SavedPlays = { ...plays };
    tempPlays[selectedLevel.id] = play;
    refreshPlaysList(tempPlays);
  }

  function refreshGameList(games: SavedGames) {
    setGames(games);
    saveStorageGames(games);
  }

  function saveGameEdition(newGame: Game) {
    const level = newGame.levelOption.id;
    const size = newGame.levelOption.numbers.length;
    stringifySudoku(newGame.initialValues, size);

    if (!validite(newGame.initialValues, newGame.levelOption.numbers)) {
      alert("Existem inconsistências nesta definição de jogo!");
      return;
    }

    const tempGames = { ...games };
    tempGames[level].push(newGame);

    refreshGameList(tempGames);
  }

  return (
    <GameContext.Provider
      value={{
        selectedLevel,
        selectedIndexLevel: getSelectedIndexLevel(),
        setSelectedIndexLevel,

        games,
        saveGameEdition,

        plays,
        savePlayedLevel,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

function useGame() {
  return useContext(GameContext);
}

export { GameProvider, useGame };
