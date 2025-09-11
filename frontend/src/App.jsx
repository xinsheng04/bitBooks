import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RootLayout from './RootLayout';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import BookDetailsPage from './pages/BookDetailsPage/BookDetailsPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import LoginPage from './pages/LoginPage/LoginPage';

import { fetchedBooksActions } from './store/fetchedBooks';
import { userActions } from './store/user';

import './App.css'

function App() {
  const dispatch = useDispatch();
  // const books = useSelector(state => state.fetchedBooks.books);
  const user = useSelector(state => state.user);
  // user && console.log(user);
  useEffect(()=>{
    if(!user.username && sessionStorage.getItem('user')){
      const userData = JSON.parse(sessionStorage.getItem('user'));
      dispatch(userActions.login(userData.username));
    }
    if(sessionStorage.getItem('fetchedBooks') && JSON.parse(sessionStorage.getItem('fetchedBooks')).length > 0){
      const books = JSON.parse(sessionStorage.getItem('fetchedBooks'));
      dispatch(fetchedBooksActions.loadBooks({books, firstLoad: true}));
    } 
  }, []);
  
  if(!user.username){
    return <LoginPage />;
  }
  const routes = createBrowserRouter([
    {
      path:'/',
      element: <RootLayout/>,
      errorElement: <ErrorPage/>,
      id: 'root',
      children:[
        {index: true, element: <HomePage/>},
        {path: 'error', element: <ErrorPage />},
        {path: 'search', element: <SearchPage/>},
        {path: 'profile', element: <ProfilePage/>},
        {path: 'books/:bookId', element: <BookDetailsPage/>}
      ]
    }
  ]);
  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
