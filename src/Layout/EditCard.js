// EditCard("/decks/:deckId/cards/:cardId/edit")
// Allow the user to modify information on an existing card.
// Same form as the <AddCard />, => CardForm.js
// Link to  <Deck />(Save, Cancel)
    
    // breadcrumb navigation (Home/Deck React Router/Edit Card 4)
        // link to <Home />
        // the name o the deck of which the edited card is a member
        // the text "Edit Card: cardId"
        
import React, {useState, useEffect} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom'

import { readDeck, readCard, updateCard } from '../utils/api'
import  CardForm from './CardForm'

function EditCard() {
    
    const { deckId, cardId } = useParams();
    const history = useHistory();
    
    
    const [deck, setDeck] = useState([]);
    const [editCard, setEditCard] = useState([]);
    
    // AbortController
    // useEffect(() =>)
        // Use the readDeck() from 'src/utils/api/index.js'
        // Use the readCard() from 'src/utils/api/index.js'
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

    useEffect(() => {
        const abortController = new AbortController();
        async function loadCard() {
            try {
                const response = await readCard(cardId, abortController.signal);
                setEditCard(() => response);
            } catch (error) {
                console.log(error);
            }
        }
        loadCard();
        return () => {
            abortController.abort();
        }
    }, [cardId]);

    const handleChange = ({target}) => {
        setEditCard({...editCard, [target.name]: target.value, })
    };

    // <button>Cancel</button> : (Left side) taken to the <Deck />
    const handleCancel = (event) => {
        event.preventDefault();
        history.push(`/decks/${deckId}`);
    }
    // <button>Submit</button> : (Right side) taken to the <Deck />
        // new card is created, associated with the relevant deck. 
        // The form is cleared, process for adding a card is restarted.
    const handleSubmit = async(event) => {
        event.preventDefault();
        await updateCard(editCard);
        setEditCard([]);
        history.push(`/decks/${deckId}`)
    }
    
    const breadcrumb = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to={"/"}>Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">Edit Card {cardId}</li>
            </ol>
        </nav>  
    )

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-group">
                <div>
                    {breadcrumb}
                </div>
                <div>
                    <h1>Edit Card</h1>
                </div>
                <div>
                    <CardForm 
                        newCard={editCard}
                        handleChange={handleChange}
                    />
                </div>
                <div>
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={handleCancel}
                    >Cancel</button>
                    <button 
                        type="submit"   
                        className="btn btn-primary"
                    >Submit</button>
                </div>
            </form>
        </div>
    )

}

export default EditCard;