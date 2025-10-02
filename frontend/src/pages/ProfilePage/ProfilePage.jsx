import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import { fetchedBooksActions } from "../../store/fetchedBooks";
import { Link } from "react-router-dom";
import RandomBookLink from "../../components/RandomBookLink";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  function handleLogout(){
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("search-item");
    dispatch(userActions.logout());
    dispatch(fetchedBooksActions.reset());
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.userInfo}>
        <h1>My Profile</h1>
        <div>
          <h1 className={styles.username}>👤 {user.username}</h1>
          <button onClick={()=>handleLogout()}>Logout</button>
        </div>
      </div>

      <div className={styles.savedBooks}>
        <h2>📚 Saved Books</h2>
        <div>
          {user.savedBooks.length > 0 ? (
            <div className={styles.bookList}>
                {user.savedBooks.map((book, index) => (
                  <Link key={index} to={`/books/${book.id}`} className={styles.bookItem}>
                    <div className={styles.bookRow}>
                      <div className={styles.bookInfo}>{book.title}</div>
                      <div className={styles.bookInfo}>{book.categories}</div>
                    </div>
                  </Link>
                ))}
            </div>
          ) : (
            <div className={styles.emptyBooks}>
              <p>No saved books. Go get some!</p>
              <RandomBookLink className={styles.randomBookBtn} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
