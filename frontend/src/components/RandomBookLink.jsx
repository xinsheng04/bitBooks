import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function RandomBookLink(className) {
  const books = useSelector((state) => state.fetchedBooks.books);
  if (books.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * books.length);
  return <Link to={`/books/${books[randomIndex].id}`} className={className}>
    🎲 Find me a book
  </Link>
}