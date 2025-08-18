import webLogo from '../../../public/bitBooks-logo.png';
import { Link, NavLink } from 'react-router-dom';
import classes from './Header.module.css';

export default function Header() {
  return (
    <header className={classes['bitbooks-header']}>
      <div className={classes['header-titles']}>
        <Link className={classes['logo-link']} to="/">
          <img src={webLogo} alt="Books" />
          <h1 className={classes['title']}>BitBooks</h1>
        </Link>
        <h1 className={classes['slogan']}>Books to start your day</h1>
      </div>
      <ul className={classes['nav-links']}>
        <li><NavLink to='/' className={({ isActive }) => (isActive ? classes['active'] : '')}>Home</NavLink></li>
        <li><NavLink to='/search' className={({ isActive }) => (isActive ? classes['active'] : '')}>Search</NavLink></li>
      </ul>
    </header>
  );
}
