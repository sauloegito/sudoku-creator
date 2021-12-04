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

  const [inPlay, setInPlay] = useState<Play>(route.params.play);
  const [isOptions, setIsOptions] = useState(false);

  const questionIcon: React.ComponentProps<typeof AntDesign>["name"] = isOptions
    ? "questioncircle"
    : "questioncircleo";

  if (!inPlay) {
    return <AppLoading />;
  }

  function handleGoBack() {
    savePlayedLevel(inPlay);
    goBack();
  }

  useEffect(() => {
    if (!inPlay) {
      return;
    }
    if (inPlay.values.every((v) => Boolean(v.value))) {
      if (!validite(inPlay.values, inPlay.game.levelOption.numbers)) {
        throw "Alguma coisa errada não está certa!";
      }
      alert("Parabéns!!!");
      savePlayedLevel(null);
      goBack();
    }
  }, [inPlay]);

  function restartGame() {
    setInPlay(game2Play(inPlay.game));
  }

  function handleCellPlayClick(
    flatItemIndex: number,
    markValue: (value: PlayValue) => void,
    markPossible: (value: PlayValue) => void
  ): void {
    const values = [...inPlay.values];
    const selectedValue = values[flatItemIndex];
    if (!isOptions) {
      markValue(selectedValue);
    } else {
      markPossible(selectedValue);
    }

    setInPlay({ game: inPlay.game, values });
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
      flatValues={inPlay.values}
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
