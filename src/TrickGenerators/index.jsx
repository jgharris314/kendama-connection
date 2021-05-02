import React, { Fragment, useState, useEffect } from "react";
import { Link, Route, Switch, useParams } from "react-router-dom";
import "../App.css";
import { listTrickList, listTricks } from "../utils/api";

function TrickGenerators() {
  const [trickListsArr, setTrickListsArr] = useState([]);
  const [trickList, setTrickList] = useState({
    id: 0,
    tricks: [],
    name: "Pick or create a tricklist.",
  });

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
  }, []);

  const loadTrickList = async (id) => {
    setTrickList(trickListsArr.find((t) => t.id === id));
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col col-3">
            <Link to="/trick-generators/open" className="trick-gen-link row">
              Open
            </Link>
            <Link to="/trick-generators/ken" className="trick-gen-link row">
              K.E.N
            </Link>
            <Link
              to="/trick-generators/freestyle"
              className="trick-gen-link row"
            >
              Freestyle
            </Link>
          </div>
          <div className="col col-3">
            <Switch>
              <route path="/trick-generators/open">
                <h6>Presets</h6>
                {trickListsArr.map((t) => (
                  <li key={t.id} onClick={() => loadTrickList(t.id)}>
                    {t.name}
                  </li>
                ))}
                <li>WACK I wanna make my own</li>
              </route>
              <route path="/trick-generators/ken">
                <h6>Ken or Dama?</h6>
              </route>
              <route path="/trick-generators/freestyle">
                <h6>Choose durations</h6>
              </route>
            </Switch>
          </div>

          <div className="col col-6">
            <Switch>
              <route path="/trick-generators/open">
                <h6>{trickList.name}</h6>
                {trickList.tricks.map((t) => (
                  <li>{t}</li>
                ))}
                {trickList.tricks.length ? <button>GOGOGOGO</button> : null}
              </route>
              <route path="/trick-generators/ken">
                <h6>Garbo prolly gonna do state again</h6>
              </route>
              <route path="/trick-generators/freestyle">
                <h6>Rekt more state</h6>
              </route>
            </Switch>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TrickGenerators;
