// Decks("/decks/:deckId")
// Shows all of the information about a specific deck with options to edit or add cards to the deck, navigate to the study screen, or delete the deck.
// Link to <Home />(Navigation), <EditDeck />(Submit, Cancel), <AddCard />(Button), <Study />(Button)
// Use function readDeck() from 'src/utils/api/index.js'
    

    // breadcrumb navigation (Home/React Router)
        // link to <Home />
        // the name of the deck
    // Deck Name, Description, <button>
        // Edit(<EditDeck />)
        // Study(<Study />)
        // Add Cards(<AddCard />)
        

import { readDeck, deleteDeck } from '../utils/api'
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom'

import DeckCard from "./DeckCard";


function Deck() {
    const history = useHistory();
    const { deckId } = useParams();
    const [ currentDeck, setCurrentDeck ] = useState([])
    const [ cards, setCards ] = useState([])
    const { url } = useRouteMatch();


    // AbortController
    // useEffect(() =>)
    // Handle change of currentDeck => set setCurrentCard initial state.
    // readDeck() + useParams() => take deckId from url, store current state of deck to setDeckState
    useEffect(() => {
        const abortController = new AbortController();
        async function loadCurrentDeck() {
            try {
                const response = await readDeck(deckId, abortController.signal);
                setCurrentDeck(() => response);
                const { cards } = response;
                setCards(cards);
            } catch (error) {
                console.log(error);
            }
        }
        loadCurrentDeck();
        return () => {
            abortController.abort();
        }
    }, [deckId]);

    // breadcrumb navigation bar(Home / Create Deck)
        // link to Home("/")
        // the text "Create Deck"
    const breadcrumb = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to={"/"}>Home</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">{currentDeck.name}</li>
            </ol>
        </nav>  
    )

        // Delete : Show a warning message before deleting deck.
            // deleteHandler
            // Delete Deck Prompt
                // window.confirm()
                    // "Delete this deck?", "You will not be able to recover it."
                    // <button>OK</button> : Delete the deck, no current deck so return to Home(deck list)
                    // <button>Cancel</button> 
            
        const deleteDeckHandler = async() => { 
            const confirmation = window.confirm("Delete this deck? You will not be able to recover it.");  
            if(confirmation) {
                await deleteDeck(currentDeck.id);
                history.push("/");
            }
        }
        
        return (
            <div>
                <div>
                    {breadcrumb}
                </div>
                <div>
                    <h5>{currentDeck.name}</h5>
                    <p>{currentDeck.description}</p>
                </div>
                <div>
                    <Link to={`/decks/${deckId}/edit`} >
                        <button
                            type="button"
                            className='btn btn-secondary'
                            onClick={() => history.push(`${url}/edit`)}
                        >Edit</button>
                    </Link>
                    <Link to={`/decks/${deckId}/study`} >
                        <button
                            type="button"
                            className='btn btn-primary'
                            onClick={() => history.push(`${url}/study`)}
                        >Study</button>
                    </Link>
                    <Link to={`/decks/${deckId}/cards/new`} >
                        <button
                            type="button"
                            className='btn btn-primary'
                            onClick={() => history.push(`${url}/cards/new`)}
                        >Add Cards</button>
                    </Link>
                    <button 
                        type='button'
                        className='btn btn-danger'
                        onClick={() => deleteDeckHandler(deckId)}
                    >Delete Deck</button>
                </div>
                <div>
                    <DeckCard cards={cards} />
                </div>
            </div>
        )
        




}

export default Deck;