import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  ButtonControl,
  GameValue,
  PlayValue,
  Position,
} from "../../utils/types";
import { ControlNumber } from "../ControlNumber";
import { NumberInput, NumberProps } from "../NumberInput";
import { styles } from "./styles";
import { ControlButtons } from "../ControlButtons";
import { cell2Flat, sameCell, hasImpact } from "../../utils";

export interface SudokuProps {
  numbers: number[];
  flatValues: Array<GameValue | PlayValue>;
  controls: ButtonControl[];
  handleFlatItemClick: (
    flatItemIndex: number,
    markValue: (value: GameValue) => void,
    markPossible: (value: PlayValue) => void
  ) => Promise<void>;

  numberPropGame?: (item: GameValue) => NumberProps;
  numberPropPlay?: (item: PlayValue) => NumberProps;
}

export function Sudoku(props: SudokuProps) {
  const size = props.numbers.length;
  const groups = size / 3;
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [selectedCell, setSelectedCell] = useState<Position | null>(null);

  function isEndLine(col: number): boolean {
    return (col + 1) % groups === 0;
  }

  function isBottomLine(row: number): boolean {
    return (row + 1) % groups === 0;
  }

  function isEndNone(col: number): boolean {
    return col + 1 === size;
  }

  function isBottomNone(row: number): boolean {
    return row + 1 === size;
  }

  function numberProps(item: any): NumberProps {
    let numberProp: NumberProps;
    if (props.numberPropGame) {
      numberProp = props.numberPropGame(item);
    } else if (props.numberPropPlay) {
      numberProp = props.numberPropPlay(item);
    } else {
      throw "Faltou informar montador de propriedes";
    }

    return numberProp;
  }

  function isSelected(cell: Position | null): boolean {
    return sameCell(cell, selectedCell);
  }

  function isImpacted(cell: Position | null): boolean {
    // if (isSelected(cell)) {
    //   return false;
    // }
    return hasImpact(cell, selectedCell);
  }

  function markValue(selectedItem: GameValue) {
    if (selectedNumber === selectedItem.value) {
      selectedItem.value = undefined;
    } else {
      selectedItem.value = selectedNumber;
    }
  }

  function markPossible(selectedItem: PlayValue) {
    const idx = selectedItem.possibles.indexOf(selectedNumber);
    if (idx == -1) {
      selectedItem.possibles.push(selectedNumber);
    } else {
      selectedItem.possibles = selectedItem.possibles.filter(
        (p: number) => p != selectedNumber
      );
    }
  }

  function internalCellClick(item: GameValue | PlayValue): Promise<void> {
    return new Promise((resolve, _reject) => {
      if (item.readonly) {
        resolve();
        return;
      }

      if (!isSelected(item)) {
        setSelectedCell(item);
      }

      if (!selectedNumber || !item) {
        resolve();
        return;
      }

      props
        .handleFlatItemClick(cell2Flat(item), markValue, markPossible)
        .finally(() => {
          resolve();
        });
    });
  }

  function genKey(item: GameValue | PlayValue): string {
    let possibles = "";
    if ("possibles" in item) {
      possibles = JSON.stringify(item.possibles);
    }
    return `cell-${item.col}${item.row}-${item.value}-${possibles}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {props.flatValues.map((item) => (
          <View style={styles.item} key={genKey(item)}>
            <View
              style={[
                styles.grid,
                isEndLine(item.col) && styles.endLine,
                isEndNone(item.col) && styles.endNone,
                isBottomLine(item.row) && styles.bottomLine,
                isBottomNone(item.row) && styles.bottomNone,
                isImpacted(item) && styles.impactedCell,
                isSelected(item) && styles.selectedCell,
              ]}
            >
              <TouchableOpacity onPress={() => internalCellClick(item)}>
                <NumberInput data={numberProps(item)} numbers={props.numbers} />
              </TouchableOpacity>
            </View>
          </View>
        ))}

      </View>
      <View style={styles.allControls}>
        <ControlNumber
          numbers={props.numbers}
          selected={selectedNumber}
          onChange={setSelectedNumber}
        />
        <ControlButtons buttons={props.controls} />
      </View>
    </View>
  );
}
