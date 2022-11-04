// Study("/decks/:deckId/study")
// Link to <Home />(Navigation, Cancel), <Deck />(OK), <AddCard />(Not enough card)
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import StudyCard from "./StudyCard"

// what does the study do?!
    // receive deckId

function Study() {
    const { deckId } = useParams();

    const [ cards, setCards ] = useState([]);
    const [ deckState, setDeckState ] = useState({});

        // Handle change of currentDeck => set setCurrentCard initial state.
        // readDeck() + useParams() => take deckId from url, store current state of deck to setDeckState
    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeckState(() => response);
                const {cards} = response;
                setCards(cards);
            } catch (error) {
                console.log(error);
            }
        }
        loadDeck();
        return () => {
            abortController.abort();
        }
    }, [deckId]);


    // breadcrumb navigation bar (Home/Rendering In React/Study) => Breadcrumb.js
        // links to Home("/")
        // followed by the name of the deck being studied
        // the text Study
    const breadcrumb = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to={"/"}>Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckState.id}`}>{deckState.name}</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">Study</li>
            </ol>
        </nav>  
    )

    // Deck & Card
        // IF, No current Deck to load(!currentDeck)
            // "Loading Deck..."
        // ELSE, There is more than one Deck to load(currentDeck) => Card.js
            //IF, Not enough cards(2 or less)
                // Deck with two or fewer cards => "Not enough cards" + <button>Add Cards</button>(<AddCard />)
            // ELSE, More than 2 cards
            // console.log("This is deckState: ", deckState)
    if(!deckState) {
        return <p>Loading Deck...</p>
    } else {
        
        // If the Card received array, prop to the component.
        return (
            <div>
                <div>
                    {breadcrumb}
                </div>
                <div>
                    <h1>{deckState.name}: Study</h1>
                </div>
                <div>
                    <StudyCard cards={cards}   />
                </div>
            </div>
        )
    }
}

export default Study;

