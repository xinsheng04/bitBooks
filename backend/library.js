const library = [];
function addBookToLibrary(book){
  library.push(book);
}
function getBooks() {
  return { books: library };
}
module.exports = {library, addBookToLibrary, getBooks};