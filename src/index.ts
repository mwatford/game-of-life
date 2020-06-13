import { drawBoard, updateGame } from "./ts/draw-game";
import { GameInstance, Cell } from "./ts/game-logic";

const game = new GameInstance({ rows: 30, cols: 50 });

const startButton: HTMLElement = document.getElementById("start")!;
const clearButton: HTMLElement = document.getElementById("clear")!;

clearButton.addEventListener("click", (): void => onClearClick(game));
startButton.addEventListener("click", (): void => initGame(game));

drawBoard(game.board);

function onClearClick(game: GameInstance): void {
  game.initializeBoard();
  drawBoard(game.board);
}

function initGame(game: GameInstance): void {
  game.isRunning = !game.isRunning;
  changeButtonText(game.isRunning);

  if (game.isRunning) {
    game.interval = setInterval((): void => main(game), 350);
  } else {
    clearInterval(game.interval);
  }
}

function main(game: GameInstance): void {
  const buffer: Cell[] = game.getBuffer();

  if (!buffer.length) initGame(game);

  buffer.forEach((el: Cell): void => el.toggleAlive());

  updateGame(buffer);
}

function changeButtonText(isRunning: boolean): void {
  const el = document.getElementById("start")!;

  el.innerHTML = isRunning ? "PAUSE" : "START";
}
