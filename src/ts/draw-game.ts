import { Cell, Board } from "./game-logic";

export function drawBoard(board: Board): void {
  let container: HTMLElement | null = document.getElementById("board");
  let rows: number = board.length;
  let boardDOM: Element = document.createElement("div");
  boardDOM.id = "board";

  for (let y: number = 0; y < rows; y++) {
    let row = board[y];
    let rowLen = row.length;
    let rowDOM = document.createElement("div");
    rowDOM.className = "row";

    for (let x: number = 0; x < rowLen; x++) {
      let cell = board[y][x];
      let cellDOM = createCellElement(cell);
      rowDOM.appendChild(cellDOM);
    }

    boardDOM.appendChild(rowDOM);
  }

  if (container) container.replaceWith(boardDOM);
}
export function updateGame(board: Board): void {
  const rows: number = board.length;

  for (let y: number = 0; y < rows; y++) {
    const row: Cell[] = board[y];
    const rowLen: number = row.length;

    for (let x: number = 0; x < rowLen; x++) {
      const cell: Cell = board[y][x];
      const cellElement: Element = document
        .getElementsByClassName("row")
        [cell.position.y].getElementsByClassName("cell")[cell.position.x];

      toggleCellClass(cellElement, cell.alive);
    }
  }
}

export function onCellClick(e: Event, cell: Cell): void {
  cell.alive = !cell.alive;
  toggleCellClass(e.target, cell.alive);
}

export function toggleCellClass(el: any, isAlive: boolean): void {
  isAlive
    ? el.classList.add("cell--alive")
    : el.classList.remove("cell--alive");
}

export function createCellElement(cell: Cell): Element {
  const el: Element = document.createElement("div");
  el.className = "cell";

  el.addEventListener("click", (e) => onCellClick(e, cell));

  return el;
}

export function changeButtonText(isRunning: boolean): void {
  const el = document.getElementById("start");

  if (el) el.innerHTML = isRunning ? "PAUSE" : "START";
}
