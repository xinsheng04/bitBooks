import { useSelector } from "react-redux";
import BooksLoader from "../../BooksLoader";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import { useState, useEffect } from "react";
import BookCard from "../../components/BookCard/BookCard.jsx";
import styles from "./SearchPage.module.css";
import useImportBooks from "../../util/useImportBooks.js";
export default function SearchPage(){
  const firstLoadDone = useSelector(state=> state.fetchedBooks.firstLoad);
  const books = useSelector(state => state.fetchedBooks.books);
  if (!firstLoadDone || !books) {
    return <BooksLoader loadQty={30} />;
  }
  const [results, setResults] = useState(books);
  const [APISearchTerm, setAPISearchTerm] = useState('');
  const {data, loading, error} = useImportBooks({bookTitle: APISearchTerm, loadQty: 30, runMe: APISearchTerm !== ''});

  useEffect(() => {
    if (data && !loading && !error) {
      setResults(prev => data!==null ? data : prev);
      setAPISearchTerm(''); // clear search term after fetching
    }
  }, [data, loading, error]);

  function handleSearch(title){
    const foundBooks = books.filter(book =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );

    if (foundBooks && foundBooks.length > 0) {
      setResults(foundBooks);
      setAPISearchTerm(''); // clear API fetch
    } else {
      setResults([]);
      setAPISearchTerm(title);
    }
  }

  return (
    <div className={styles.searchPage}>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.bookCards}>
        {loading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {results.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
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