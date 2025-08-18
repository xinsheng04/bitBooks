import { useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import { useState, useEffect } from "react";
import BookCard from "../../components/BookCard/BookCard.jsx";
import styles from "./SearchPage.module.css";
import useImportBooks from "../../util/useImportBooks.js";
export default function SearchPage() {
  const books = useSelector(state => state.fetchedBooks.books);
  const [results, setResults] = useState(books);
  const [APISearchTerm, setAPISearchTerm] = useState('');
  const { data, loading, error } = useImportBooks({ bookTitle: APISearchTerm, loadQty: 30, runMe: APISearchTerm !== '' });

  useEffect(() => {
    const loadSearchTerm = sessionStorage.getItem('search-item') || '';
    if(loadSearchTerm){
      const foundBooks = books.filter(book => book.title.toLowerCase().includes(loadSearchTerm.toLowerCase()));
      setResults(foundBooks.length > 0 ? foundBooks : []);
    }
  }, []);

  useEffect(() => {
    if (APISearchTerm && data && !loading && !error) {
      setResults(data);
    }
  }, [APISearchTerm, data, loading, error]);


  function handleSearch(title) {
    sessionStorage.setItem('search-item', title);
    const foundBooks = books.filter(book =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );

    if (foundBooks && foundBooks.length > 0) {
      setResults(foundBooks);
    } else {
      setResults([]);
      setAPISearchTerm(title);
    }
  }

  function handleClear() {
    setResults([...books]);
    setAPISearchTerm('');
    sessionStorage.removeItem('search-item');
  }

  return (
    <div className={styles.searchPage}>
      <SearchBar onSearch={handleSearch} onClear={handleClear} />
      <div className={styles.bookCards}>
        {loading && results.length === 0 && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {Array.isArray(results) && results.length > 0 &&
          results.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        {
          !Array.isArray(results) && results.items.map(book => (<BookCard key={book.id} book={book.volumeInfo} />))
        }
      </div>
    </div>
  );
}

/*
  const [searchTitle, setSearchTitle] = useState('');
  const [manualResults, setManualResults] = useState(null);

  // Always call hook at top level
  const { data, loading, error } = useImportBooks({
    bookTitle: searchTitle || null,
    isFirstLoad: false
  });

  useEffect(() => {
    if (searchTitle && data && !loading && !error) {
      setManualResults(data);
    }
  }, [searchTitle, data, loading, error]);

  function handleSearch(title){
    const foundBooks = books.filter(book =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );

    if (foundBooks.length > 0) {
      setManualResults(foundBooks);
      setSearchTitle(''); // clear API fetch
    } else {
      setManualResults(null); // let API results show
      setSearchTitle(title);  // trigger fetch
    }
  }


  console.log('Manual results: ', manualResults);

  const results = manualResults || books;
*/