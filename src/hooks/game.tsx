import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cell2Flat, game2Play, sameCell, validite } from "../utils";
import {
  Game,
  GameValue,
  LevelInfo,
  LevelOptions,
  MACHINE_STATE_FAIL,
  Play,
  Position,
  SavedPlays,
} from "../utils/types";

const GAMES_STORAGE = "@sudoku_creator:games";
const PLAYS_STORAGE = "@sudoku_creator:plays";

interface GameContextData {
  selectedLevel: LevelInfo;
  hasNextLevel: boolean;
  hasPriorLevel: boolean;
  setNextLevel: () => boolean;
  setPriorLevel: () => boolean;

  isOptions: boolean;
  setIsOptions: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNumber: number;
  setSelectedNumber: (num: number) => void;

  isSelected: (cell: Position | null) => boolean;

  games: Game[];

  inGame: Game | null;
  setInGame: (newGame: Game) => void;
  saveGameEdition: () => void;
  handleCellEditClick: (cell: Position | null) => void;

  plays: SavedPlays;
  inPlay: Play | null;
  setInPlay: (play: Play) => void;
  restartGame: () => void;
  saveUndonePlay: () => void;
  handleCellPlayClick: (cell: Position | null) => void;
}

export const GameContext = createContext({} as GameContextData);
interface ContextProviderProps {
  children: React.ReactNode;
};

function GameProvider({ children }: ContextProviderProps) {
  const [isOptions, setIsOptions] = useState(false);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(2);
  const [selectedLevel, setSelectedLevel] = useState(
    LevelOptions[selectedLevelIndex]
  );

  // const [selectedType, _setSelectedType] = useState<GameType>("DEFAULT");
  const [selectedNumber, setSelectedNumber] = useState(0);

  const [games, setGames] = useState<Game[]>([]);
  const [inGame, setInGame] = useState<Game | null>(null);

  const [plays, setPlays] = useState<SavedPlays>({
    "BEGINNER": null,
    "EASY": null,
    "REGULAR": null,
    "HARD": null,
    "EXTREME": null,
  });
  const [inPlay, setInPlay] = useState<Play | null>(null);

  const [selectedCell, setSelectedCell] = useState<Position | null>(null);

  function hasNextLevel(): boolean {
    return selectedLevelIndex < LevelOptions.length - 1;
  }

  function setNextLevel(): boolean {
    if (hasNextLevel()) {
      setSelectedLevelIndex((previous) => previous + 1);
      setSelectedLevel(LevelOptions[selectedLevelIndex]);
      return true;
    }
    return false;
  }

  function hasPriorLevel(): boolean {
    return selectedLevelIndex > 0;
  }

  function setPriorLevel(): boolean {
    if (hasPriorLevel()) {
      setSelectedLevelIndex((previous) => previous - 1);
      setSelectedLevel(LevelOptions[selectedLevelIndex]);
      return true;
    }
    return false;
  }

  useEffect(() => {
    async function loadStorageGames() {
      const storagedGames = await AsyncStorage.getItem(
        GAMES_STORAGE,
        (fail, result) => {
          console.log("getItem", GAMES_STORAGE, fail, result);
        }
      );

      if (storagedGames) {
        const games: Game[] = JSON.parse(storagedGames);
        refreshGameList(games);
      }
    }

    async function loadStoragePlays() {
      const storagedPlays = await AsyncStorage.getItem(PLAYS_STORAGE);

      if (storagedPlays) {
        const plays: SavedPlays = JSON.parse(storagedPlays);
        refreshPlaysList(plays);
      }
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
    const tempPlays: SavedPlays = {...plays};
    tempPlays[selectedLevel.id] = inPlay;
    refreshPlaysList(tempPlays);
    setInPlay(null);
  }

  function refreshGameList(gameList: Game[]) {
    setGames(gameList);
    refreshLevelCounter();
    saveStorageGames();
  }

  function refreshLevelCounter() {
    LevelOptions.forEach((info) => {
      info.count = games
        .filter((g) => g.levelOption.id === info.id)
        .reduce((total, _item) => total + 1, 0);
    });
  }

  function refreshLevelPlayer() {
    LevelOptions.forEach((info) => {
      info.hasSaved = Boolean(plays[info.id]);
    });
  }

  function refreshPlaysList(plays: SavedPlays) {
    setPlays(plays);
    refreshLevelPlayer();
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
      const idx = selectedValue.possibles.indexOf(selectedNumber);
      if (idx == -1) {
        selectedValue.possibles.push(selectedNumber);
      } else {
        selectedValue.possibles = selectedValue.possibles.filter(
          (p) => p != selectedNumber
        );
      }
    }

    setInPlay({ game: inPlay.game, values });
  }

  function saveGameEdition() {
    if (!inGame) {
      throw MACHINE_STATE_FAIL;
    }
    const mapa: Array<Array<number>> = Array.from({ length: 9 }, () =>
      new Array(9).fill(0)
    );

    inGame.initialValues.forEach((item) => {
      if (item.value) {
        mapa[item.col][item.row] = item.value;
      }
    });

    let textos: string[] = [];
    textos = mapa.reduce((grupo, item) => {
      for (let row = 0; row < item.length; row++) {
        grupo[row] = (grupo[row] ? grupo[row] : "") + item[row];
      }
      return grupo;
    }, textos);
    console.log("saving", textos);

    if (!validite(inGame.initialValues, inGame.levelOption.numbers)) {
      throw "Alguma coisa errada não está certa!";
    }

    const tempGames = [...games];
    const len = tempGames.push(inGame);
    console.log("saved at", len);

    refreshGameList(tempGames);
    console.log("refreshed game");
  }

  return (
    <GameContext.Provider
      value={{
        selectedLevel,
        hasNextLevel: hasNextLevel(),
        hasPriorLevel: hasPriorLevel(),
        setNextLevel,
        setPriorLevel,

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
