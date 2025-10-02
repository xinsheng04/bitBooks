import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { userActions } from '../../store/user';

import { addSavedBook, deleteSavedBook } from '../../util/usersBackend';
import styles from './BookDetailsPage.module.css';
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

export default function BookDetailsPage() {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const book = useSelector(state => state.fetchedBooks.books.find(b => b.id === bookId));
  const [isSaved, setIsSaved] = useState(user.savedBooks.some(savedBook => savedBook.id === book.id));
  function saveBookHandler() {
    addSavedBook(user.username, book.id);
    dispatch(userActions.addSavedBook(book));
    setIsSaved(true);
  }

  function removeBookHandler() {
    deleteSavedBook(user.username, book.id);
    dispatch(userActions.removeSavedBook(book.id));
    setIsSaved(false);
  }

  function openPreview(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  return (
    <div className={styles.main}>
      <div className={styles.bookHeader}>
        <h1 className={styles.bookTitle}>{book.title}</h1>
        <h2 className={styles.bookSubtitle}>{book.subtitle || 'No subtitle available'}</h2>
      </div>
      <div className={styles.bookContent}>
        <div className={styles.leftBox}>
          <div className={styles.infoTable}>
            <strong className={styles.sectionTitle}>General Information</strong>
            <table>
              <tbody>
                <tr><td><strong>Authors </strong></td><td className={styles.bookData}>{book.authors || "N/A"}</td></tr>
                <tr><td><strong>Publisher </strong></td><td className={styles.bookData}>{book.publisher || "N/A"}</td></tr>
                <tr><td><strong>Published Date </strong></td><td className={styles.bookData}>{book.publishedDate || "N/A"}</td></tr>
                <tr><td><strong>Page Count </strong></td><td className={styles.bookData}>{book.pageCount || "N/A"}</td></tr>
                <tr><td><strong>Categories </strong></td><td className={styles.bookData}>{book.categories || "N/A"}</td></tr>
                <tr><td><strong>Average Rating </strong></td><td className={styles.bookData}>{book.averageRating || "N/A"}</td></tr>
                <tr><td><strong>Ratings Count </strong></td><td className={styles.bookData}>{book.ratingsCount || "N/A"}</td></tr>
              </tbody>
            </table>
          </div>
          <div className={styles.bookDescription}>
            <strong className={styles.sectionTitle}>Description</strong>
            <p className={styles.description}>
              {book.description ? book.description : 'No description available.'}
            </p>
          </div>
          <div className={styles.actionMenu}>
            <button onClick={() => openPreview(book.previewLink)}>
              Preview
            </button>
            <button onClick={() => openPreview(book.infoLink)}>
              More Info
            </button>
            <button className={styles.saveBookButton} style={isSaved ? 
              { backgroundColor: 'red', color: 'white' } : 
              { backgroundColor: 'green', color: 'white' }
            } onClick={isSaved ? removeBookHandler : saveBookHandler}>
              {isSaved ? 'Unsave this book' : 'Save this book'}
            </button>
          </div>
        </div>
        <div className={styles.rightBox}>
          <img src={book.imageLinks.thumbnail} alt={book.title} />
        </div>
      </div>
    </div>
  );
}