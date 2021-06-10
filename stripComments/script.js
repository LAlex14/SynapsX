function solution(text, markers) { // functia ce primeste textul și caracterele ce delimitează comentariile

    var letters = text.split('\n').map(el => el.split('')); // desparțim textul în șiruri despartite de /n, iar fiecare șir îl despațim pe litere și plasam rezultatul într-o matrice
    const regex = eval(`/[${markers.join('')}]/`); // creăm o expresie regulată cu caracterele ce delimitează comentariile

    letters.forEach((el, pos) => {      // parcurgem textul pe siruri
        el.forEach((letter, pos1) => {  // pargurgem șirurile pe caractere
            if (regex.test(letter))     // verificam daca caracterul e inclus în expresia regulată
                el.splice(pos1);        // în caz că da, ștergem toate caracterele șirului începand cu poziția pe care se află acesta
        })
        letters[pos] = el.join('').trim(); // recreem șirul, concatinind elementele din matrice și ștergem spațiile de la inceput și sfarșit folosind metoda .trim()
    })

    return letters.join('\n'); // returnam textul recreeat, adaugand '\n' între sirurile concatinate
}

var result = solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"]); // efectuam testarea
console.log(result); // afisam rezultatul

