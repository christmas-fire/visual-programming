// src/App.js
import React, { useEffect, useState } from 'react';
import BookCard from './components/BookCard';

function App() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Fetch books data
                const booksResponse = await fetch('https://fakeapi.extendsclass.com/books');
                if (!booksResponse.ok) {
                    throw new Error(`HTTP error! status: ${booksResponse.status}`);
                }
                const booksData = await booksResponse.json();

                // Fetch images for each book
                const fetchImages = async (book) => {
                    try {
                        const imageResponse = await fetch(
                            `https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`
                        );
                        if (!imageResponse.ok) {
                            throw new Error(`HTTP error! status: ${imageResponse.status}`);
                        }
                        const imageData = await imageResponse.json();
                        if (imageData.items && imageData.items.length > 0) {
                            const imageUrl = imageData.items[0].volumeInfo.imageLinks?.thumbnail;
                            if (imageUrl) {
                                const imageBlob = await fetch(imageUrl).then(res => res.blob());
                                return { ...book, imageBlob };
                            }
                        }
                        return { ...book, imageBlob: null };
                    } catch (error) {
                        console.error(`Failed to fetch image for book ${book.title}:`, error);
                        return { ...book, imageBlob: null };
                    }
                };

                const booksWithImages = await Promise.all(booksData.map(fetchImages));
                setBooks(booksWithImages);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap' }}>
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    imageBlob={book.imageBlob}
                    title={book.title}
                    authors={book.authors}
                />
            ))}
        </div>
    );
}

export default App;