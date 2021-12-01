import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useControls } from "../../hooks/controls";
import { styles } from "./styles";

export function ControlNumber() {
  const { selectedLevel, selectedNumber, setSelectedNumber } = useControls();

  function selectedItem(num: number): boolean {
    return num === selectedNumber;
  }

  return (
    <View>
      <FlatList
        data={selectedLevel.numbers}
        numColumns={Math.ceil(selectedLevel.numbers.length / 2)}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => setSelectedNumber(selectedItem(item) ? 0 : item)}
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
