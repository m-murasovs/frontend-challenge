import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

const ALLOWED_SYMBOLS = ['#', '@', '$', '%', '&', '*'];
const ALLOWED_CHARACTERS = ['.', ...ALLOWED_SYMBOLS];

type MatrixCell = number | string;
type Matrix = Array<Array<MatrixCell>>;
type MatrixNeighborhood = {
    id: string,
    type: string,
    value: number,
    cells: Matrix,
};

@Injectable()
export class AppService {
    /**
     * Takes a string representation of a matrix and returns an array representation,
     * rotated 90 degrees counter-clockwise with all numbers increased by one.
     *
     * Example:
     * First we rotate the matrix
     * . 1 2 3    3 6 9 .
     * . 4 * 6 -> 2 * 8 .
     * . 7 8 9    1 4 7 .
     * . . . .    . . . .
     * Then (or at the same time) we increase all numbers by one
     * 3 6 9 .    4 7 0 .
     * 2 * 8 . -> 3 * 9 .
     * 1 4 7 .    2 5 8 .
     * . . . .    . . . .
     *
     * And finally we output the result as an array of arrays:
     * [
     *  [4, 7, 0, '.'],
     *  [3, '*', 9, '.'],
     *  [2, 5, 8, '.'],
     *  ['.', '.', '.', '.'],
     * ]
     *
     * @param matrixString String representation of a square matrix, numbers are between 0 and 9, the only allowed characters are '.', '#', '@', '$', '%', '&', '*'
     * @returns Array representation of the matrix, rotated 90 degrees counter-clockwise with all numbers increased by one
     * @throws HttpException if matrix is not square, contains invalid characters, or numbers are not between 0 and 9
     */
    public parseAndRotateMatrix(matrixString: string): Matrix {
        if (matrixString === '') return [];

        const result: Matrix = [];

        const rows = matrixString.split('\n');
        const matrixDimension = rows.length;

        // Init the matrix
        for (let i = 0; i < matrixDimension; i++) result[i] = [];

        for (let i = 0; i < matrixDimension; i++) {
            const rowVals = rows[i].split(' ');

            if (rowVals.length !== matrixDimension) throw new HttpException('Matrix is not square', HttpStatus.BAD_REQUEST);

            for (let j = 0; j < matrixDimension; j++) {
                const numericVal = Number.parseInt(rowVals[j]);
                if (Number.isNaN(numericVal)) {
                    if (!ALLOWED_CHARACTERS.includes(rowVals[j])) {
                        throw new HttpException('Matrix contains invalid characters', HttpStatus.BAD_REQUEST);
                    }

                    result[matrixDimension - j - 1][i] = rowVals[j];
                } else {
                    if (numericVal < 0 || numericVal > 9) {
                        throw new HttpException('Matrix contains numbers that are not between 0 and 9', HttpStatus.BAD_REQUEST);
                    }

                    result[matrixDimension - j - 1][i] = (numericVal + 1) % 10;
                }
            }
        }

        return result;
    }

    /**
     * Takes an array representation of a matrix and returns an array of neighborhoods.
     * The ID of the neighborhood is the coordinates of the central cell in the matrix in the format `<rowIndex>-<cellIndex>`.
     * The type of the neighborhood is the symbol in the central cell.
     * The value of the neighborhood is the sum of all numbers in the neighborhood.
     * The cells of the neighborhood are the 3x3 matrix around the central cell.
     *
     * Example:
     * [
     *  [4, 7, 0, '.'],
     *  [3, '*', 9, '.'],
     *  [2, 5, 8, '.'],
     *  ['.', '.', '.', '.'],
     * ]
     *
     * ->
     *
     * [{
     *  id: '1-1',
     *  type: '*',
     *  value: 38,
     *  cells: [
     *    [4, 7, 0],
     *    [3, '*', 9],
     *    [2, 5, 8],
     *  ],
     * }]
     *
     * @param matrix Array representation of the matrix, numbers are already parsed as numbers
     * @returns Array of neighborhoods. Each neighborhood contains the type of the cell, the value of the neighborhood and the cells of the neighborhood,
     * The ID of the neighborhood is the coordinates of the central cell in the matrix.
     */
    public matrixToNeighborhoods(matrix: Matrix): MatrixNeighborhood[] {
        const neighborhoods = [];

        matrix.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                // Identify central cells
                if (typeof cell === 'string' && ALLOWED_SYMBOLS.includes(cell)) {
                    const id = `${rowIndex}-${cellIndex}`;

                    // Get values based on coordinates
                    const cellIndexesToCheck = [
                        cellIndex - 1,
                        cellIndex,
                        cellIndex + 1,
                    ];

                    const prevRowValues = cellIndexesToCheck.map(index => {
                        if (matrix[rowIndex - 1]) {
                            return matrix[rowIndex - 1][index];
                        }
                    });

                    const currentRowValues = cellIndexesToCheck.map(index => {
                        return matrix[rowIndex][index];
                    });

                    const nextRowValues = cellIndexesToCheck.map(index => {
                        if (matrix[rowIndex + 1]) {
                            return matrix[rowIndex + 1][index];
                        }
                    });

                    const neighborhoodCells = [
                        prevRowValues,
                        currentRowValues,
                        nextRowValues,
                    ];

                    // Get the number values from the neighborhood
                    const neighborhoodCellsNumbers = [];
                    neighborhoodCells.forEach(arr => {
                        if (!arr) return [];
                        neighborhoodCellsNumbers.push(...arr.filter(Number));
                    });

                    neighborhoods.push({
                        id,
                        type: cell,
                        value: neighborhoodCellsNumbers.length ? neighborhoodCellsNumbers.reduce((acc, curr) => acc + curr) : 0,
                        cells: neighborhoodCells,
                    });
                }
            });
        });

        return neighborhoods;
    };
}
