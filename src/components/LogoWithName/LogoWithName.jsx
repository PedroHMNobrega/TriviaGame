import React from "react";
import "./style.css";
import Logo from "../Logo";

function LogoWithName(props) {
    return (
        <section className="logo-with-name">
            <Logo size={100}/>
            <h1 className="logo-with-name_title">Trivia Game</h1>
        </section>
    );
}

export default LogoWithName;