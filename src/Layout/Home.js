// Home("/")
// Link to <Study />(Study), <Deck />(View), <CreateDeck />(Create deck)
    // <Link> </Link>
// Shows a list of decks with options to create, study, view, or delete a deck.
    // The first page the user sees.
    // <button>Create Deck</button> => brings the user to the <CreateDeck /> screen.
    // (Existing decks) each shown with the deck name, number of cards, <button>Study, View, Delete</button>
    // <button>Study</button> : brings the user to the <Study /> screen.
    // <button>View</button> : brings the user to the <Deck /> screen.
    // <button>Delete</button> : shows a warning message before deleting the deck.
        // deleteHandler()
        // window.confirm() to create the modal dialog.
            // "Delete this deck?" "You will not be able to recover it."
            // <button>OK</button> :  Right Side.
            // deleted; no longer visible on the <Home /> screen.
            // <button>Cancel</button> : Left Side.
            // useHistory();

import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import { listDecks, deleteDeck } from "../utils/api/index.js";

function Home() {
    // Set the data of deck
        // useState();
    const [deckList, setDeckList] = useState([]);
    // useHistory(); for deleteHandler.
    const history = useHistory();

    // AbortController(Module 24)
        // useEffect(() =>)
    // Utility functions(src/utils/api/index.js)
        // listDecks() already called API.
    useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
        try {
        const response = await listDecks();     
        setDeckList(response);
        } catch (error) {
        console.log(error);
        }
    }
    loadDecks();
    return () => {
        abortController.abort();
    };
    }, []);


    // deleteHandler;  use async, await to control as sync operation.
    // Utility functions => deleteDeck();
    // window.confirm(message)
    // useHistory()
    // history.go(0) => refresh the page.
    const deleteHandler = async (deckId) => {
    const confirmation = window.confirm(
        "Delete this deck? You will not be able to recover it."
    );
    if (confirmation) {
        await deleteDeck(deckId);
        history.go(0);
    }
    };

    if (deckList) {
    return (
        <div>
            <div>
                <Link to="/decks/new">
                    <button>Create Deck</button>
                </Link>
            </div>
            {deckList.map((deck) => (
                <div key={deck.id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{deck.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            {deck.cards.length} cards
                        </h6>
                    </div>
                    <div>
                        <p className="card-text">{deck.description}</p>
                    </div>
                    <div>
                        <Link to={`/decks/${deck.id}`}>
                            <button
                            onClick={() => history.push(`/decks/${deck.id}`)}
                            className="btn btn-secondary"
                            >
                            View
                            </button>
                        </Link>
                        <Link to={`/decks/${deck.id}/study`}>
                            <button
                            onClick={() => history.push(`/decks/${deck.id}/study`)}
                            className="btn btn-primary"
                            >
                            Study
                            </button>
                        </Link>
                        <button
                            onClick={() => deleteHandler(deck.id)}
                            className="btn btn-danger"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                ))
            }
        </div>
    );
    } else {
    return <p>Loading Deck List...</p>;
    }
}

export default Home;
