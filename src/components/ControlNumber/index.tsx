import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface ControlNumberProps {
  numbers: number[];
  selected: number;
  onChange: (number: number) => void;
}
export function ControlNumber(props: ControlNumberProps) {

  function selectedItem(num: number): boolean {
    return num === props.selected;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={props.numbers}
        numColumns={Math.ceil(props.numbers.length / 2)}
        listKey="selecao-numeros"
        keyExtractor={(item) => `num-${item}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => props.onChange(selectedItem(item) ? 0 : item)}
          >
            <Text
              style={[
                styles.text,
                selectedItem(item) ? styles.selected : styles.unSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
