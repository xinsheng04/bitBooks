import styles from './SearchBar.module.css';
import { useState, useEffect } from 'react';
export default function SearchBar({onSearch, onClear}){
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  }
  // console.log(searchTerm);
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  useEffect(() => {
    if (searchTerm === '') {
      onClear();
    }
  }, [searchTerm]);

  return (
    <div className={styles.searchbarContainer}>
      <input
        type="text" 
        placeholder="Search..." 
        className={styles.input} 
        value={searchTerm} 
        onChange={(e) => handleSearchTerm(e.target.value)}
      />
      <button className={styles.button} onClick={handleSubmit}>
        &#128269;
      </button>
    </div>
  )
}