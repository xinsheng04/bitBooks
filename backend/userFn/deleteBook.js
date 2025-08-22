const {removeSavedBook} = require("../users");

function deleteBook(req, res){
  const username = req.params.username;
  const bookId = req.query.bookId;
  try{
    removeSavedBook(username, bookId);
    return res.status(200).json({message: "Book successfully deleted."});
  } catch(e){
    return res.status(400).json({message: e});
  }
}

module.exports = {deleteBook};