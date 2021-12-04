import React, { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
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
import { cell2Flat, sameCell } from "../../utils";

export interface SudokuProps {
  numbers: number[];
  flatValues: GameValue[] | PlayValue[];
  controls: ButtonControl[];
  handleFlatItemClick: (
    flatItemIndex: number,
    markValue: (value: GameValue) => void,
    markPossible: (value: PlayValue) => void
  ) => void;

  numberPropGame?: (item: GameValue) => NumberProps;
  numberPropPlay?: (item: PlayValue) => NumberProps;
}

export function Sudoku(props: SudokuProps) {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [selectedCell, setSelectedCell] = useState<Position | null>(null);

  function isEndLine(col: number): boolean {
    return (col + 1) % 3 === 0;
  }

  function isBottomLine(row: number): boolean {
    return (row + 1) % 3 === 0;
  }

  function isEndNone(col: number): boolean {
    return col + 1 === props.numbers.length;
  }

  function isBottomNone(row: number): boolean {
    return row + 1 === props.numbers.length;
  }

  function numberProps(item: any): NumberProps {
    let numberProp: NumberProps;
    if (props.numberPropGame) {
      numberProp = props.numberPropGame(item);
    } if (props.numberPropPlay) {
      numberProp = props.numberPropPlay(item);
    } else {
      throw "Faltou informar montador de propriedes";
    }

    if (isSelected(item)) {
      numberProp.selected = true;
    }
    return numberProp;
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

  function markPossible(selectedValue: PlayValue) {
    const idx = selectedValue.possibles.indexOf(selectedNumber);
    if (idx == -1) {
      selectedValue.possibles.push(selectedNumber);
    } else {
      selectedValue.possibles = selectedValue.possibles.filter(
        (p) => p != selectedNumber
      );
    }
  }

  function internalCellClick(cell: Position | null): void {
    if (cell?.readonly || isSelected(cell)) {
      setSelectedCell(null);
      return;
    }
    setSelectedCell(cell);

    if (!selectedNumber || !cell) {
      return;
    }

    props.handleFlatItemClick(cell2Flat(cell), markValue, markPossible);
  }

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <FlatList
          data={props.flatValues}
          numColumns={props.numbers.length}
          listKey="sudoku-grid"
          keyExtractor={(item) => `cell-${item.col}${item.row}`}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <TouchableOpacity
                onPress={() => internalCellClick(item)}
                style={[
                  styles.grid,
                  isEndLine(item.col) && styles.endLine,
                  isEndNone(item.col) && styles.endNone,
                  isBottomLine(item.row) && styles.bottomLine,
                  isBottomNone(item.row) && styles.bottomNone,
                ]}
              >
                <NumberInput data={numberProps(item)} numbers={props.numbers} />
              </TouchableOpacity>
            </View>
          )}
        />
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
