import classes from './BookCard.module.css';
import { useNavigate } from 'react-router-dom';
import ellipsisfy from '../../util/ellipsisfy';

export default function BookCard({book, ...props}) {
  const navigate = useNavigate();

  function handleToDetails (){
    navigate(`/books/${book.id}`);
  }

  function enhanceImageUrl(url) {
    if (!url) return null;
    const zoom1Pattern = /zoom=1/;
    if(zoom1Pattern.test(url)){
      return url.replace('zoom=1', 'zoom=2');
    }
    return url;
  }

  let imageUrl = book.imageLinks?.thumbnail || 'https://via.placeholder.com/128x194?text=No+Image+Available';
  let highResImageUrl = enhanceImageUrl(imageUrl);
  return (
    <div className={classes['bookCard']} onClick={handleToDetails} {...props}>
      <img 
        src={imageUrl}
        // srcSet={highResImageUrl ? `${highResImageUrl} 2x` : null}
      />
      <h2 className={classes['book-title']}>{book.title ? ellipsisfy(book.title, 60) : 'No Title Available'}</h2>
      {book.subtitle && <p className = {classes['book-subtitle']}>{ellipsisfy(book.subtitle, 60)}</p>}
      {book.authors && <p className={classes['book-author']}>{ellipsisfy(book.authors, 30)}</p>}
    </div>
  )
}