import { AppService } from './app.service';

describe('AppService', () => {
    let appService: AppService;

    beforeEach(async () => {
        appService = new AppService();
    });

    describe('parseAndRotateMatrix', () => {
        it('should allow empty matrix', () => {
            const matrixString = '';
            const matrix = appService.parseAndRotateMatrix(matrixString);
            expect(matrix).toEqual([]);
        });
        it('should allow single-cell matrix', () => {
            const matrixString = '.';
            const matrix = appService.parseAndRotateMatrix(matrixString);
            expect(matrix).toEqual([['.']]);
        });
        it('should throw for non-square matrix', () => {
            let matrixString = '1 2 3\n4 5 6'; // More columns than rows
            expect(() => appService.parseAndRotateMatrix(matrixString)).toThrow();
            matrixString = '1\n4'; // More rows than columns
            expect(() => appService.parseAndRotateMatrix(matrixString)).toThrow();
        });
        it('should throw for invalid characters', () => {
            const matrixString = '1 2 3\n4 a 6\n7 8 9';
            expect(() => appService.parseAndRotateMatrix(matrixString)).toThrow();
        });
        it('should throw for numbers other than 0-9', () => {
            const matrixString = '1 2 3\n4 55 6\n7 8 9';
            expect(() => appService.parseAndRotateMatrix(matrixString)).toThrow();
        });
        it('should convert simple matrix', () => {
            const matrixString = '1 2 3\n4 * 6\n7 8 9';
            const matrix = appService.parseAndRotateMatrix(matrixString);
            expect(matrix).toEqual([
                [4, 7, 0],
                [3, '*', 9],
                [2, 5, 8],
            ]);
        });
        it('should convert more complicated matrix', () => {
            const matrixString = '. . * . .\n. 1 2 3 .\n@ 4 * 6 $\n. 7 8 9 .\n. . % . .';
            const matrix = appService.parseAndRotateMatrix(matrixString);
            expect(matrix).toEqual([
                ['.', '.', '$', '.', '.'],
                ['.', 4, 7, 0, '.'],
                ['*', 3, '*', 9, '%'],
                ['.', 2, 5, 8, '.'],
                ['.', '.', '@', '.', '.'],
            ]);
        });
    });
    describe('matrixToNeighborhoods', () => {
        it('should convert empty matrix', () => {
            const matrix = [];
            const neighborhoods = appService.matrixToNeighborhoods(matrix);
            expect(neighborhoods).toEqual([]);
        });
        it('should convert simple matrix', () => {
            const matrix = [
                [1, 2, 3],
                [4, '*', 6],
                [7, 8, 9],
            ];
            const neighborhoods = appService.matrixToNeighborhoods(matrix);
            expect(neighborhoods).toEqual([{
                id: '1-1',
                type: '*',
                value: 40,
                cells: [
                    [1, 2, 3],
                    [4, '*', 6],
                    [7, 8, 9],
                ],
            }]);
        });
        it('should convert more complicated matrix', () => {
            const matrix = [
                ['.', '.', '$', '.', '.'],
                ['.', 1, 2, 3, '.'],
                ['*', 4, '*', 6, '%'],
                ['.', 7, 8, 9, '.'],
                ['.', '.', '@', '.', '.'],
            ];
            const neighborhoods = appService.matrixToNeighborhoods(matrix);
            expect(neighborhoods).toEqual([
                {
                    id: '0-2',
                    type: '$',
                    value: 6,
                    cells: [
                        [undefined, undefined, undefined],
                        ['.', '$', '.'],
                        [1, 2, 3],
                    ],
                },
                {
                    id: '2-0',
                    type: '*',
                    value: 12,
                    cells: [
                        [undefined, '.', 1],
                        [undefined, '*', 4],
                        [undefined, '.', 7],
                    ],
                },
                {
                    id: '2-2',
                    type: '*',
                    value: 40,
                    cells: [
                        [1, 2, 3],
                        [4, '*', 6],
                        [7, 8, 9],
                    ],
                },
                {
                    id: '2-4',
                    type: '%',
                    value: 18,
                    cells: [
                        [3, '.', undefined],
                        [6, '%', undefined],
                        [9, '.', undefined],
                    ],
                },
                {
                    id: '4-2',
                    type: '@',
                    value: 24,
                    cells: [
                        [7, 8, 9],
                        ['.', '@', '.'],
                        [undefined, undefined, undefined],
                    ],
                },
            ]);
        });
    });
});
