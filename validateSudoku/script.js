const positiveSudoku = require('./validTestCases'), // importarea matricilor pentru efectuarea testelor
    negativeSudoku = require('./wrongTestCases');

const sudokuValidator = (sudoku) => {   // funcția în sine care primește matricea multi-dimensionala si returneaza rezultatul

    const N = sudoku.length; // numarul de linii
    const rootN = Math.sqrt(N); // radical din numarul de linii
    var validate = [], validate1 = [], correctRows = 0, correctColumns = 0; correctSquares = 0;

    function validationRules() { // regulile de validate
        sudoku.forEach(row => validate.push(row.every(el => el >= 1 && el <= N && Number.isInteger(el)) && row.length === N));
        // cu ajutorul metodelor ce opereaza cu matricile din js, parcurgem fiecare rand din matrice și inseram intr-o matrice unidimensionala rezultatul boolean true daca elementele sirului sunt nr intregi din intervalul 1...N și lungimea randului(numarul de coloane) este egal cu numarul de randuri
        return Number.isInteger(rootN) && rootN > 0 && validate.every(el => el === true);
        // returnam true dacă rootN e intreg, > 0, și daca fiecare rand respecta conditiile de mai sus
    }

    if (validationRules()) {
        //! Rows and columns validation
        for (let i = 0; i < N; i++) {               // parcurgeri
            validate = Array(N).fill(0);     // initializam vectori de lungime N si-i completam cu 0
            validate1 = Array(N).fill(0);    // contor pt numarul de apariții a fiecărei cifre, pozitia insemnand cifra in sine
            for (let j = 0; j < N; j++) {
                validate[sudoku[i][j] - 1]++;       // for rows => incrementam numarul de aparitii a cifrei pe linii
                validate1[sudoku[j][i] - 1]++;      // for columns => scădem 1 la pozitie pt că initializarea incepe de la 0
            }
            correctRows += validate.every(el => el === 1); // incrementam numarul de randuri corecte daca numarul de aparitii a fiecărei cifre e exact 1
            correctColumns += validate1.every(el => el === 1);
        }

        if (correctColumns === N && correctRows === N) { // daca numarul de randuri și coloane corecte este cel necesar, putem trece la verificarea patratelor din interior
            // am adaugat conditia pentru a nu face o parcurgere suplimentara in cazul in care soluția sudoku e greșita
            //! littleSquares validation
            var line = 0, column = 0;
            while (line <= N - rootN) {
                while (column <= N - rootN) {
                    validate = Array(N).fill(0);
                    for (let i = line; i < line + rootN; i++)
                        for (let j = column; j < column + rootN; j++) // parcurgem matricea astfel incat sa putem parcurge pe rand patratele mici
                            validate[sudoku[i][j] - 1]++; // numarul de aparitii a cifrei in patrat
                    correctSquares += validate.every(el => el === 1); // numarul patratelor corecte
                    column += rootN;
                } line += rootN; column = 0;
            }

            return correctSquares === N ? 'Sudoku has been filled out CORRECTLY' // folosind operatorul ternar returnam rezultatul final
                : `${N - correctSquares} Little squares (${rootN}X${rootN}) has been filled out WRONG`;
        } else return N - correctRows ? `${N - correctRows} rows has been filled out WRONG` // pt a sti exact cate randuri sau coloane sunt completate gresit
            : N - correctColumns ? `${N - correctColumns} columns has been filled out WRONG` : 'error';
    } else return 'Validation rules are not followed';  // mesajul returnat in cazult in care regulile de validare nu sunt respectate
}

console.log('-------------- Positive Test Cases --------------');   // efectuarea testărilor
positiveSudoku.forEach((sudokuData, index) => console.log('Test ' + (index + 1) + ': ' + sudokuValidator(sudokuData)));
console.log('-------------- Negative Test Cases --------------');
negativeSudoku.forEach((sudokuData, index) => console.log('Test ' + (index + 1) + ': ' + sudokuValidator(sudokuData)));