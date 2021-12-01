import React from "react";
import { FlatList, Text, View } from "react-native";
import { useControls } from "../../hooks/controls";
import { styles } from "./styles";

export interface NumberProps {
  value?: number;
  possibles: number[];
  readonly: boolean;
  selected: boolean;
};

type Props = {
  data: NumberProps;
};

export function NumberInput({ data }: Props) {
  const { inGame } = useControls();

  return (
    <View style={styles.container}>
      {(data.value || !data.possibles.length) ? (
        <Text style={styles.textValue}>{data.value}</Text>
      ) : (
        <FlatList
          data={inGame?.levelOption.numbers}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemPossible}>
              <Text style={styles.textPossible}>
                {data.possibles.indexOf(item) === -1 ? "" : item}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
