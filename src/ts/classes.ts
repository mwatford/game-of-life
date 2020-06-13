interface CellPosition {
  x: number;
  y: number;
}

export class Cell {
  alive: boolean = false;
  position: CellPosition;

  constructor(cellPos: CellPosition) {
    this.position = cellPos;
  }

  toggleAlive(): void {
    this.alive = !this.alive;
  }
}

interface Size {
  rows: number;
  cols: number;
}

export class GameInstance {
  size: Size;
  board: Cell[][];
  isRunning: boolean;
  interval: any;

  constructor(size: Size) {
    this.size = size;
    this.isRunning = false;
    this.board = [];
    this.initializeBoard();
  }

  initializeBoard(): void {
    const board: Cell[][] = [];

    for (let y: number = 0; y < this.size.rows; y++) {
      board.push([]);

      for (let x: number = 0; x < this.size.cols; x++) {
        board[y].push(new Cell({ x, y }));
      }
    }

    this.board = board;
  }
  checkCellState(position: CellPosition): boolean {
    try {
      const cell: Cell | null = this.getCell(position);

      if (cell?.alive) return true;

      return false;
    } catch (e) {
      return false;
    }
  }
  getCell(position: CellPosition) {
    return this.board[position.y][position.x];
  }
  getCellAliveNeighbourCount(position: CellPosition): number {
    let result: number = 0;
    let x: number = -1,
      y: number = -1;

    while (y <= 1) {
      while (x <= 1) {
        if (x === 0 && y === 0) x++;

        const neighbourPosition: CellPosition = {
          x: position.x - x,
          y: position.y - y,
        };

        if (this.checkCellState(neighbourPosition)) result++;

        x++;
      }
      y++;
      x = -1;
    }

    return result;
  }
  getBuffer(): Cell[] {
    const result: Cell[] = [];

    for (let y: number = 0; y < this.size.rows; y++) {
      for (let x: number = 0; x < this.size.cols; x++) {
        const cell: Cell = this.getCell({ x, y });
        const aliveNeighbours: number = this.getCellAliveNeighbourCount({
          x,
          y,
        });

        //determine cell state in the next generation
        if (cell.alive && (aliveNeighbours === 3 || aliveNeighbours === 2)) {
          continue;
        } else if (!cell.alive && aliveNeighbours === 3) {
          result.push(cell);
        } else if (cell.alive) result.push(cell);
      }
    }
    return result;
  }
}
