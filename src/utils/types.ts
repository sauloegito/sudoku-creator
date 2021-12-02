export const MACHINE_STATE_FAIL = "Máquina de estados incoerente";

export type GameLevel = "BEGINNER" | "EASY" | "REGULAR" | "HARD" | "EXTREME";
export type GameType = "DEFAULT" | "KILLER";

export type LevelInfo = {
  id: GameLevel;
  label: string;
  numbers: number[];
  count?: number;
  hasSaved?: boolean;
};

export type SavedPlays = {
  [level in GameLevel]: Play | null;
};

export type SavedGames = {
  [level in GameLevel]: Game[];
};

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
};

export interface PlayValue extends GameValue {
  readonly: boolean;
  possibles: number[];
}

export type Play = {
  game: Game;
  values: PlayValue[];
};

const SixNumbers: number[] = Array.from(Array(6), (e, i) => i + 1);
const NineNumbers: number[] = Array.from(Array(9), (e, i) => i + 1);

export const LevelOptions: LevelInfo[] = [
  { id: "BEGINNER", label: "Iniciante", numbers: SixNumbers },
  { id: "EASY", label: "Fácil", numbers: NineNumbers },
  { id: "REGULAR", label: "Clássico", numbers: NineNumbers },
  { id: "HARD", label: "Difícil", numbers: NineNumbers },
  { id: "EXTREME", label: "Muito Difícil", numbers: NineNumbers },
];