import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function FormCard({ handleSubmit, card = {} }) {
  const initialNewCard = {
    front: "",
    back: "",
  };
  const [newCard, setNewCard] = useState({ ...initialNewCard });
  const [oldCard, setOldCard] = useState({ ...card });
  const { deckId } = useParams();

  function handleChange(event) {
    if (!card.id) {
      setNewCard({ ...newCard, [event.target.id]: event.target.value });
    } else {
      setOldCard({ ...oldCard, [event.target.id]: event.target.value });
    }
  }
  function onSubmit(event) {
    console.log(card);
    event.preventDefault();
    if (!card.id) {
      handleSubmit(newCard);
    } else {
      handleSubmit(oldCard);
    }

    setNewCard({ ...initialNewCard });
  }

  return (
    <>
      {!card.id && (
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="front">Front</label>
            <textarea
              type="text"
              className="form-control"
              id="front"
              placeholder="Front Side of Card"
              value={newCard.front}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="back">Back</label>
            <textarea
              type="text"
              className="form-control"
              id="back"
              placeholder="Back Side of Card"
              value={newCard.back}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Link to={`/decks/${deckId}`}>
              <button className="btn btn-secondary mt-2">Cancel</button>
            </Link>
            <button type="submit" className="btn btn-primary ml-2 mt-2">
              Save
            </button>
          </div>
        </form>
      )}
      {card.id && (
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="front">Front</label>
            <textarea
              className="form-control"
              id="front"
              placeholder="Front Side of Card"
              value={oldCard.front}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="back">Back</label>
            <textarea
              className="form-control"
              id="back"
              placeholder="Back Side of Card"
              value={oldCard.back}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Link to={`/decks/${deckId}`}>
              <button className="btn btn-secondary mt-2">Cancel</button>
            </Link>
            <button
              type="submit"
              className="btn btn-primary ml-2 mt-2"
              style={{ marginLeft: ".5rem" }}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
}