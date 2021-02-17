import React, {useEffect, useState} from "react";
import "./style.css";
import {getQuestion} from "../../models/connectApi";
import Question from "../../domain/Question";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faForward, faQuestionCircle, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import {convertNumberToChar} from "../../models/helper";

function QuestionScreen({game, token, gameOver}) {
    const [question, setQuestion] = useState({question: new Question(), selectedAnswerIndex: null, disabledAnswers: []});
    const [questionNumber, setQuestionNumber] = useState(1);

    useEffect(() => {
        getQuestion(token, game.categoryId).then((newQuestion) => {
            setQuestion({question: newQuestion, selectedAnswerIndex: null, disabledAnswers: []});
        });
    }, [questionNumber]);

    function getAnswerHtml(answer, index) {
        let divClass = "question_answer-container noselect";
        let clickFunction = (event) => {
            setQuestion({...question, selectedAnswerIndex: index, disabledAnswers: question.disabledAnswers});
        }

        if(question.disabledAnswers.includes(answer)) {
            divClass += " question_answer-disabled";
            clickFunction = null;
        } else if(question.selectedAnswerIndex === index) {
            divClass += " question_answer-selected";
        }

        return (
            <div key={index} className={divClass} onClick={clickFunction}>
                <h3>{convertNumberToChar(index)} - {answer}</h3>
            </div>
        );
    }

    function submitQuestion() {
        if(question.selectedAnswerIndex !== null) {
            const selectedAnswer = question.question.answers[question.selectedAnswerIndex];
            if(question.question.correctAnswer === selectedAnswer) {
                game.correctAnswer(question.question.getScoreValue);
                setQuestionNumber(questionNumber + 1);
            } else {
                gameOver();
            }
        }
    }

    function jumpQuestion() {
        if(game.canUseJump()) {
            getQuestion(token, game.categoryId).then((newQuestion) => {
                setQuestion({question: newQuestion, selectedAnswerIndex: null, disabledAnswers: []});
            });
        }
    }

    function halfAnswers() {
        if(game.canUseHalf()) {
            const wrongAnswers = question.question.answers.filter((ans) => {
                return ans !== question.question.correctAnswer
            });
            if(wrongAnswers.length > 1) {
                const removeIndex = Math.floor(Math.random() * wrongAnswers.length);
                wrongAnswers.splice(removeIndex, 1);
            }
            setQuestion({...question, disabledAnswers: wrongAnswers});
        }
    }

    return (
        <section className="question box">
            <div className="question_info">
                <h2>Difficulty: {question.question.difficulty}</h2>
                <h2>Category: {question.question.category}</h2>
            </div>
            <div className="question_title">
                <FontAwesomeIcon icon={faQuestionCircle} size="4x"/>
                <h1>Question {questionNumber}:</h1>
            </div>
            <h2 className="question_game-score">Score: {game.score}</h2>
            <h1 className="question_text noselect">{question.question.text}</h1>
            <div className="question_answers">
                {question.question.answers.map((answer, index) => getAnswerHtml(answer, index))}
            </div>
            <div className="question_help">
                <div className="question_help-container" onClick={halfAnswers}>
                    <span>{game.half}</span>
                    <FontAwesomeIcon icon={faStarHalfAlt} size="2x" className="question_help-icon"/>
                </div>
                <div className="question_help-container" onClick={jumpQuestion}>
                    <span>{game.jumps}</span>
                    <FontAwesomeIcon icon={faForward} size="2x" className="question_help-icon"/>
                </div>
            </div>
            <button onClick={submitQuestion}>Submit</button>
        </section>
    );
}

export default QuestionScreen;