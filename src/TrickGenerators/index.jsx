import React, { Fragment, useState, useEffect } from "react";
import {Link, Route, Switch, useParams } from "react-router-dom";
import "../App.css"

function TrickGenerators() {
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col col-3">
           
              <Link to="/trick-generators/open" className="trick-gen-link row">Open</Link>
              <Link to="/trick-generators/ken" className="trick-gen-link row">K.E.N</Link>
              <Link to="/trick-generators/freestyle" className="trick-gen-link row">Freestyle</Link>
            
          </div>
          <div className="col col-3">
          <Switch>
            <route path="/trick-generators/open">
              <h6>Presets</h6>
              <ul>
                  <li>BATB 2019</li>
                  <li>BATB 2020</li>
                  <li>NAKO 2020</li>
                  <li>These aren't good enough</li>
              </ul>
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
              <h6>spicy this will need to be a trick list loaded in state prolly</h6>
              
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
