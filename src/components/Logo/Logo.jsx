import React from "react";
import "./style.css";
import LogoImg from "./images/logo.png";

function Logo({size}) {
    return (
        <div
            style={{
                backgroundImage: `url(${LogoImg})`,
                width: `${size}px`,
                height: `${size}px`,
            }}
            className="logo"
        />
    );
}

export default Logo;