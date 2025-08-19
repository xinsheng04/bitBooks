import Modal from '../../components/UI/modal';
import FormInput from '../../components/UI/FormInput.jsx';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { findUserExists, verifyPassword } from '../../util/usersManagement.js';
import { userActions } from '../../store/user.js';
import SignUpPage from '../SignUpPage/SignupPage.jsx';
import classes from './LoginPage.module.css';
export default function LoginPage() {
  const [error, setError] = useState(null);
  const [signup, loadSignup] = useState(false);
  const dispatch = useDispatch();
  function handleRegister() {
    setError(null);
    loadSignup(true);
  }
  function handleSubmit(event) {
    const fd = new FormData(event.target);
    const { username, password } = Object.fromEntries(fd.entries());
    if (findUserExists(username) && verifyPassword(username, password)) {
      dispatch(userActions.login(username));
      sessionStorage.setItem('user', JSON.stringify({username}));
    } else {
      setError("Invalid username or password");
    }
  }
  return (
  <>
    {!error && !signup &&
    <div>
      <Modal open className={classes['login-modal']} persistent>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <FormInput label="USERNAME" id="username" placeholder="Enter your username" required />
          <FormInput label="PASSWORD" id="password" placeholder="Enter your password" required />
          <button type="submit">Login</button>
        </form>
      <button onClick={()=>handleRegister()}>Sign up</button>
      </Modal>
    </div>
    }
    {
      !error && signup &&
      <SignUpPage className={classes['login-modal']} dispatch={dispatch} signUpToggler={loadSignup} setError={setError} findUserExists={findUserExists}/>
    }
    {
      error &&
      <Modal open className={classes['login-modal']} persistent>
        <h2>Login failed</h2>
        <p>{error}</p>
        <button onClick={()=>{setError(null)}}>return</button>
      </Modal>
    }
  </>
  )
}