import { GameMode } from "@/enums/game-mode";
import { Player } from "@/enums/player";
import { create } from "zustand";
import { useGameStore } from "./game.store";
import { persist } from "zustand/middleware";

export type GameBoard = (Player | null)[];

export type WinHistoryStore = {
  [GameMode.VSComputer]: {
    [Player.X]: number;
    [Player.O]: number;
    [Player.None]: number;
  };
  [GameMode.VSHuman]: {
    [Player.X]: number;
    [Player.O]: number;
    [Player.None]: number;
  };
  upadteWinCount: (player: Player, gameMode: GameMode) => void;
};

export const useWinHistory = create<WinHistoryStore>()(
  persist(
    (set) => ({
      [GameMode.VSComputer]: {
        x: 0,
        o: 0,
        none: 0,
      },
      [GameMode.VSHuman]: {
        x: 0,
        o: 0,
        none: 0,
      },
      upadteWinCount: (player, gameMode) => {
        set((state) => ({
          ...state,
          [gameMode]: {
            ...state[gameMode],
            [player]: state[gameMode][player] + 1,
          },
        }));
      },
    }),
    { name: "@tic-tac-toe-win-history" }
  )
);
