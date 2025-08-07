import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
export default function BookDetailsPage(){
  const { bookId } = useParams();
  const book = useSelector(state=> state.books.items.find(b => b.id === bookId));
  if (!book) {
    throw new Error({
      title: "Book not found",
      message: `No book found with ID: ${bookId}`,
      status: 404
    });
  }
  return (
    <div>
      <h1 className={styles.title}>{book.title}</h1>
      <h2 className={styles.subtitle}>{book.subtitle}</h2>
      <div className={styles.mainContent}>
        <div className={styles.text}>
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
          <p>
            {book.description}
          </p>
          <a href={book.previewLink} target="_blank" rel="noopener noreferrer">Preview</a>
          <a href={book.infoLink} target="_blank" rel="noopener noreferrer">More Info</a>
        </div>
        <img src={book.imageLinks.thumbnail} alt={book.title} />
      </div>
    </div>
  );
}