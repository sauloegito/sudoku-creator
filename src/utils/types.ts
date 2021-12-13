import { AntDesign } from '@expo/vector-icons';
import { GestureResponderEvent } from "react-native";

export const MACHINE_STATE_FAIL = "Máquina de estados incoerente";

export const LEVELS = ["BEGINNER", "EASY", "REGULAR", "HARD", "EXTREME"] as const;
export type GameLevel = typeof LEVELS[number];
export type GameType = "DEFAULT" | "KILLER";

export type LevelInfo = {
  id: GameLevel;
  label: string;
  numbers: number[];
  count?: number;
  hasSaved?: boolean;
}

export type SavedPlays = {
  [level in GameLevel]: Play | null;
}

export type SavedGames = {
  [level in GameLevel]: Game[];
}

export interface Position {
  col: number;
  row: number;
  readonly: boolean,
  valid: boolean;
}

export interface GameValue extends Position {
  value?: number;
}

export type Game = {
  type: GameType;
  levelOption: LevelInfo;
  initialValues: GameValue[];
}

export interface PlayValue extends GameValue {
  possibles: number[];
}

export type Play = {
  game: Game;
  values: PlayValue[];
}

export type ButtonControl = {
  antName: React.ComponentProps<typeof AntDesign>['name'];
  action: (event: GestureResponderEvent) => void;
}

function mountArrayNumbers(size: number): number[] {
  return Array.from(Array(size), (_, i) => i + 1);;
}
const SixNumbers = mountArrayNumbers(6);
const NineNumbers = mountArrayNumbers(9);

export const LevelOptions: LevelInfo[] = [
  { id: "BEGINNER", label: "Iniciante", numbers: SixNumbers },
  { id: "EASY", label: "Fácil", numbers: NineNumbers },
  { id: "REGULAR", label: "Clássico", numbers: NineNumbers },
  { id: "HARD", label: "Difícil", numbers: NineNumbers },
  { id: "EXTREME", label: "Muito Difícil", numbers: NineNumbers },
]