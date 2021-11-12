import React, { useState, useEffect } from "react";
import CardForm from "./CardForm";
import { useParams, Link, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";

export default function EditCard() {
  const [deck, setDeck] = useState({ cards: [] });
  const [card, setCard] = useState({});
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
    readCard(cardId).then(setCard);
  }, [deckId, cardId]);

  function handleSubmit(card) {
    updateCard(card).then(history.push(`/decks/${deckId}`));
  }


  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home"></span> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {card.id}
          </li>
        </ol>
      </nav>

      <h2>Edit Card</h2>

      {card.id && (
        <CardForm card={card} setCard={setCard} handleSubmit={handleSubmit} />
      )}
    </>
  );
}