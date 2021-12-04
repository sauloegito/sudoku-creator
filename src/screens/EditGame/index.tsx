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

  const [inGame, setInGame] = useState<Game>(route.params.game);

  function handleDiscard() {
    navigation.goBack();
  }

  function handleSave() {
    try {
      saveGameEdition(inGame);
    } finally {
      navigation.goBack();
    }
  }

  if (!inGame) {
    return <AppLoading />;
  }

  function handleCellEditClick(
    flatItemIndex: number,
    markValue: (value: GameValue) => void
  ): void {
    const values = [...inGame.initialValues];
    markValue(values[flatItemIndex]);
    setInGame({
      type: inGame.type,
      levelOption: inGame.levelOption,
      initialValues: values,
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
      flatValues={inGame.initialValues}
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
}


export default EditGame;