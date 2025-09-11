import { useRouteError, useLocation } from "react-router-dom";
import ErrorLogo from "../../../public/error-logo.webp";
import RootLayout from "../../RootLayout";
import styles from './ErrorPage.module.css';
import { Link } from "react-router-dom";
export default function ErrorPage() {
  let error = useRouteError();
  if(!error){
    error = useLocation();
  }
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
      <img className={styles.errorImg} src={ErrorLogo} alt="Amon has stolen this logo" />
      <h2>{errorStatus} | {errorTitle}</h2>
      <p>{errorMessage}</p>
      {errorData && <p>{errorData}</p>}
      <p>Go back to <Link to="/">Home</Link></p>
    </div>
  )
}