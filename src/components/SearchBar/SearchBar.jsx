import styles from './SearchBar.module.css';
import { useState } from 'react';
export default function SearchBar({onSearch}){
  const [searchTerm, setSearchTerm] = useState('');
  // console.log(searchTerm);
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className={styles.searchbarContainer}>
      <input
        type="text" 
        placeholder="Search..." 
        className={styles.input} 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className={styles.button} onClick={handleSubmit}>
        &#128269;
      </button>
    </div>
  )
}