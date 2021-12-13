import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
      {props.numbers.map((item) => (
        <TouchableOpacity key={`num-${item}`}
          style={styles.item}
          onPressIn={() => props.onChange(selectedItem(item) ? 0 : item)}
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
      ))}
    </View>
  );
}
