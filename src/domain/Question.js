class Question {
    constructor(
        text="Loading...",
        category="Loading...",
        difficulty="Loading...",
        answers=["", "", "", ""],
        correctAnswer="",
        type="Loading..."
    ) {
        this._text = text;
        this._category = category;
        this._difficulty = difficulty;
        this._answers = answers;
        this._correctAnswer = correctAnswer;
        this._type = type;
    }

    get text() {
        return this._text;
    }

    get category() {
        return this._category;
    }

    get difficulty() {
        return this._difficulty;
    }

    get answers() {
        return this._answers;
    }

    get correctAnswer() {
        return this._correctAnswer;
    }

    get type() {
        return this._type;
    }

    get getScoreValue() {
        switch (this._difficulty.toLowerCase()) {
            case "easy":
                return 10;
            case "medium":
                return 20;
            case "hard":
                return 30;
            default:
                return 0;
        }
    }
}

export default Question;