// CardForm
    // what is common between AddCard.js and EditCard.js
        // label & textarea


import React from 'react';

function CardForm({newCard, handleChange}) {
    return (
        <div className="form-group">
            <div>
                <label htmlFor="front">
                    Front
                </label>
                <textarea
                    name='front'
                    id='front'
                    placeholder='Front side of card'
                    onChange={handleChange}
                    value={newCard.front}
                    className='form-control'
                    required />
                    
            </div>
            <div>
                <label htmlFor="back">
                    Back
                </label>
                <textarea
                    name='back'
                    id='back'
                    placeholder='Back side of card'
                    onChange={handleChange}
                    value={newCard.back}
                    className='form-control'
                    required />
            </div>
        </div>
    )
}

export default CardForm;