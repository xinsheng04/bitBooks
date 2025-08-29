import { userActions } from "../../store/user.js";
import { signUpUser } from "../../util/usersBackend.js";
import { fetchedBooksActions } from "../../store/fetchedBooks.js";
import FormInput from "../../components/UI/FormInput.jsx";
import Modal from "../../components/UI/modal.jsx";
export default function SignUpPage({ className, dispatch, signUpToggler, setError}) {
  async function handleSignUp(event){
    event.preventDefault();
    const fd = new FormData(event.target);
    const {username, password} = Object.fromEntries(fd.entries());
    const {success, message, books, user} = await signUpUser(username, password);
    if(success){
      dispatch(userActions.login(user));
      dispatch(fetchedBooksActions.loadBooks(books));
      sessionStorage.setItem('user', JSON.stringify(user));
      console.log(message);
    } else{
      setError(message);
    }
  }
  return (
    <Modal open className={className} persistent>
      <h2>Sign up</h2>
      <form onSubmit={handleSignUp}>
        <FormInput label="Username" id="username" placeholder="Enter your new username" required />
        <FormInput label="Password" id="password" placeholder="Enter your new password" required />
        <button type="submit">Sign up</button>
      </form>
      <button onClick={()=>signUpToggler(false)}>Return to login page</button>
    </Modal>
  );
}