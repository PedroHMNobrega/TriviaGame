import Question from "../domain/Question";

function getToken() {
    const requestToken = request('https://opentdb.com/api_token.php?command=request');
    return requestToken
        .then((data) => {
            return data.token;
        });
}

function getCategoryList() {
    const requestCategoryList = request('https://opentdb.com/api_category.php');
    return requestCategoryList
        .then((data) => {
            return data.trivia_categories;
        });
}

function getQuestion(token, category) {
    let url = `https://opentdb.com/api.php?amount=1&token=${token}`;
    if(category !== "0") {
        url += "&category=" + category;
    }

    const requestQuestion = request(url);
    return requestQuestion
        .then((data) => {
            const question = data.results[0];
            let answers = [...question.incorrect_answers, question.correct_answer];
            answers.sort(() => Math.random() - 0.5);
            for(let i = 0; i < answers.length; i++) {
                answers[i] = decodeHtml(answers[i]);
            }

            return new Question(
                decodeHtml(question.question),
                decodeHtml(question.category),
                question.difficulty,
                answers,
                decodeHtml(question.correct_answer),
                question.type
            );
        });
}

function request(url) {
    return fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error('Error connecting with opentdb!');
            }
            return response.json();
        });
}

function decodeHtml(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

export {getToken, getQuestion, getCategoryList};