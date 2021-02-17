import React, {useEffect, useState} from "react";
import "./style.css";
import IndexDBRepository from "../../models/IndexDBRepository";
import {sortRankingByScore} from "../../models/helper";

function Ranking({db}) {
    const [ranking, setRanking] = useState([{name: "-", questions: "-", score: "-"}]);

    useEffect(() => {
        if(db) {
            IndexDBRepository.getRanking(db).then((result) => {
                setRanking(sortRankingByScore(result));
            });
        }
    }, [db]);

    return (
        <section className="ranking box">
            <h1 className="box-title">Ranking</h1>
            <table className="ranking_table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Questions</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {ranking.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{user.name}</td>
                                <td>{user.category}</td>
                                <td>{user.questions}</td>
                                <td>{user.score}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </section>
    );
}

export default Ranking;