class Game {
    constructor(name, categoryId, categoryName) {
        this._name = name;
        this._categoryId = categoryId;
        this._categoryName = categoryName;
        this._score = 0;
        this._questions = 0;
        this._jumps = 2;
        this._half = 2;
    }

    correctAnswer(points) {
        this._score += points;
        this._questions++;
    }

    canUseJump() {
        if(this._jumps <= 0) {
            return false;
        }
        this._jumps--;
        return true;
    }

    canUseHalf() {
        if(this._half <= 0) {
            return false;
        }
        this._half--;
        return true;
    }

    get name() {
        return this._name;
    }

    get categoryId() {
        return this._categoryId;
    }

    get categoryName() {
        return this._categoryName;
    }

    get score() {
        return this._score;
    }

    get questions() {
        return this._questions;
    }

    get jumps() {
        return this._jumps;
    }

    get half() {
        return this._half;
    }
}

export default Game;