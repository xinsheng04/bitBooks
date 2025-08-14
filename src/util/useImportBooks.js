import useHttp from "./useHttp";
import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchedBooksActions } from '../store/fetchedBooks';
import processBooks from '../util/processBooks';
export default function useImportBooks({bookTitle=null, loadQty=30, runMe=true}){
  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_API_KEY;
  const firstLoadFlag = bookTitle ? false : true;
  let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=a&maxResults=${loadQty}&key=${apiKey}`;
  // In useImportBooks.js
  if(bookTitle){
    apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitle)}&maxResults=${loadQty}&key=${apiKey}`;
  }
  apiUrl = runMe ? apiUrl : null;
  const config = useMemo(() => ({
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }), []);
  const {data, error, loading} = useHttp(apiUrl, config, 'Book fetching failed');
  useEffect(()=>{
      if (runMe && data && !loading && !error) {
        const processedBooks = processBooks(data);
        dispatch(fetchedBooksActions.loadBooks({books: processedBooks, firstLoad: firstLoadFlag}));
      }
  }, [data, loading, error, runMe]);
  return {data, loading, error};
}