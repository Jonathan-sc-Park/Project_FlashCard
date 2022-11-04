// ELSE, More than 2 cards
    // The deck title.
    // Card index of total
    // Cards are shown one at a time. - front side first.
    // <button>Flip</button>
        // flip it to the other side.(Front->Back)
    // <button>Next</button> :Right Card(+index).
    // After the final card in the deck has been shown(+ Flip + Next)=> Restart
        // window.confirm() to create the modal dialog.
            // "Restart the cards?" "Click 'cancel' to return to the home page."

// Event handlers
    // Card index => cardIndex
    // <button>; Card Flip => cardSide
    // <button>; Card Next
        // Card Restart(OK: restart, Cancel: Home)


import React, { useState } from "react"
import { useParams, useHistory, Link  } from "react-router-dom"

// what is Card doing?
    // flipping the card
        // front(default)- question, back- answer. => <button> next
    // counting the card
        // current +1 of total
    // This is 1 card.
        //  receive card id, 
function StudyCard({cards}) {
    const { deckId } = useParams();
    const history = useHistory();

    // const initialState = {
    //     cardSide: true,
    //     cardIndex: 1,
    // }
    // const [ cardState, setCardState ] = useState();
    
    const [ cardSide, setCardSide] = useState(false);
    const [ cardIndex, setCardIndex] = useState(1);
    

    // Card Event should be called when the number of card is more than 2
        // Front side(true) of the card is First.


    // Change handler for Flip Card
    const flipHandler= () => {
        setCardSide(() => !cardSide);
    }


    // Change handler for Next Card
        // The Next button appears after the card is flipped.
            // Even I flip the card again, the Next button still appear. 
        // When the Next button clicked, cardIndex should be count(+1)
        // when window.confirm ask for Restart 
            // OK => initialize the state of card. restart the deck
            // Cancel => return to home
    const nextHandler= (event) => {
        event.preventDefault();
        setCardSide(false);
        setCardIndex((current) => current + 1);

        if(cardIndex >= cards.length) {
            const confirmation = window.confirm("Restart card? Click 'cancel' to return to the home page.");
            if(confirmation) {
                setCardIndex(1);
                setCardSide(null);
                history.push(`/decks/${deckId}/study`);
            } else {
                history.push("/");
            }
        }
    }
    const addHandler = (event) => {
        event.preventDefault();
        history.push(`/decks/${deckId}/cards/new`)
    }
    
    if(cards.length < 3) {
        return(
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Not enough cards.</h2>
                    <p className="card-text">
                        You need at least 3 cards to study. 
                        There are {cards.length} in this deck.
                    </p>
                </div>
                <div>
                    <button
                        onClick={addHandler}
                        className="btn btn-primary"
                    >
                        Add Cards
                    </button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="card">
                <div className="card-body">
                    <div>
                        <h5 className="card-title">
                            Card {cardIndex} of {cards.length}
                        </h5>
                        <p className="card-text">
                            { !cardSide ? cards[cardIndex-1].front : cards[cardIndex-1].back }
                        </p>    
                    </div>
                    <div>
                        <button onClick={flipHandler} className="btn btn-secondary">
                            Flip
                        </button>
                        { !cardSide ? null : ( 
                            <button onClick={nextHandler} className="btn btn-primary">
                                Next
                            </button>
                            )}
                    </div>
                </div>
            </div>
        )
    }
}

export default StudyCard;