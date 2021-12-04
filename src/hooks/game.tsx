import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  cell2Flat,
  game2Play,
  sameCell,
  stringifyGames,
  stringifyPlays,
  stringifySudoku,
  validite,
} from "../utils";
import {
  Game,
  GameValue,
  LevelInfo,
  LevelOptions,
  MACHINE_STATE_FAIL,
  Play,
  Position,
  SavedGames,
  SavedPlays,
} from "../utils/types";

const GAMES_STORAGE = "@sudoku-creator:games";
const PLAYS_STORAGE = "@sudoku-creator:plays";

interface GameContextData {
  selectedLevel: LevelInfo;
  setSelectedLevel: (newLevel: LevelInfo) => void;

  isOptions: boolean;
  setIsOptions: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNumber: number;
  setSelectedNumber: (num: number) => void;

  isSelected: (cell: Position | null) => boolean;

  games: SavedGames;
  inGame: Game | null;
  setInGame: (newGame: Game) => void;
  saveGameEdition: () => void;
  handleCellEditClick: (cell: Position | null) => void;

  plays: SavedPlays;
  inPlay: Play | null;
  setInPlay: (play: Play) => void;
  restartGame: () => void;
  saveUndonePlay: () => void;
  saveFinishedPlay: () => void;
  handleCellPlayClick: (cell: Position | null) => void;
}

export const GameContext = createContext({} as GameContextData);
interface ContextProviderProps {
  children: React.ReactNode;
}

function GameProvider({ children }: ContextProviderProps) {
  let _selectedLevelIndex: number | undefined = 2;

  const [isOptions, setIsOptions] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(
    LevelOptions[_selectedLevelIndex]
  );

  // const [selectedType, _setSelectedType] = useState<GameType>("DEFAULT");
  const [selectedNumber, setSelectedNumber] = useState(0);

  const [games, setGames] = useState<SavedGames>({
    BEGINNER: [],
    EASY: [],
    REGULAR: [],
    HARD: [],
    EXTREME: [],
  });
  const [inGame, setInGame] = useState<Game | null>(null);

  const [plays, setPlays] = useState<SavedPlays>({
    BEGINNER: null,
    EASY: null,
    REGULAR: null,
    HARD: null,
    EXTREME: null,
  });
  const [inPlay, setInPlay] = useState<Play | null>(null);

  const [selectedCell, setSelectedCell] = useState<Position | null>(null);

  useEffect(() => {
    function loadStorageGames() {
      AsyncStorage.getItem(GAMES_STORAGE, (fail, result) => {
        if (fail) {
          console.log("*** getItem", GAMES_STORAGE, "falha", fail, result);
        } else if (result && result !== "[]") {
          const games: SavedGames = JSON.parse(result);
          console.log(
            "*** getItem",
            GAMES_STORAGE,
            "sucesso",
            stringifyGames(games)
          );
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
          console.log(
            "*** getItem",
            GAMES_STORAGE,
            "sucesso",
            stringifyPlays(plays)
          );
          setPlays(plays);
        }
      });
    }

    loadStoragePlays();
    loadStorageGames();
  }, []);

  async function saveStoragePlays() {
    await AsyncStorage.setItem(PLAYS_STORAGE, JSON.stringify(plays), (fail) => {
      console.log("setItem", PLAYS_STORAGE, fail);
    });
  }

  async function saveStorageGames() {
    await AsyncStorage.setItem(GAMES_STORAGE, JSON.stringify(games), (fail) => {
      console.log("setItem", GAMES_STORAGE, fail);
    });
  }

  function saveUndonePlay() {
    const tempPlays: SavedPlays = { ...plays };
    tempPlays[selectedLevel.id] = inPlay;
    refreshPlaysList(tempPlays);
    setInPlay(null);
  }

  function saveFinishedPlay() {
    const tempPlays: SavedPlays = { ...plays };
    tempPlays[selectedLevel.id] = null;
    refreshPlaysList(tempPlays);
    setInPlay(null);
  }

  function refreshGameList(games: SavedGames) {
    setGames(games);
    saveStorageGames();
  }

  function refreshPlaysList(plays: SavedPlays) {
    setPlays(plays);
    saveStoragePlays();
  }

  function isSelected(cell: Position | null): boolean {
    return sameCell(cell, selectedCell);
  }

  function markValue(selectedValue: GameValue) {
    if (selectedNumber === selectedValue.value) {
      delete selectedValue.value;
    } else {
      selectedValue.value = selectedNumber;
    }
  }

  function restartGame() {
    if (inPlay == null) {
      throw MACHINE_STATE_FAIL;
    }
    setInPlay(game2Play(inPlay.game));
  }

  function handleCellEditClick(cell: Position | null): void {
    if (isSelected(cell)) {
      setSelectedCell(null);
      return;
    }
    setSelectedCell(cell);

    if (!inGame) {
      throw MACHINE_STATE_FAIL;
    }
    if (!selectedNumber || !cell) {
      return;
    }

    const values = [...inGame.initialValues];
    markValue(values[cell2Flat(cell)]);
    setInGame({
      type: inGame.type,
      levelOption: inGame.levelOption,
      initialValues: values,
    });
  }

  function handleCellPlayClick(cell: Position | null): void {
    if (cell?.readonly || isSelected(cell)) {
      if (cell) {
        console.log(`cell clicked:${cell.col}-${cell.row} is readonly?`, cell.readonly);
      }
      setSelectedCell(null);
      return;
    }
    setSelectedCell(cell);

    if (!inPlay) {
      throw MACHINE_STATE_FAIL;
    }
    if (!selectedNumber || !cell) {
      return;
    }

    const values = [...inPlay.values];
    const selectedValue = values[cell2Flat(cell)];
    if (!isOptions) {
      markValue(selectedValue);
    } else {
      console.log(`before click:${cell.col}-${cell.row}`, JSON.stringify(selectedValue.possibles));
      const idx = selectedValue.possibles.indexOf(selectedNumber);
      if (idx == -1) {
        selectedValue.possibles.push(selectedNumber);
      } else {
        selectedValue.possibles = selectedValue.possibles.filter(
          (p) => p != selectedNumber
        );
      }
      console.log(`after click:${cell.col}-${cell.row}`, JSON.stringify(selectedValue.possibles));
    }

    setInPlay({ game: inPlay.game, values });
  }

  function saveGameEdition() {
    if (!inGame) {
      throw MACHINE_STATE_FAIL;
    }
    const level = inGame.levelOption.id;
    const size = inGame.levelOption.numbers.length;
    stringifySudoku(inGame.initialValues, size);

    if (!validite(inGame.initialValues, inGame.levelOption.numbers)) {
      throw "Alguma coisa errada não está certa!";
    }

    const tempGames = { ...games };
    const len = tempGames[level].push(inGame);
    console.log("saved at", len);

    refreshGameList(tempGames);
    console.log("refreshed game");
  }

  return (
    <GameContext.Provider
      value={{
        selectedLevel,
        setSelectedLevel,

        isOptions,
        setIsOptions,
        selectedNumber,
        setSelectedNumber,

        isSelected,

        games,
        inGame,
        setInGame,
        saveGameEdition,
        handleCellEditClick,

        plays,
        inPlay,
        setInPlay,
        restartGame,
        saveUndonePlay,
        saveFinishedPlay,
        handleCellPlayClick,
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
