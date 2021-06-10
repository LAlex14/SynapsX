function solution(comment, markers) {

    var letters = comment.split('\n').map(el => el.split(''));
    const regex = eval(`/[${markers.join('')}]/`);

    letters.forEach((el, pos) => {
        el.forEach((letter, pos1) => {
            if (regex.test(letter))
                el.splice(pos1);
        })
        letters[pos] = el.join('').trim();
    })

    return letters.join('\n');
}

console.log(solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"]));

