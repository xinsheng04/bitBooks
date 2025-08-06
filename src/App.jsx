import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './RootLayout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import GenrePage from './pages/GenrePage';
import { useEffect } from 'react';
import useHttp from './hooks/useHttp';
import './App.css'

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:"To Kill a Mockingbird"&key=${apiKey}`;
const config = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

function App() {
  useEffect(()=>{
    const {data, error, loading} = useHttp(apiUrl, config, 'Book fetching failed');
  }, []);
  const routes = createBrowserRouter([
    {
      path:'/',
      element: <RootLayout/>,
      children:[
        {index: true, element: <HomePage/>},
        {path: 'search', element: <SearchPage/>},
        {path: 'genre', element: <GenrePage/>}
      ]
    }
  ]);
  return (
    <RouterProvider router={routes}/>
  )
}

export default App
