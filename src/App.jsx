import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useEffect } from 'react';
import useHttp from './util/useHttp';
import processBooks from './util/processBooks';
import {useDispatch } from 'react-redux';
import RootLayout from './RootLayout';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import GenrePage from './pages/GenrePage';
import BookDetailsPage from './pages/BookDetailsPage/BookDetailsPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import './App.css'

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=a&maxResults=40&key=${apiKey}`;
const config = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

function App() {
  const dispatch = useDispatch();
  const {data, error, loading} = useHttp(apiUrl, config, 'Book fetching failed');
  useEffect(()=>{
    if (data && !loading && !error) {
      dispatch(fetchedBooksActions.loadBooks(processBooks(data)));
    }
  }, [data, loading, error, dispatch]);
  if(loading){
    return <div style={{textAlign: 'center', marginTop: '50vh'}}>Loading...</div>;
  }
  if(error){
    return <ErrorPage error={{title: 'Failed to fetch books', message: error.message, status: 500}} />;
  }
  const routes = createBrowserRouter([
    {
      path:'/',
      element: <RootLayout/>,
      errorElement: <ErrorPage/>,
      id: 'root',
      children:[
        {index: true, element: <HomePage/>},
        {path: 'search', element: <SearchPage/>},
        {path: 'genre', element: <GenrePage/>},
        {path: 'books/:bookId', element: <BookDetailsPage/>}
      ]
    }
  ]);
  return (
    <RouterProvider router={routes}/>
  )
}

export default App
