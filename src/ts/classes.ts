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
    this.board.length = 0;

    for (let y: number = 0; y < this.size.rows; y++) {
      this.board.push([]);

      for (let x: number = 0; x < this.size.cols; x++) {
        this.board[y].push(new Cell({ x, y }));
      }
    }
  }
  checkCellState(position: CellPosition): boolean {
    try {
      const cell: Cell | null = this.getCell(position);

      return cell.alive;
    } catch (e) {
      return false;
    }
  }
  getCell(position: CellPosition) {
    return this.board[position.y][position.x];
  }
  getCellAliveNeighbourCount(position: CellPosition): number {
    let result: number = 0;

    for (let y: number = -1; y <= 1; y++) {
      for (let x: number = -1; x <= 1; x++) {
        if (x === 0 && y === 0) x++;

        const neighbourPosition: CellPosition = {
          x: position.x - x,
          y: position.y - y,
        };

        if (this.checkCellState(neighbourPosition)) result++;
      }
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

        // push cells which state should change in the next generation
        // to the buffer array
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
