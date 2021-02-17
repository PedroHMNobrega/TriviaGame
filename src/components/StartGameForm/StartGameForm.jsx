import React from "react";
import "./style.css";
import {useState, useEffect} from "react";
import {getCategoryList} from "../../models/connectApi";

function StartGameForm({startGame}) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState(-1);
    const [categoryList, setCategoriesList] = useState([{id:-1, name:"loading..."}]);
    const selectBox = document.querySelector(".start-game-form select");

    useEffect(() => {
        getCategoryList().then((newCategoryList) => {
            setCategoriesList(newCategoryList);
        });
    }, []);

    function validateInput() {
        if(name.trim() === "") {
            console.log("Type a name!")
            return false;
        } else if(category === -1) {
            selectBox.classList.add("select-error");
            return false;
        }
        return true;
    }

    return (
        <section className="start-game-form box">
            <h1 className="box-title">New Game</h1>
            <form onSubmit={(event) => {
                event.preventDefault();
                if(validateInput()) {
                    let categoryName = "";
                    if(category == 0) {
                        categoryName = "All";
                    } else {
                        categoryName = categoryList.filter((categoryValue) => categoryValue.id == category)[0].name;
                    }
                    startGame(name, category, categoryName);
                }
            }}>
                <input
                    required
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <select
                    name="categoria"
                    id="categoria"
                    value={category}
                    onChange={(event) => {
                        selectBox.classList.remove("select-error");
                        setCategory(event.target.value);
                    }}
                >
                    <option value="-1" disabled>Category</option>
                    <option value="0">All</option>
                    {categoryList.map((categoryData, index) => {
                        return <option value={categoryData.id} key={index}>{categoryData.name}</option>;
                    })}
                </select>
                <button>Start Game</button>
            </form>
        </section>
    );
}

export default StartGameForm;