import classes from './BookCard.module.css';
import { useNavigate } from 'react-router-dom';
export default function BookCard({book, ...props}) {
  const navigate = useNavigate();
  function handleToDetails (){
    navigate(`/books/${book.id}`);
  }
  return (
    <div className={classes['book-card']} onClick={handleToDetails} {...props}>
      <h2 className={classes['book-title']}>{book.title}</h2>
      <p className = {classes['book-subtitle']}>{book.subtitle}</p>
      <p className={classes['book-author']}>{book.authors.join(', ')}</p>
    </div>
  )
}