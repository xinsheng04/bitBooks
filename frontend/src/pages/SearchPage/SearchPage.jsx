import { useSelector, useDispatch } from "react-redux";
import { fetchedBooksActions } from "../../store/fetchedBooks";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import { useState, useEffect } from "react";
import BookCard from "../../components/BookCard/BookCard.jsx";
import styles from "./SearchPage.module.css";
import { searchBook } from "../../util/booksBackend.js";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const books = useSelector(state => state.fetchedBooks.books);
  const dispatch = useDispatch();
  const [results, setResults] = useState(books);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSearchTerm = sessionStorage.getItem('search-item') || '';
    if(loadSearchTerm){
      const foundBooks = books.filter(book => book.title.toLowerCase().includes(loadSearchTerm.toLowerCase()));
      setResults(foundBooks.length > 0 ? foundBooks : []);
    }
  }, []);

  async function handleSearch(title) {
    sessionStorage.setItem('search-item', title);
    const foundBooks = books.filter(book =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );

    if (foundBooks && foundBooks.length > 0) {
      setResults(foundBooks);
      return;
    } 
    const {book: searchResults, error} = await searchBook(title);
    if (error) {
      navigate("/error", { title: "Search error", message: error });
      return;
    }
    dispatch(fetchedBooksActions.loadBooks({ books: searchResults, firstLoad: false }));
    setResults(searchResults);
  }

  function handleClear() {
    setResults([...books]);
    sessionStorage.removeItem('search-item');
  }

  return (
    <div className={styles.searchPage}>
      <SearchBar onSearch={handleSearch} onClear={handleClear} />
      <div className={styles.bookCards}>
        {Array.isArray(results) && results.length > 0 &&
          results.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        {
          !Array.isArray(results) && <p>Something went wrong.</p>
        }
      </div>
    </div>
  );
}

