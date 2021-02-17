import React from "react";
import "./style.css";

function GameOverScreen({backToMenu, game}) {
    return (
        <section className="game-over-screen box">
            <h1 className="box-title">Game Over</h1>
            <div className="game-over-screen_info">
                <span>Questions: {game.questions}</span>
                <span>Score: {game.score}</span>
            </div>
            <button onClick={backToMenu}>
                Menu
            </button>
        </section>
    );
}

export default GameOverScreen;