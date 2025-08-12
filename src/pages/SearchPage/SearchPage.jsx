import { useSelector } from "react-redux";
import BooksLoader from "../../BooksLoader";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import { useState } from "react";
import BookCard from "../../components/BookCard/BookCard.jsx";
import styles from "./SearchPage.module.css";
import useImportBooks from "../../util/useImportBooks.js";
export default function SearchPage(){
  const [loadResults, setLoadResults] = useState({searchResults: [], loading: false, error: null});
  function handleSearch(title){
    const foundBooks = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
    if(!foundBooks || foundBooks.length === 0) {
      const {data, loading, error} = useImportBooks({bookTitle: title});
      setLoadResults({searchResults: data || [], loading, error});
    }
    setLoadResults(prevState => ({...prevState, searchResults: foundBooks}));
  }
  const firstLoadDone = useSelector(state=> state.fetchedBooks.firstLoad);
  const books = useSelector(state => state.fetchedBooks.books);
  if (!firstLoadDone || !books) {
    return <BooksLoader loadQty={30} />;
  }
  return (
    <div className={styles.searchPage}>
      <SearchBar onSearch={handleSearch}/>
      <div className={styles.bookCards}>
        {loadResults.loading && <p>Loading...</p>}
        {loadResults.error && <p>{loadResults.error}</p>}
        {loadResults.searchResults.length>0 && loadResults.searchResults.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
        {loadResults.searchResults.length<=0 && books && books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}