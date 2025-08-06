
export default function HomePage(){

  return(
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data && data.items.map(book => (
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