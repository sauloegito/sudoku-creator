import { Position, GameValue, PlayValue, Game, Play } from "./types";

export function sameCell(
  cellA: Position | null,
  cellB: Position | null
): boolean {
  if (cellA && cellB) {
    return cellA.col === cellB.col && cellA.row === cellB.row;
  } else {
    return false;
  }
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
        console.log("validateCol", cell2Log(cell), numbers2Log(validNumbers));
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
        console.log("validateRow", cell2Log(cell), numbers2Log(validNumbers));
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
    for (let count = 0; count < size; count++) {
      const col = adjustCol + Math.floor(count / 3);
      const row = adjustRow + (count % 3);
      const cell: Position = { col, row, readonly: false, valid: true };
      // if (showLog['area'].indexOf(area) !== -1) {
      //   console.log("analise validateArea", area, cell2Log(cell), numbers2Log(validNumbers));
      // }
      if (!validateCell(cell, validNumbers)) {
        console.log("validateArea", area, cell2Log(cell), numbers2Log(validNumbers));
        validArea = false;
      }
    }

    return validArea;
  }

  let validGame = true;
  for (let index = 0; index < size; index++) {
    if (!validateCol(index)) {
      console.log("validateCol fails", index, "\n");
      validGame = false;
    }
    if (!validateRow(index)) {
      console.log("validateRow fails", index, "\n");
      validGame = false;
    }
    if (!validateArea(index)) {
      console.log("validateArea fails", index, "\n");
      validGame = false;
    }
  }
  return validGame;
}
