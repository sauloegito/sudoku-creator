import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import { AntDesign } from "@expo/vector-icons";
import { useGame } from "../../hooks/game";
import { Sudoku } from "../../components/Sudoku";
import { ButtonControl, Play, PlayValue } from "../../utils/types";
import { NumberProps } from "../../components/NumberInput";
import { RouteProp, useNavigation } from "@react-navigation/core";
import { game2Play, validite } from "../../utils";

export interface PlayGameProps {
  route: RouteProp<{ params: { play: Play } }, "params">;
}

const PlayGame: React.FC<PlayGameProps> = ({ route }) => {
  const { savePlayedLevel } = useGame();
  const { goBack } = useNavigation();
  const inPlay = route.params.play;
  const [values, setValues] = useState<PlayValue[]>([...inPlay.values]);
  const [isOptions, setIsOptions] = useState(false);

  const questionIcon: React.ComponentProps<typeof AntDesign>["name"] = isOptions
    ? "questioncircle"
    : "questioncircleo";

  if (!inPlay) {
    return <AppLoading />;
  }

  function handleGoBack() {
    savePlayedLevel({
      game: inPlay.game,
      values
    });
    goBack();
  }

  useEffect(() => {
    if (!inPlay || !values) {
      return;
    }
    if (values.every((v) => Boolean(v.value))) {
      if (validite(values, inPlay.game.levelOption.numbers)) {
        alert("Parabéns!!!");
        savePlayedLevel(null);
        goBack();
      // } else {
      //   setValues(values);
      }
    }
  }, [inPlay, values]);

  function restartGame() {
    setValues([...inPlay.values]);
    // setInPlay(game2Play(inPlay.game));
  }

  async function handleCellPlayClick(
    flatItemIndex: number,
    markValue: (value: PlayValue) => void,
    markPossible: (value: PlayValue) => void
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const selectedValue = values[flatItemIndex];
      if (!isOptions) {
        selectedValue.valid = true;
        markValue(selectedValue);
      } else {
        if (selectedValue.value) {
          reject();
        }
        markPossible(selectedValue);
      }
  
      setValues(values);
      resolve();
    });
  }

  const ctrls: ButtonControl[] = [
    { antName: "leftcircleo", action: handleGoBack },
    { antName: "reload1", action: restartGame },
    { antName: questionIcon, action: () => setIsOptions(!isOptions) },
  ];

  return (
    <Sudoku
      controls={ctrls}
      numbers={inPlay.game.levelOption.numbers}
      flatValues={values}
      handleFlatItemClick={handleCellPlayClick}
      numberPropPlay={(item: PlayValue) => {
        const prop: NumberProps = {
          col: item.col,
          row: item.row,
          value: item.value,
          possibles: item.possibles,
          readonly: item.readonly,
          valid: item.valid,
        };
        return prop;
      }}
    />
  );
};

export default PlayGame;
