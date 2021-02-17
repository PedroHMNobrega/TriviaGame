import React, {useState, useEffect} from "react";
import "./style.css";
import LogoWithName from "../LogoWithName";
import StartGameForm from "../StartGameForm";
import Ranking from "../Ranking";
import Game from "../../domain/Game";
import {getToken} from "../../models/connectApi";
import QuestionScreen from "../Question";
import GameOverScreen from "../GameOverScreen";
import IndexDBRepository from "../../models/IndexDBRepository";

function MainScreen(props) {
    const [game, setGame] = useState({game: null, state: "Menu"});
    const [token, setToken] = useState();
    const [db, setDb] = useState();

    useEffect(() => {
        getToken().then((newToken) => {
            setToken(newToken);
        });

        IndexDBRepository.getDb().then((result) => {
            setDb(result);
        });
    }, []);

    function startGame(name, categoryId, categoryName) {
        setGame({game: new Game(name, categoryId, categoryName), state: "Game"});
    }

    function gameOver() {
        setGame({...game, state: "GameOver"});
        if(game.game.questions > 0) {
            IndexDBRepository.add(db, game.game);
        }
    }

    function backToMenu() {
        setGame({game: null, state: "Menu"});
    }

    const states = {
        "Menu": (
            <section className="main-screen container">
                <LogoWithName/>
                <StartGameForm startGame={startGame}/>
                <Ranking db={db}/>
                <footer/>
            </section>
        ),
        "Game": (
            <section className="main-screen container">
                <LogoWithName/>
                <QuestionScreen game={game.game} token={token} gameOver={gameOver}/>
                <footer/>
            </section>
        ),
        "GameOver": (
            <section className="main-screen container">
                <LogoWithName/>
                <GameOverScreen backToMenu={backToMenu} game={game.game}/>
                <footer/>
            </section>
        )
    }

    return states[game.state];
}

export default MainScreen;