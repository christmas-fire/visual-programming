// src/components/BookCard.js
import React from "react";
import "./BookCard.css";

const BookCard = ({ title, authors, cover }) => {
    return (
        <div className="book-card">
            <div className="book-image-container">
                {cover ? (
                    <img src={cover} alt={title} className="book-image" />
                ) : (
                    <div className="placeholder">No Cover</div>
                )}
            </div>
            <h3 className="book-title">{title}</h3>
            <p className="book-authors">{authors.join(", ")}</p>
        </div>
    );
};

export default BookCard;