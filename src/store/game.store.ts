import { WinCondition } from "@/entities/win-condition";
import { GameMode } from "@/enums/game-mode";
import { Player } from "@/enums/player";
import { create } from "zustand";
import { useWinHistory } from "./win-history.store";

export type GameBoard = (Player | null)[];

type ValidPlayer = Player.X | Player.O;

type GameStore = {
  mainPlayer: ValidPlayer;
  gameMode: GameMode | null;
  board: GameBoard;
  turn: Player;
  winner: Player | null;
  isGameOver: boolean;
  setMainPlayer: (player: ValidPlayer) => void;
  setGameMode: (gameMode: GameMode) => void;
  move: (player: Player, index: number) => void;
  restart: (currentGameMode?: GameMode, mainPlayer?: ValidPlayer) => void;
};

function updateMove(board: GameBoard, turn: Player, index: number) {
  if (board[index] !== null) return board;

  return board.map((row, i) => (i === index ? turn : row));
}

export const useGameStore = create<GameStore>()((set) => {
  return {
    mainPlayer: Player.X,
    gameMode: null,
    board: Array(9).fill(null),
    turn: Player.X,
    winner: Player.X,
    isGameOver: false,
    setMainPlayer: (player) =>
      set((state) => ({ ...state, mainPlayer: player })),
    setGameMode: (gameMode) =>
      set((state) => ({ ...state, gameMode: gameMode })),
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
    restart: (currentGameMode?: GameMode, mainPlayer?: ValidPlayer) => {
      set({
        mainPlayer: mainPlayer ?? Player.X,
        gameMode: currentGameMode ?? GameMode.VSComputer,
        board: Array(9).fill(null),
        turn: Player.X,
        winner: null,
        isGameOver: false,
      });
    },
  };
});
