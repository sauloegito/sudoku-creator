import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GameLevel, LevelInfo, LevelOptions } from "../../utils/types";
import { useGame } from "../../hooks/game";
import { styles, itemWidth } from "./styles";

const LevelSelector: React.FC = () => {
  const { selectedLevel, setSelectedLevel } = useGame();

  function handleSelectLevel(index: number) {
    setSelectedLevel(LevelOptions[index]);
  }

  function isSelected(item: LevelInfo): boolean {
    return item.id === selectedLevel.id;
  }

  return (
    <>
      <VirtualizedList
        data={LevelOptions}
        getItem={(data: LevelInfo[], index: number) => data[index]}
        getItemCount={(data: LevelInfo[]) => data.length}
        getItemLayout={(_data: LevelInfo[], index) => ({
          length: itemWidth,
          offset: itemWidth * index,
          index,
        })}
        horizontal={true}
        keyExtractor={(item) => item.id}
        listKey="level-selector"
        style={styles.dataContainer}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleSelectLevel(index)}
            style={[styles.item, index === 0 && styles.firstItem]}
          >
            <Text
              style={[
                styles.text,
                isSelected(item) && styles.selected,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={[styles.btnFloat, styles.btnLeft]}>
        <AntDesign name="left" size={30} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btnFloat, styles.btnRight]}>
        <AntDesign name="right" size={30} style={styles.icon} />
      </TouchableOpacity>
    </>
  );
};

export default LevelSelector;
