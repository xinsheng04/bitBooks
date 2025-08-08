import { Outlet } from 'react-router-dom';
import Header from "./components/Header/Header.jsx";
export default function RootLayout(){
  return(
    <>
      <Header />
      <div style={{ marginTop: '10vh' }}>
        <Outlet />
      </div>
    </>
  )
}