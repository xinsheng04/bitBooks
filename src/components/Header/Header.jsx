import webLogo from '../../public/bitBooks-logo.png';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="bitbooks-header">
      <div className='header-titles'>
        <Link className='logo-link' to="/">
          <img src={webLogo} alt="Books" />
          <h1 className='title'>BitBooks</h1>
        </Link>
        <h1 className='slogan'>Books to start your day</h1>
      </div>
      <ul className='nav-links'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/search'>Search</Link></li>
        <li><Link to='/genre'>Genres</Link></li>
      </ul>
    </header>
  );
}
