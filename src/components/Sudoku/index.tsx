import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { GameValue, PlayValue, Position } from "../../utils/types";
import { NumberInput, NumberProps } from "../NumberInput";
import { styles } from "./styles";

export interface SudokuProps {
  numbersSize: number;
  flatValues: GameValue[] | PlayValue[];
  handleCellClick: (cell: Position | null) => void;

  numberPropGame?: (item: GameValue) => NumberProps;
  numberPropPlay?: (item: PlayValue) => NumberProps;
}

export function Sudoku(props: SudokuProps) {

  function isEndLine(col: number): boolean {
    return (col + 1) % 3 === 0;
  }

  function isBottomLine(row: number): boolean {
    return (row + 1) % 3 === 0;
  }

  function isEndNone(col: number): boolean {
    return col + 1 === props.numbersSize;
  }

  function isBottomNone(row: number): boolean {
    return row + 1 === props.numbersSize;
  }

  function numberProps(item: any): NumberProps {
    if (props.numberPropGame) {
      return props.numberPropGame(item);
    } if (props.numberPropPlay) {
      return props.numberPropPlay(item);
    } else {
      throw "Faltou informar montador de propriedes";
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={props.flatValues}
        numColumns={props.numbersSize}
        keyExtractor={(item) => `[${item.col}, ${item.row}]`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => props.handleCellClick(item)}
              style={[
                styles.grid,
                isEndLine(item.col) && styles.endLine,
                isEndNone(item.col) && styles.endNone,
                isBottomLine(item.row) && styles.bottomLine,
                isBottomNone(item.row) && styles.bottomNone,
              ]}
            >
              <NumberInput data={numberProps(item)} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
