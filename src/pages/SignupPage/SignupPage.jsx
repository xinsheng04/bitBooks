import { addUser } from "../../util/usersManagement.js";
import { userActions } from "../../store/user.js";
import FormInput from "../../components/UI/FormInput";
import Modal from "../../components/UI/modal";
export default function SignUpPage({ className, dispatch, signUpToggler, setError, findUserExists}) {
  function handleSignUp(event){
    event.preventDefault();
    const fd = new FormData(event.target);
    const {username, password} = Object.fromEntries(fd.entries());
    if(!findUserExists(username)){
      addUser(username, password);
      dispatch(userActions.login(username));
      sessionStorage.setItem('user', JSON.stringify({username}));
      // console.log("user registered");
    } else{
      setError("User already exists");
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