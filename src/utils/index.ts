import { LogBox } from "react-native";
import {
  LEVELS,
  Position,
  GameValue,
  PlayValue,
  Game,
  Play,
  SavedGames,
  SavedPlays,
} from "./types";

export function stringifyGames(saved: SavedGames): string {
  function stringifyGame(games: Game[]): string {
    if (!games.length) {
      return "[]; ";
    }
    return games.reduce(
      (txtGame, game, index) =>
        txtGame +
        `\n[${index}]=\n` +
        stringifySudoku(game.initialValues, game.levelOption.numbers.length),
      ""
    );
  }

  return LEVELS.reduce(
    (txtLevel, level) =>
      txtLevel + "*** " + level + ": " + stringifyGame(saved[level]),
    ""
  );
}

export function stringifyPlays(saved: SavedPlays): string {
  function stringifyPlay(play: Play | null): string {
    if (!play) {
      return "null; ";
    }
    return (
      "\n" + stringifySudoku(play.values, play.game.levelOption.numbers.length)
    );
  }

  return LEVELS.reduce(
    (txtLevel, level) =>
      txtLevel + "*** " + level + ": " + stringifyPlay(saved[level]),
    ""
  );
}

export function stringifySudoku(values: GameValue[], size: number): string {
  const mapa: Array<Array<number>> = Array.from({ length: size }, () =>
    new Array(size).fill(0)
  );

  values.forEach((item) => {
    if (item.value) {
      mapa[item.row][item.col] = item.value;
    }
  });

  return mapa.reduce((grupo, item) => grupo + JSON.stringify(item) + "\n", "");
}

export function game2Play(game: Game): Play {
  const values: PlayValue[] = game.initialValues.map((v) => {
    return {
      col: v.col,
      row: v.row,
      value: v.value,
      valid: v.valid,
      readonly: Boolean(v.value),
      possibles: [],
    };
  });
  return {
    game: game,
    values: values,
  };
}

export function cell2Flat(cell: Position): number {
  return cell.col + cell.row * 9;
}

function checkSame(
  cellA: Position | null,
  cellB: Position | null,
  checkValid: (cellA: Position, cellB: Position) => boolean
): boolean {
  if (cellA && cellB) {
    return checkValid(cellA, cellB);
  } else {
    return false;
  }
}

function checkRow(cellA: Position, cellB: Position): boolean {
  return cellA.row === cellB.row;
}

function checkCol(cellA: Position, cellB: Position): boolean {
  return cellA.col === cellB.col;
}

function sameArea(posA: number, posB: number): boolean {
  const areaA = Math.floor(posA / 3);
  const areaB = Math.floor(posB / 3);
  return areaA === areaB;
}

function checkArea(cellA: Position, cellB: Position): boolean {
  return sameArea(cellA.col, cellB.col) && sameArea(cellA.row, cellB.row);
}

export function sameCell(
  cellA: Position | null,
  cellB: Position | null
): boolean {
  return checkSame(
    cellA,
    cellB,
    (cellA, cellB) => checkRow(cellA, cellB) && checkCol(cellA, cellB)
  );
}

export function hasImpact(
  cellA: Position | null,
  cellB: Position | null
): boolean {
  return checkSame(
    cellA,
    cellB,
    (cellA, cellB) =>
      checkCol(cellA, cellB) ||
      checkRow(cellA, cellB) ||
      checkArea(cellA, cellB)
  );
}

export function validite(values: GameValue[], numbers: number[]): boolean {
  const size = numbers.length;
  // const showLog = {
  //   'row': [3],
  //   'col': [4],
  //   'area': [5]
  // }

  function validateCell(cell: Position, validNumbers: number[]): boolean {
    let validCell = true;

    const gameValue = values[cell2Flat(cell)];
    const value = gameValue.value;
    if (value) {
      const idx = validNumbers.indexOf(value);
      if (validNumbers.indexOf(value) === -1) {
        gameValue.valid = false;
        validCell = false;
      } else {
        delete validNumbers[idx];
      }
    }

    return validCell;
  }

  function cell2Log(cell: Position): string {
    const gameValue = values[cell2Flat(cell)];

    return `[${cell.col},${cell.row}]=${gameValue.value}`;
  }

  function numbers2Log(validNumbers: number[]): string {
    return validNumbers.reduce((final, num, idx) => {
      if (idx) {
        final += ",";
      }
      final += num;
      return final;
    }, "");
  }

  function validateCol(row: number): boolean {
    const validNumbers = [...numbers];

    let validCol = true;
    for (let col = 0; col < size; col++) {
      const cell: Position = { col, row, readonly: false, valid: true };

      // if (showLog['row'].indexOf(row) !== -1) {
      //   console.log("analise validateCol", cell2Log(cell), numbers2Log(validNumbers));
      // }
      if (!validateCell(cell, validNumbers)) {
        // console.log("validateCol", cell2Log(cell), numbers2Log(validNumbers));
        validCol = false;
      }
    }

    return validCol;
  }

  function validateRow(col: number): boolean {
    const validNumbers = [...numbers];

    let validRow = true;
    for (let row = 0; row < size; row++) {
      const cell: Position = { col, row, readonly: false, valid: true };
      // if (showLog['col'].indexOf(col) !== -1) {
      //   console.log("analise validateRow", cell2Log(cell), numbers2Log(validNumbers));
      // }
      if (!validateCell(cell, validNumbers)) {
        // console.log("validateRow", cell2Log(cell), numbers2Log(validNumbers));
        validRow = false;
      }
    }

    return validRow;
  }

  function validateArea(area: number): boolean {
    const validNumbers = [...numbers];

    const adjustCol = 3 * Math.floor(area / 3);
    const adjustRow = 3 * (area % 3);

    let validArea = true;
    for (let counter = 0; counter < size; counter++) {
      const col = adjustCol + Math.floor(counter / 3);
      const row = adjustRow + (counter % 3);
      const cell: Position = { col, row, readonly: false, valid: true };
      // if (showLog['area'].indexOf(area) !== -1) {
      //   console.log("analise validateArea", area, cell2Log(cell), numbers2Log(validNumbers));
      // }
      if (!validateCell(cell, validNumbers)) {
        // console.log(
        //   "validateArea",
        //   area,
        //   cell2Log(cell),
        //   numbers2Log(validNumbers)
        // );
        validArea = false;
      }
    }

    return validArea;
  }

  // Clear older validations
  values.forEach(v => v.valid = true);

  let validGame = true;
  for (let index = 0; index < size; index++) {
    if (!validateCol(index)) {
      // console.log("validateCol fails", index, "\n");
      validGame = false;
    }
    if (!validateRow(index)) {
      // console.log("validateRow fails", index, "\n");
      validGame = false;
    }
    if (!validateArea(index)) {
      // console.log("validateArea fails", index, "\n");
      validGame = false;
    }
  }
  return validGame;
}
