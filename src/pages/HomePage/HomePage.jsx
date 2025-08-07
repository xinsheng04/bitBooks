import { useSelector } from 'react-redux';
export default function HomePage(){
  const books = useSelector(state => state.books.items);
  if(!books || books.length === 0){
    throw new Error({
      title: "Book retrieval error",
      message: 'Error: No books retrieved from the API.',
      status: 404
    });
  }
  return(
    <div>
      {books && books.items.map(book => (
        <div key={book.id}>
          <h2>{book.volumeInfo.title}</h2>
          <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
          <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
          <p>{book.volumeInfo.description}</p>
        </div>
      ))}
    </div>
  )
}