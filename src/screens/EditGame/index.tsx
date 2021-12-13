import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { RouteProp, useNavigation } from "@react-navigation/core";
import { Sudoku } from "../../components/Sudoku";
import { NumberProps } from "../../components/NumberInput";
import { useGame } from "../../hooks/game";
import { ButtonControl, Game, GameValue } from "../../utils/types";

export interface EditGameProps {
  route: RouteProp<{ params: { game: Game } }, "params">;
}

const EditGame: React.FC<EditGameProps> = ({ route }) => {
  const { saveGameEdition } = useGame();
  const navigation = useNavigation();

  const inGame = route.params.game;
  const [values, setValues] = useState<GameValue[]>(inGame.initialValues);

  function handleDiscard() {
    navigation.goBack();
  }

  function handleSave() {
    try {
      saveGameEdition({
        type: inGame.type,
        levelOption: inGame.levelOption,
        initialValues: values,
      });
    } finally {
      navigation.goBack();
    }
  }

  if (!inGame) {
    return <AppLoading />;
  }

  async function handleCellEditClick(
    flatItemIndex: number,
    markValue: (item: GameValue) => void
  ): Promise<void> {
    return new Promise<void>((resolve, _reject) => {
      markValue(values[flatItemIndex]);
      //setValues(values);
      resolve();
    });
  }

  const ctrls: ButtonControl[] = [
    { antName: "closesquareo", action: handleDiscard },
    { antName: "checksquareo", action: handleSave },
  ];

  return (
    <Sudoku
      controls={ctrls}
      numbers={inGame.levelOption.numbers}
      flatValues={values}
      handleFlatItemClick={handleCellEditClick}
      numberPropGame={(item: GameValue) => {
        const prop: NumberProps = {
          col: item.col,
          row: item.row,
          value: item.value,
          possibles: [],
          readonly: false,
          valid: item.valid,
        };
        return prop;
      }}
    />
  );
};

export default EditGame;
