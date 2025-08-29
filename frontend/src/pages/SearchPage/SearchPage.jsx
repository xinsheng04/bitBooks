import { useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import { useState, useEffect } from "react";
import BookCard from "../../components/BookCard/BookCard.jsx";
import styles from "./SearchPage.module.css";
import { searchBook } from "../../util/booksBackend.js";
export default function SearchPage() {
  const books = useSelector(state => state.fetchedBooks.books);
  const [results, setResults] = useState(books);

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
    try{
      const {book, error} = await searchBook(title);
      console.log(book);
      if (error) {
        throw new Error(error);
      }
      setResults(book);
    } catch(e){
      console.log(e.message);
    }
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