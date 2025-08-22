const {addSavedBook} = require("../users");

function addBook(req, res){
  const username = req.params.username;
  const bookId = req.query.bookId;
  try{
    addSavedBook(username, bookId);
    return res.status(200).json({message: "Book successfully added"});
  } catch(e){
    return res.status(400).json({message: e});
  }
}

module.exports = {addBook}