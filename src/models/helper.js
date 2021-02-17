function convertNumberToChar(number) {
    return String.fromCharCode('A'.charCodeAt(0) + number);
}

function sortRankingByScore(ranking) {
    return ranking.sort((u1, u2) => {
        if(u1.score < u2.score) return 1;
        if(u1.score > u2.score) return -1;

        if(u1.questions < u2.questions) return 1;
        if(u1.questions > u2.questions) return -1;

        return 0;
    });
}

export {convertNumberToChar, sortRankingByScore};