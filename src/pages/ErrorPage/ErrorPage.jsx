import { useRouteError } from "react-router-dom";
import RootLayout from "../../RootLayout";
import './ErrorPage.module.css';
import { Link } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();
  /*
  title: string, message: string, status: number, data: any
  */ 
  console.log(error);
  let errorTitle = error.title || 'Error Found!';
  let errorMessage = error.message || 'An unexpected error has occurred.';
  let errorStatus = error.status || 500;
  let errorData = error.data || null;
  return (
    <div >
      <RootLayout/>
      <h1>Kyle Save Me!</h1>
      <h2>{errorStatus} | {errorTitle}</h2>
      <p>{errorMessage}</p>
      {errorData && <p>{errorData}</p>}
      <p>Go back to <Link to="/">Home</Link></p>
    </div>
  )
}