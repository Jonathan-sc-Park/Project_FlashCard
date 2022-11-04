// CreateDeck("/decks/new")
// Link to <Home />(Navigation, Cancel) , <Deck />(Submit)
// export to Home.js

import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import { createDeck } from '../utils/api';

function CreateDeck() {
    
    const initialFormState = {
        name: "",
        description: "",
    };

    const [ formData, setFormData ] = useState(initialFormState);
    const history = useHistory();

    // change handler to track the change of input fields.
    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value, })
    };

    // submit handler for create new deck
        // useHistory();
    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await createDeck(formData);
        setFormData(initialFormState);
        history.push(`/decks/${response.id}`)
    }


    // breadcrumb navigation bar(Home / Create Deck)
    // link to Home("/")
    // the text "Create Deck"
    const breadcrumb = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to={"/"}>Home</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">Create Deck</li>
            </ol>
        </nav>  
    )

    // Title of "Create Deck"
    // Name field : <input type="text" name="name" placeholder: "Deck Name">
    // Description field : <input type="text" name="description" placeholder:"Brief description of the desk">
    // <button>Cancel</button> => <Home />, <button>Submit</button> => <Deck />
    return (
        <div>
            <div>
                {breadcrumb}
            </div>
            <div>
                <h1>Create Deck</h1>
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
                            value={formData.name}
                            className='form-control'
                            placeholder='Deck Name'
                            required />
                        <label className="col-form-label" htmlFor="description">Description</label>
                        <textarea 
                            name="description"
                            id="description"
                            type="textarea"
                            onChange={handleChange}
                            value={formData.description}
                            className="form-control text-area"
                            placeholder='Brief  Description of the deck'
                            required />
                    </div>
                    <br />
                    <div>
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={() => history.push("/")}
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

export default CreateDeck;