import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import logo from '../images/logo.svg';

function Header({ themeLight, onClickBurgerBtn, isBurgerMenuOpened, authorized}) {
  return (
    <header className={`header header_${themeLight ? 'light' : 'purple'}`}>
      <Link to='/' className='header__logo-link'>
        <img className='header__logo' src={logo} alt='логотип страницы' />
      </Link>
      <Navigation authorization={authorized} onClickBurgerBtn={onClickBurgerBtn} isBurgerMenuOpened={isBurgerMenuOpened}/>
    </header>
  );
}

export default Header;
