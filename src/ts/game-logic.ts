export class Cell {
  alive: boolean = false;
  position: CellPosition;
  constructor(cellPos: CellPosition) {
    this.position = cellPos;
  }
  setAlive(val: boolean): void {
    this.alive = val;
  }
  getAliveNeighboursCount(board: Board): number {
    let result: number = 0;
    let x: number = -1,
      y: number = -1;

    while (y <= 1) {
      while (x <= 1) {
        if (x === 0 && y === 0) x++;

        let cell: Cell;

        try {
          cell = board[this.position.y - y][this.position.x - x];
          if (cell && cell.alive) result++;
        } catch (e) {}

        x++;
      }
      y++;
      x = -1;
    }

    return result;
  }
}

export interface CellPosition {
  x: number;
  y: number;
}

export interface GameInstance {
  board: Board;
  isRunning: boolean;
  interval: any;
}

export type Board = Cell[][];

export function createBoard(rows: number, cols: number): Board {
  const board: Board = [];

  for (let y: number = 0; y < rows; y++) {
    board.push([]);

    for (let x: number = 0; x < cols; x++) {
      board[y].push(new Cell({ x, y }));
    }
  }

  return board;
}

export function checkCells(game: GameInstance): any[] {
  const result: any[] = [];
  let rows: number = game.board.length;

  for (let y: number = 0; y < rows; y++) {
    let row: Cell[] = game.board[y];
    let cols: number = row.length;

    for (let x: number = 0; x < cols; x++) {
      let cell: Cell = game.board[y][x];
      let aliveNeighbours: number = cell.getAliveNeighboursCount(game.board);

      if (cell.alive && (aliveNeighbours === 3 || aliveNeighbours === 2)) {
        continue;
      } else if (!cell.alive && aliveNeighbours === 3) {
        result.push((): void => cell.setAlive(true));
      } else if (cell.alive) result.push((): void => cell.setAlive(false));
    }
  }
  return result;
}
