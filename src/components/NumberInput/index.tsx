import React from "react";
import { FlatList, Text, View } from "react-native";
import { Position } from "../../utils/types";
import { styles } from "./styles";

export interface NumberProps extends Position {
  value?: number;
  possibles: number[];
  selected?: boolean;
}

type Props = {
  data: NumberProps;
  numbers: number[];
};

export function NumberInput({ data, numbers }: Props) {
  function showValue(): boolean {
    return Boolean(data.value) || !data.possibles.length;
  }

  return (
    <View style={styles.container}>
      {showValue() ? (
        <Text style={[styles.textValue, data.readonly && styles.textReadonly]}>
          {data.value}
        </Text>
      ) : (
        <View style={styles.viewPossible}>
          <FlatList
            data={numbers}
            numColumns={3}
            listKey="possibles"
            keyExtractor={(item) => `possib-${data.col}${data.row}-${item}`}
            renderItem={({ item }) => (
              <View style={styles.itemPossible}>
                <View style={styles.cellPossible}>
                  <Text style={styles.textPossible}>
                    {data.possibles.indexOf(item) === -1 ? "" : item}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}
