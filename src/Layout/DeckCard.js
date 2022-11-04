// What DeckCard do?
    // show the list of the cards of the current deck(Deck.js).
    // (left)Front, (right)Back in one card.
    // need to show Edit, Delete.
        // when delete, need to show window.confirm(). => deleteCardHandler
        // when Edit, go to EditCard( "decks/:deckId/cards/:cardId/edit" )
            // common url /decks/:deckId/ => useRouteMatch();

import React from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';

import { deleteCard } from '../utils/api'

function DeckCard({cards}) {
    const history = useHistory();
    // using useRouteMatch to simplify the specific url of card.
    const { url } = useRouteMatch();

    // Delete Card Prompt
    // window.confirm()
        // "Delete this card?", "You will not be able to recover it."
        // <button>OK</button> : Delete the card.
        // <button>Cancel</button>
    const deleteCardHandler = async(cardId) => { 
        const confirmation = window.confirm("Delete this card? You will not be able to recover it.");            
        if(confirmation) {
            await deleteCard(cardId);
            history.go(0);
        }
    }

    return (
        <div>
            <div>
                <h3>Cards</h3>
            </div>
            <div>
                {cards.map((card, index) => (
                    <div key={index} className="card">
                        <div className="card-body">
                            <div className="row d-flex justify-content-between">
                                <div className="col">
                                    {card.front}
                                </div>
                                <div className="col">
                                    {card.back}
                                    <div>
                                        <Link to={`${url}/cards/${card.id}/edit`}>
                                            <button className="btn btn-secondary">
                                                Edit
                                            </button>
                                        </Link>
                                        <button 
                                            className="btn btn-danger" 
                                            onClick={() => deleteCardHandler(card.id)}
                                        >Delete Card</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    </div>
    )
}

export default DeckCard;