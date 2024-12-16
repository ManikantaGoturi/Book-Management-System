import './Home.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [books, setBooks] = useState([]); // List of books
    const [searchTerm, setSearchTerm] = useState(''); // User's search query
    const [genres, setGenres] = useState([]); // List of genres for filters
    const [selectedGenre, setSelectedGenre] = useState(''); // Selected genre filter
    const [currentPage, setCurrentPage] = useState(1); // Current pagination page
    const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
    const booksPerPage = 5; // Books displayed per page

    const API_URL = 'http://localhost:5000';

    // Fetch books from API
    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${API_URL}/books`);
            const filteredBooks = filterBooks(response.data);
            paginateBooks(filteredBooks, currentPage);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    // Fetch genres from API
    const fetchGenres = async () => {
        try {
            const response = await axios.get(`${API_URL}/genres`);
            setGenres(response.data);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    // Filter books based on search term and genre
    const filterBooks = (books) => {
        return books.filter((book) => {
            const matchesSearch = book.Title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenre = selectedGenre ? book.GenreID === parseInt(selectedGenre) : true;
            return matchesSearch && matchesGenre;
        });
    };

    // Paginate books
    const paginateBooks = (books, page) => {
        const startIndex = (page - 1) * booksPerPage;
        const paginatedBooks = books.slice(startIndex, startIndex + booksPerPage);
        setBooks(paginatedBooks);
        setTotalPages(Math.ceil(books.length / booksPerPage));
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to page 1 on new search
    };

    // Handle genre filter change
    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
        setCurrentPage(1); // Reset to page 1 on new filter
    };

    // Handle pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchBooks();
    };

    // Fetch data on component load or when filters change
    useEffect(() => {
        fetchBooks();
        fetchGenres();
    }, [searchTerm, selectedGenre, currentPage]);

    return (
        <div className="container">
            {/* Navigation Bar */}
            <nav>
                <ul className="navbar">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/add">Add Book</Link></li>
                </ul>
            </nav>

            {/* Search Section */}
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select value={selectedGenre} onChange={handleGenreChange}>
                    <option value="">All Genres</option>
                    {genres.map((genre) => (
                        <option key={genre.GenreID} value={genre.GenreID}>
                            {genre.Name}
                        </option>
                    ))}
                </select>
                <button onClick={fetchBooks}>Search</button>
            </div>

            {/* Books Grid */}
            <div className="books-grid">
                {books.map((book) => (
                    <div key={book.BookID} className="book-card">
                        <h3>{book.Title}</h3>
                        <p>Author: {book.AuthorName}</p>
                        <p>Genre: {book.GenreName}</p>
                        <Link to={`/book/${book.BookID}`}>View Details</Link>
                        <Link to={`/edit/${book.BookID}`}>Edit</Link>
                        <button
                            onClick={() => {
                                axios.delete(`${API_URL}/books/${book.BookID}`)
                                    .then(() => fetchBooks())
                                    .catch((error) => console.error('Error deleting book:', error));
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={currentPage === i + 1 ? 'active' : ''}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Home;
