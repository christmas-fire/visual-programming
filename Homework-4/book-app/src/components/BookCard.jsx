import React from "react";
import "./BookCard.css"

const BookCard = ({ title, authors, cover }) => {
  return (
    <div className="book-card">
      <img src={cover} alt={title} className="book-cover" />
      <h3 className="book-title">{title}</h3>
      <p className="book-authors">{authors.join(", ")}</p>
    </div>
  );
};

export default BookCard;