import { useSelector } from 'react-redux';
import styles from './HomePage.module.css';
import BookCard from '../../components/BookCard/BookCard';
export default function HomePage(){
  const books = useSelector(state => state.fetchedBooks.books);
  if(!books || books.length === 0) {
    return <div style={{textAlign: 'center', marginTop: '50vh'}}>No books available.</div>;
  }
  return(
    <div>
      <div className = {styles.bookCards}>
        {books && books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}