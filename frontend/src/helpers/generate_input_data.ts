const INPUT_DATA_GRID_SIZE = 200;

export const SYMBOLS = ['#', '@', '$', '%', '&', '*'];

function generateCell() {
    const isEmpty = Math.random() > 0.7;
    if (isEmpty) return '.';

    const isNumeric = Math.random() > 0.05;
    if (isNumeric) return Math.floor(Math.random() * 10);

    return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

declare global {
    interface Window {
        inputData: string;
    }
}

function generateInputData(): string {
    const inputData = [];

    for (let i = 0; i < INPUT_DATA_GRID_SIZE; i++) {
        const row = [];
        for (let j = 0; j < INPUT_DATA_GRID_SIZE; j++) {
            row.push(generateCell());
        }
        inputData.push(row);
    }

    const finalInputData = inputData.map((row) => row.join(' ')).join('\n');
    window.inputData = finalInputData; // This is useful for cypress tests

    return finalInputData;
}

export default generateInputData;
