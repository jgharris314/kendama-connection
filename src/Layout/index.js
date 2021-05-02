import React, { Fragment, useState, useEffect } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import Header from "./Header"
import NotFound from "./NotFound";
import Home from "../Home"
import GameManagement from "../GameManagement"
import MeetUp from "../MeetUp"
function Layout() {

    return (
        <Fragment>
            <Header />
                <Switch>
                    <Route path="/meetup">
                        <MeetUp />
                    </Route>
                    <Route path="/game-management">
                        <GameManagement />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
        </Fragment>
    )

}

export default Layout;