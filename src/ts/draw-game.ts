import { Cell } from "./classes";

export function drawBoard(board: Cell[][]): void {
  let container: HTMLElement = document.getElementById("board")!;
  let rows: number = board.length;
  let boardElement: HTMLElement = document.createElement("div");
  boardElement.id = "board";

  for (let y: number = 0; y < rows; y++) {
    let row: Cell[] = board[y];
    let rowLength: number = row.length;
    let rowElement: HTMLElement = document.createElement("div");
    rowElement.className = "row";

    for (let x: number = 0; x < rowLength; x++) {
      let cell: Cell = board[y][x];
      let cellElement: HTMLElement = createCellElement(cell);
      rowElement.appendChild(cellElement);
    }

    boardElement.appendChild(rowElement);
  }

  container.replaceWith(boardElement);
}

export function updateGame(buffer: Cell[]): void {
  buffer.forEach((cell: Cell): void => {
    const cellElement: Element | null = getCellElement(
      cell.position.x,
      cell.position.y
    );

    if (cellElement) toggleCellClass(cellElement);
  });
}

function getCellElement(x: number, y: number): Element | null {
  return document
    .getElementsByClassName("row")
    [y].getElementsByClassName("cell")[x];
}

function onCellClick(e: Event, cell: Cell): void {
  cell.toggleAlive();
  toggleCellClass(e.target);
}

function toggleCellClass(el: any): void {
  el.classList.toggle("cell--alive");
}

function createCellElement(cell: Cell): HTMLElement {
  const el: HTMLElement = document.createElement("div");
  el.className = "cell";

  el.addEventListener("click", e => onCellClick(e, cell));

  return el;
}
