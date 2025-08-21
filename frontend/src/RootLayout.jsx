import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from "./components/Header/Header.jsx";
export default function RootLayout(){
  return(
    <>
      <Header />
      <ScrollRestoration />
      <div style={{ marginTop: '10vh' }}>
        <Outlet />
      </div>
    </>
  )
}