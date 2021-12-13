import React from "react";
import { Text, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LevelInfo, LevelOptions } from "../../utils/types";
import { useGame } from "../../hooks/game";
import { styles, itemWidth } from "./styles";

const LevelSelector: React.FC = () => {
  let selectorRef: FlatList<LevelInfo> | null = null;
  const {
    selectedLevel,
    selectedIndexLevel,
    setSelectedIndexLevel,
  } = useGame();

  function isSelected(item: LevelInfo): boolean {
    return item.id === selectedLevel.id;
  }

  function hasNext(): boolean {
    return selectedIndexLevel + 1 < LevelOptions.length;
  }

  function selectNext(): void {
    if (hasNext()) {
      const params = { animated: true, index: selectedIndexLevel + 1 };
      selectorRef?.scrollToIndex(params);
      setSelectedIndexLevel(params.index);
    }
  }

  function hasPrior(): boolean {
    return selectedIndexLevel > 0;
  }

  function selectPrior(): void {
    if (hasPrior()) {
      const params = { animated: true, index: selectedIndexLevel - 1 };
      selectorRef?.scrollToIndex(params);
      setSelectedIndexLevel(params.index);
    }
  }

  return (
    <>
      <FlatList
        ref={(ref) => {
          selectorRef = ref;
        }}
        data={LevelOptions}
        initialScrollIndex={selectedIndexLevel}
        getItemLayout={(_data, index) => ({
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
            onPress={() => setSelectedIndexLevel(index)}
            style={[styles.item, index === 0 && styles.firstItem]}
          >
            <Text style={[styles.text, isSelected(item) && styles.selected]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        onMomentumScrollEnd={(event) => {
          let contentOffset = event.nativeEvent.contentOffset;
          let viewSize = event.nativeEvent.layoutMeasurement;

          let newIndex = Math.round(contentOffset.x / viewSize.width);
          setSelectedIndexLevel(newIndex);
        }}
      />

      {hasPrior() && (
        <TouchableOpacity
          style={[styles.btnFloat, styles.btnLeft]}
          onPress={selectPrior}
        >
          <AntDesign name="left" size={30} style={styles.icon} />
        </TouchableOpacity>
      )}

      {hasNext() && (
        <TouchableOpacity
          style={[styles.btnFloat, styles.btnRight]}
          onPress={selectNext}
        >
          <AntDesign name="right" size={30} style={styles.icon} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default LevelSelector;
