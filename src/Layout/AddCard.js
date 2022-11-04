// AddCard("/decks/:deckId/cards/new")
// Allow the user to add a new card to an existing deck.
// Link to <Home />(Navigation), <Deck />(Done)
    
// CardForm
    // what is common between AddCard.js and EditCard.js
        // label & textarea
    
    

import React, {useState, useEffect} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom'

import { readDeck, createCard } from '../utils/api'
import  CardForm from './CardForm'

function AddCard() {

    const { deckId } = useParams();
    const history = useHistory();

    
    const [deck, setDeck] = useState([]);
    const [newCard, setNewCard] = useState([]);


    // AbortController
        // useEffect(() =>)
        // Use readDeck() from 'src/utils/api/index.js
    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(() => response);
            } catch (error) {
                console.log(error);
            }
        }
        loadDeck();
        return () => {
            abortController.abort();
        }
    }, [deckId]);

    const handleChange = ({target}) => {
        setNewCard({...newCard, [target.name]: target.value, })
    };

    // <button>Done</button> : (Left side) taken to the Deck screen.
    const handleDone = (event) => {
        event.preventDefault();
        history.push(`/decks/${deckId}`);
    }
    // <button>Save</button> : (Right side)
        // new card is created, associated with the relevant deck. 
        // The form is cleared, process for adding a card is restarted.
    const handleSave = async(event) => {
        event.preventDefault();
        await createCard(deckId, newCard);
        setNewCard([]);
        history.go(0);
    }


// breadcrumb navigation(Home/React Router/Add Card)
        // link to <Home />
        // the name of the deck to which the cards are being added
        // the text "Add Card"
    const breadcrumb = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to={"/"}>Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">Add Card</li>
            </ol>
        </nav>  
    )

 // [title] React Router: Add Card
    return (
        <div>
            <form onSubmit={handleSave} className="form-group">
                <div>
                    {breadcrumb}
                </div>
                <div>
                    <h1>{deck.name}: Add Card</h1>
                </div>
                <div>
                    <CardForm 
                        newCard={newCard}
                        handleChange={handleChange}
                    />
                </div>
                <div>
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={handleDone}
                    >Done</button>
                    <button 
                        type="submit"   
                        className="btn btn-primary"
                    >Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddCard;