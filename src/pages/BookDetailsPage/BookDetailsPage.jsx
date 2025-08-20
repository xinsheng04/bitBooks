import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { userActions } from '../../store/user';
import styles from './BookDetailsPage.module.css';
import useImportBooks from '../../util/useImportBooks';
import { addSavedBook, removeSavedBook } from '../../util/usersManagement';
/*
  id,
  title,
  subtitle,
  authors,
  publisher,
  publishedDate,
  description,
  pageCount, 
  categories,
  averageRating,
  ratingsCount,
  contentVersion,
  language,
  previewLink,
  infoLink,
*/

export default function BookDetailsPage(){
  const { bookId } = useParams();
  const dispatch  = useDispatch();
  const user = useSelector(state => state.user);
  const book = useSelector(state=> state.fetchedBooks.books.find(b => b.id === bookId));
  const [isSaved, setIsSaved] = useState(user.savedBooks.some(savedBook => savedBook.id === book.id));
  if (!book) {
    const {error, loading} = useImportBooks({bookId});
    if (loading) {
      return <div style={{textAlign: 'center', marginTop: '50vh'}}>Loading...</div>;
    }
    if (error) {
      throw {
        title: "Book not found",
        message: `No book found with ID: ${bookId}`,
        status: 404
      };
    }
  }
  function saveBookHandler(){
    addSavedBook(user.username, book);
    dispatch(userActions.addSavedBook(book));
    setIsSaved(true);
  }

  function removeBookHandler(){
    removeSavedBook(user.username, book.id);
    dispatch(userActions.removeSavedBook(book.id));
    setIsSaved(false);
  }
  return (
    <div>
      <h1 className={styles.title}>{book.title}</h1>
      <h2 className={styles.subtitle}>{book.subtitle}</h2>
      <div className={styles.mainContent}>
        <div className={styles.text}>
          {!isSaved ? 
          <button onClick={()=>saveBookHandler()}>Save this book</button> 
          :
          <button onClick={()=>removeBookHandler()}>Unsave this book</button>
          }
          <table>
            <tbody>
              <tr><td><strong>Authors: </strong></td><td>{book.authors}</td></tr>
              <tr><td><strong>Publisher: </strong></td><td>{book.publisher}</td></tr>
              <tr><td><strong>Published Date: </strong></td><td>{book.publishedDate}</td></tr>
              <tr><td><strong>Page Count: </strong></td><td>{book.pageCount}</td></tr>
              <tr><td><strong>Categories: </strong></td><td>{book.categories}</td></tr>
              <tr><td><strong>Average Rating: </strong></td><td>{book.averageRating}</td></tr>
              <tr><td><strong>Ratings Count: </strong></td><td>{book.ratingsCount}</td></tr>
            </tbody>
          </table>
          <strong>Description</strong>
          <p className={styles.description}>
            {book.description ? book.description : 'No description available.'}
          </p>
          <a href={book.previewLink} target="_blank" rel="noopener noreferrer">Preview</a>
          <a href={book.infoLink} target="_blank" rel="noopener noreferrer">More Info</a>
        </div>
        <img src={book.imageLinks.thumbnail} alt={book.title} />
      </div>
    </div>
  );
}