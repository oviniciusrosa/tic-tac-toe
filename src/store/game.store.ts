import { WinCondition } from "@/entities/win-condition";
import { Player } from "@/enums/player";
import { create } from "zustand";

export type GameBoard = (Player | null)[];

type GameStore = {
  board: GameBoard;
  turn: Player;
  winner: Player | null;
  isGameOver: boolean;
  move: (player: Player, index: number) => void;
  restart: () => void;
};

function updateMove(board: GameBoard, turn: Player, index: number) {
  if (board[index] !== null) return board;

  return board.map((row, i) => (i === index ? turn : row));
}

export const useGameStore = create<GameStore>()((set) => ({
  board: Array(9).fill(null),
  turn: Player.X,
  winner: Player.X,
  isGameOver: false,
  move: (player, index) => {
    set((state) => {
      const updatedBoard = updateMove(state.board, player, index);
      const playerWon = WinCondition.itWins(updatedBoard, player);
      const itsTie = !playerWon && updatedBoard.every((row) => row !== null);

      let winner = null;
      if (playerWon) winner = player;
      if (itsTie) winner = Player.None;

      return {
        ...state,
        turn: player === Player.X ? Player.O : Player.X,
        board: updatedBoard,
        winner: winner,
        isGameOver: playerWon || itsTie,
      };
    });
  },
  restart: () => {
    set({
      board: Array(9).fill(null),
      turn: Player.X,
      winner: null,
      isGameOver: false,
    });
  },
}));
