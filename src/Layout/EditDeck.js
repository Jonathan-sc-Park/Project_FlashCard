// EditDeck("/decks/:deckId/edit")
// Allows the user to modify information on an existing deck.
// Link to <Home />(Navigation), <Deck />(Submit, Cancel)
    // Use the function readDeck() from 'src/utils/api/index.js'
    // breadcrumb navigation(Home/Rendering in React/Edit Deck)
        // link to <Home />
        // name of the deck being edited
        // the text Edit Deck
    // Same form as the <CreateDeck />, except it is prefilled with information for the existing deck.
    // Can edit and update the form.
    // <button>Cancel</button> : taken to <Decks />

import React, { useState, useEffect} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api';

function EditDeck() {

    const history = useHistory();
    const { deckId } = useParams();

    const initialState = {
        name: "",
        description: ""
    }
    const [editDeck, setEditDeck] = useState(initialState);

    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
            try {
                const response = await readDeck(deckId, abortController.signal);
                setEditDeck(() => response);
            } catch (error) {
                console.log(error);
            }
        }
        loadDeck();
        return () => {
            abortController.abort();
        }
    }, [deckId])

    const handleChange = ({target}) => {
        setEditDeck({...editDeck, [target.name]: target.value, })
    };

    // submit handler for create new deck
        // useHistory();
    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await updateDeck(editDeck);
        history.push(`/decks/${response.id}`)
    }

    const handleCancel = async(event) => {
        event.preventDefault();
        history.push(`/decks/${editDeck.id}`)
    }

    // breadcrumb navigation bar(Home / currentEditDeck / "Edit Deck")
    // link to Home("/")
    // the text "Create Deck"
    const breadcrumb = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to={"/"}>Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${editDeck.id}`}>{editDeck.name}</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">Edit Deck</li>
            </ol>
        </nav>  
    )

    return (
        <div>
            <div>
                {breadcrumb}
            </div>
            <div>
                <h1>EditDeck</h1>
            </div>
            <div>
            <form onSubmit={handleSubmit} className="form-group">
                    <div>
                        <label className="col-form-label" htmlFor="name">
                            Name
                        </label>
                        <input 
                            name='name'
                            id='name'
                            type='text'
                            onChange={handleChange}
                            value={editDeck.name}
                            className='form-control'
                            placeholder={editDeck.name}
                            required />
                        <label className="col-form-label" htmlFor="description">Description</label>
                        <textarea 
                            name="description"
                            id="description"
                            type="textarea"
                            onChange={handleChange}
                            value={editDeck.description}
                            className="form-control text-area"
                            placeholder={editDeck.description}
                            required />
                    </div>
                    <br />
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
        </div>


    )
    

}

export default EditDeck;