export default function processBooks(apiResponse){
  if(!apiResponse || !apiResponse.items){
    throw new Error({
      title: "API Response Error",
      message: "Failed to process books from the API response.",
      status: 500,
      data: apiResponse
    })
  }
  return apiResponse.items.map(book => {
    if(!book.volumeInfo || !book.id){
      return null;
    }
    return {
      id: book.id,
      title: book.volumeInfo.title || 'No Title Available',
      subtitle: book.volumeInfo.subtitle || 'No Subtitle Available',
      authors: book.volumeInfo.authors.join(', ') || 'Unknown Author',
      publisher: book.volumeInfo.publisher || 'Unknown Publisher',
      publishedDate: book.volumeInfo.publishedDate || 'Unknown Date',
      description: book.volumeInfo.description || 'No Description Available',
      pageCount: book.volumeInfo.pageCount || 0,
      categories: book.volumeInfo.categories.join(', ') || 'Uncategorized',
      averageRating: book.volumeInfo.averageRating || 'No Rating',
      ratingsCount: book.volumeInfo.ratingsCount || 0,
      contentVersion: book.volumeInfo.contentVersion || 'No Version Available',
      language: book.volumeInfo.language || 'Unknown Language',
      previewLink: book.volumeInfo.previewLink || 'No Preview Available',
      infoLink: book.volumeInfo.infoLink || 'No Info Available',
      imageLinks: book.volumeInfo.imageLinks || {
        thumbnail: 'https://via.placeholder.com/128x194?text=No+Image+Available'
      }
    }
  }).filter(book => book !== null);
}