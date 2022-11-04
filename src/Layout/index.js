import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";

import Home from "./Home";
import Study from "./Study";
import Deck from "./Deck";
import CreateDeck from "./CreateDeck";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";




function Layout() {
  return (
    <div className="container">
      <Header />
        <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/decks/new">
          <CreateDeck />
        </Route>
        <Route path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route exact path="/decks/:deckId">
          <Deck />
        </Route>
        <Route  path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <AddCard />
        </Route>
        <Route  path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        <Route>
        <NotFound />
        </Route>
        </Switch>
    </div>
  );
}

export default Layout;
