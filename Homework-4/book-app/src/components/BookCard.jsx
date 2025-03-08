// src/components/BookCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './BookCard.css';

const BookCard = ({ imageBlob, title, authors }) => {
    const imageUrl = URL.createObjectURL(new Blob([imageBlob]));

    return (
        <div className="book-card">
            <img src={imageUrl} alt={title} className="book-image" />
            <h3 className="book-title">{title}</h3>
            <p className="book-authors">{authors.join(', ')}</p>
        </div>
    );
};

BookCard.propTypes = {
    imageBlob: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BookCard;