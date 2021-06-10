const positiveSudoku = require('./validTestCases'),
    negativeSudoku = require('./wrongTestCases');

const sudokuValidator = (sudoku) => {

    const N = sudoku.length; // number of rows
    const rootN = Math.sqrt(N);
    var validate = [], validate1 = [], correctRows = 0, correctColumns = 0; correctSquares = 0;

    function validationRules() {
        sudoku.forEach(row => validate.push(row.every(el => el >= 1 && el <= N && Number.isInteger(el)) && row.length === N));
        return Number.isInteger(rootN) && rootN > 0 && validate.every(el => el === true);
    }

    if (validationRules()) {
        //! Rows and columns validation
        for (let i = 0; i < N; i++) {
            validate = Array(N).fill(0);
            validate1 = Array(N).fill(0);
            for (let j = 0; j < N; j++) { // elementul 
                validate[sudoku[i][j] - 1]++; // for rows
                validate1[sudoku[j][i] - 1]++; // for columns
            }
            correctRows += validate.every(el => el === 1);
            correctColumns += validate1.every(el => el === 1);
        }

        if (correctColumns === N && correctRows === N) {

            //! littleSquares validation
            var line = 0, column = 0;
            while (line <= N - rootN) {
                while (column <= N - rootN) {
                    validate = Array(N).fill(0);
                    for (let i = line; i < line + rootN; i++)
                        for (let j = column; j < column + rootN; j++)
                            validate[sudoku[i][j] - 1]++;
                    correctSquares += validate.every(el => el === 1);
                    column += rootN;
                } line += rootN; column = 0;
            }

            return correctSquares === N ? 'Sudoku has been filled out CORRECTLY'
                : `${N - correctSquares} Little squares (${rootN}X${rootN}) has been filled out WRONG`;
        } else return N - correctRows ? `${N - correctRows} rows has been filled out WRONG`
            : N - correctColumns ? `${N - correctColumns} columns has been filled out WRONG` : 'error';
    } else return 'Validation rules are not followed';
}

console.log('-------------- Positive Test Cases --------------');
positiveSudoku.forEach(sudokuData => console.log(sudokuValidator(sudokuData)));
console.log('-------------- Negative Test Cases --------------');
negativeSudoku.forEach(sudokuData => console.log(sudokuValidator(sudokuData)));