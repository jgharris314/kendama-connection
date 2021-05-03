import React, { Fragment, useState, useEffect } from "react";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import "../App.css";
import { listTrickList, listTricks } from "../utils/api";
import OpenGame from "./OpenGame"

function GameManagement() {
  const [trickListsArr, setTrickListsArr] = useState([]);
  const [trickList, setTrickList] = useState({id: 0, tricks: [], name: "",});
  const [formTricks, setFormTricks] = useState([]);
  const [startGame, setStartGame] = useState(false);

  const { url } = useRouteMatch();

  useEffect(() => {
    const aborter = new AbortController();
    const loadOpenTrickLists = async () => {
      try {
        const data = await listTrickList(aborter.signal);
        setTrickListsArr(() => {
          return data;
        });
      } catch (aFit) {
        if (aFit.name === "AbortError") {
          console.log(aFit);
        } else {
          throw aFit;
        }
      }
    };
    loadOpenTrickLists();
    setTrickList({
      id: 0,
      tricks: [],
      name: "",
    });
    setStartGame(false)
  }, []);

  const loadTrickList = (id) => {
    if (id === 0) {
      setTrickList({ id: 0, tricks: [], name: "" });
    } else {
      setTrickList(trickListsArr.find((t) => t.id === id));
    }
  };

  const prepData = (data) => {
    const tricks = data.split(",")
    return {"id":Infinity, "tricks":tricks,"name":"custom"}
  }

  const handleChange = (event) => {
    setFormTricks(event.target.value)
    
 }
  const submitHandler = (event) => {
    event.preventDefault();
      console.log("pog")
      if(formTricks.length){
       const newData = prepData(formTricks) 
       setTrickList(newData)
      setFormTricks([])
      }
      
  }

 
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col col-3">
            <Link to="/game-management/open" className="trick-gen-link row" onClick={() => setStartGame(false)}>
              Open
            </Link>
            <Link to="/game-management/ken" className="trick-gen-link row">
              K.E.N
            </Link>
            <Link
              to="/game-management/freestyle"
              className="trick-gen-link row"
            >
              Freestyle
            </Link>
          </div>
          {!startGame ?(
            <Fragment>
          <div className="col col-3">
            <Switch>
              <route path="/game-management/open" exact>
                <h6>Presets</h6>
                {trickListsArr.map((t) => (
                  <li key={t.id} onClick={() => loadTrickList(t.id)}>
                    {t.name}
                  </li>
                ))}
                <li key={0} onClick={() => loadTrickList(0)}>
                  Back to Creation Form
                </li>
              </route>
              <route path="/game-management/ken">
                <h6>Ken or Dama?</h6>
              </route>
              <route path="/game-management/freestyle">
                <h6>Choose durations</h6>
              </route>
            </Switch>
          </div>

          <div className="col col-6">
            <Switch>
              <route path="/game-management/open" exact>
                {trickList.name.length ? (
                  <Fragment>
                    <h6>{trickList.name}</h6>
                    {trickList.tricks.map((t) => (
                      <li>{t}</li>
                    ))}
                    {trickList.tricks.length ? <Link to={'/game-management/open/play'} onClick={() => setStartGame(true)}>gOgOgO</Link> : null}
                  </Fragment>
                ) : (
                  <Fragment>
                    <p>
                      <strong>This is the creation form to use your own trick list!<br/> </strong>Don't worry if you don't have a trick list prepared! 
                      Choose a preset from the list to the left!
                    </p>
                    <form onSubmit={submitHandler}>
                      <textarea onChange={handleChange} defaultValue="enter,tricks,separated,by,a,comma"></textarea>
                      <button type="submit">GoGoGo</button>
                    </form>
                    
                  </Fragment>
                )}
              </route>
              <route path="/game-management/ken">
                <h6>Garbo prolly gonna do state again</h6>
              </route>
              <route path="/game-management/freestyle">
                <h6>Rekt more state</h6>
              </route>
            </Switch>
          </div>
          </Fragment>)
          : <OpenGame trickList={trickList}/>}
        </div>
      </div>
    </Fragment>
  );
}

export default GameManagement;
