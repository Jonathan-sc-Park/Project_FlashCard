<h1> Project: Flashcard-o-matic </h1>
<br>
<p>The purpose of this application is to assemble the functionality that allows users to add, edit, and delete the decks of flashcards that could help to study and manage the subjects.
</p>

<h2>Flashcard Screen(./src/Layout/)</h2>
<h4>Screen(Path)<br>Description</h4>
<ul>
        <li>Home(/).<br>Shows a list of decks with options to create, study, view, or delete a deck.</li>
        <li>Study(/decks/:deckId/study). <br>Allows the user to study the cards from a specified deck.</li>
        <li>Study Card(). <br>Card form of Study screen.</li>
        <li>Create Deck(/decks/new). <br>Allows the user to create a new deck.</li>
        <li>Deck(/decks/:deckId). <br>Shows all of the information about a specified deck with options to edit or add cards to the deck, navigate to the study screen, or delete the deck.
</li>
        <li>Edit Deck(/decks/:deckId/edit). <br>Allows the user to modify information on an existing deck.</li>
        <li>Add Card(/decks/:deckId/cards/new). <br>Allows the user to add a new card to an existing deck.
</li>
        <li>Edit Card/decks/:deckId/cards/:cardId/edit). <br>Allows the user to modify information on an existing card.
</li>
        <li>Card Form(). <br>Card form of Add & Edit Card.</li>
        <li>Not Found(). <br>Nothing found.</li>
</ul>
