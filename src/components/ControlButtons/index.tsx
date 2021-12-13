import React from "react";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ButtonControl } from "../../utils/types";
import { styles } from "./styles";

export interface ControlButtonsProps {
  buttons: ButtonControl[];
}

export function ControlButtons({ buttons }: ControlButtonsProps) {
  return (
    <View style={styles.gameControls}>
      {buttons.map((b) => (
        <TouchableOpacity style={styles.btnControl} onPressIn={b.action} key={b.antName}>
          <AntDesign name={b.antName} size={34} style={styles.icon} />
        </TouchableOpacity>
      ))}
    </View>
  );
}
