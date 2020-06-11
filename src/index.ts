import { drawBoard, updateGame, changeButtonText } from "./ts/draw-game";
import { GameInstance, createBoard, checkCells } from "./ts/game-logic";

const game: GameInstance = {
  board: createBoard(30, 50),
  isRunning: false,
  interval: null,
};

function clearBoard(game: GameInstance): void {
  game.board = createBoard(30, 50);
  drawBoard(game.board);
}

function initGame(game: GameInstance): void {
  game.isRunning = !game.isRunning;
  changeButtonText(game.isRunning);

  if (game.isRunning) {
    game.interval = setInterval((): void => main(game), 350);
  } else {
    clearInterval(game.interval);
    updateGame(game.board);
  }
}

function main(game: GameInstance): void {
  updateGame(game.board);

  const buff: any[] = checkCells(game);

  if (!buff.length) initGame(game);

  buff.forEach((el): void => el());
}

drawBoard(game.board);

const startButton: HTMLElement | null = document.getElementById("start");
const clearButton: HTMLElement | null = document.getElementById("clear");

if (clearButton)
  clearButton.addEventListener("click", (): void => clearBoard(game));
if (startButton)
  startButton.addEventListener("click", (): void => initGame(game));
