import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './RootLayout';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import GenrePage from './pages/GenrePage';
import BookDetailsPage from './pages/BookDetailsPage/BookDetailsPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import BooksLoader from './BooksLoader';
import { useSelector } from 'react-redux';
import './App.css'

function App() {
  const firstLoadDone = useSelector(state => state.fetchedBooks.firstLoad);
  if (!firstLoadDone) {
    return <BooksLoader loadQty={30} />;
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
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
