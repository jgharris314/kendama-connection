import React, { Fragment, useState, useEffect } from "react";
import "../../App.css";


function OpenGame({ trickList }) {
  const [gameTrickList, setGameTrickList] = useState(trickList.tricks);
  const [usedTrickList, setUsedTrickList] = useState([]);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [currentTrick, setCurrentTrick] = useState("");

  const initialState = () => {
    setGameTrickList(trickList.tricks);
    setUsedTrickList([]);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setCurrentTrick("");
  };

  const increasePlayerOneScore = () => {
    if (playerOneScore < 3) {
      setPlayerOneScore(playerOneScore + 1);
    } else {
      initialState();
    }
  };

  const increasePlayerTwoScore = () => {
    if (playerTwoScore < 3) {
      setPlayerTwoScore(playerTwoScore + 1);
    } else {
      initialState();
    }
  };

  const nextTrick = () => {
    if (gameTrickList.length) {
      const chosenTrick =
        gameTrickList[Math.floor(Math.random() * gameTrickList.length)];
      setCurrentTrick(chosenTrick);
      const filtered = gameTrickList.filter((t) => t !== chosenTrick);
      setUsedTrickList([...usedTrickList, chosenTrick]);
      setGameTrickList([...filtered]);
    } else {
      setGameTrickList(trickList.tricks);
      setUsedTrickList([]);
      setCurrentTrick("");
    }
  };

  return (
    <Fragment className="container">
      <div className="row">
        <div className="col">
          <h4>Tricks Remaining</h4>
          {
            <ul>
              {" "}
              {gameTrickList.map((t) => (
                <li>{t}</li>
              ))}
            </ul>
          }
        </div>
        <div className="col">
          <h4>Lace it!</h4>
          {<h5>{currentTrick}</h5>}
        </div>
        <div className="col">
          <h4>Been there done that!</h4>
          {
            <ul>
              {" "}
              {usedTrickList.map((t) => (
                <li>{t}</li>
              ))}
            </ul>
          }
        </div>
      </div>
      <div className="row">
        <h6>Player One: {playerOneScore}</h6>
        <h6>Player Two: {playerTwoScore}</h6>
        <button onClick={nextTrick}>Go!</button>
        <button onClick={increasePlayerOneScore}>P1</button>
        <button onClick={increasePlayerTwoScore}>P2</button>
      </div>
    </Fragment>
  );
}

export default OpenGame;
