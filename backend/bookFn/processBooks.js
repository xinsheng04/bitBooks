function processBooks(apiResponse){
  if (!apiResponse || !apiResponse.items) {
    console.warn("[processBooks] No items found in API response:", apiResponse);
    return []; // safer: return empty list
  }
  return apiResponse.items.map(book => {
    if(!book.volumeInfo || !book.id || !book.volumeInfo.title){
      return null;
    }
    return {
      id: book.id,
      title: book.volumeInfo.title || null,
      subtitle: book.volumeInfo.subtitle || null,
      authors: Array.isArray(book.volumeInfo.authors) ? book.volumeInfo.authors.join(', ') : null,
      publisher: book.volumeInfo.publisher || null,
      publishedDate: book.volumeInfo.publishedDate || null,
      description: book.volumeInfo.description || null,
      pageCount: book.volumeInfo.pageCount || 0,
      categories: Array.isArray(book.volumeInfo.categories) ? book.volumeInfo.categories.join(', ') : null,
      averageRating: book.volumeInfo.averageRating || null,
      ratingsCount: book.volumeInfo.ratingsCount || 0,
      contentVersion: book.volumeInfo.contentVersion || null,
      language: book.volumeInfo.language || null,
      previewLink: book.volumeInfo.previewLink || null,
      infoLink: book.volumeInfo.infoLink || null,
      imageLinks: book.volumeInfo.imageLinks || {
        thumbnail: 'https://via.placeholder.com/128x194?text=No+Image+Available'
      }
    }
  }).filter(book => book !== null);
}

module.exports = {processBooks};