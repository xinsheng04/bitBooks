import styles from './SearchBar.module.css';
import { useState } from 'react';
export default function SearchBar({handleSearch}){
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className={styles.searchbarContainer}>
      <input
        type="text" 
        placeholder="Search..." 
        className={styles.input} 
        value={searchTerm} 
        onChange={handleInputChange}
      />
      <button className={styles.button} onClick={handleSubmit}>
        &#128269;
      </button>
    </div>
  )
}