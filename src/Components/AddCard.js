import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

export default function AddCard() {
  const [deck, setDeck] = useState({ cards: [] });
  const { deckId } = useParams();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const handleSubmit = (newCard) => {
    createCard(deckId, newCard);
  };

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
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h3>{deck.name}: Add Card</h3>
      <CardForm handleSubmit={handleSubmit} deck={deck} />
    </>
  );
}