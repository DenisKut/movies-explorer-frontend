import { Link, NavLink } from "react-router-dom";
import Burger from "./Burger";

function Navigation({onClickBurgerBtn, isBurgerMenuOpened, authorization}) {
  const linkActivity = `navigation__link_resolution_${isBurgerMenuOpened ? 'small' : 'high'}`

  const handleCloseBurgerMenu = (event) => {
    onClickBurgerBtn(isBurgerMenuOpened);
  }

  return (
    <>
      {!authorization ? (
        <nav className="navigation">
          <ul className="navigation__list">
            <li>
              <Link to="/signup" className="navigation__link">
                Регистрация
              </Link>
            </li>
            <li>
              <Link to="/signin" className="navigation__link navigation__link_signin">
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className={`navigation`}>
          <div className={`${isBurgerMenuOpened ? 'navigation_blur' : ''}`}/>
          <ul
            className={`navigation__list navigation__list_logged navigation__list_state_${isBurgerMenuOpened ? 'opened' : 'closed'}`}
          >
            {isBurgerMenuOpened && (
              <div className="navigation__cross" onClick={handleCloseBurgerMenu}/>
            )}
            {isBurgerMenuOpened && (
                <li className="navigation__item">
                  <NavLink exact to="/" className="navigation__logged-link" activeClassName={linkActivity}>
                    Главная
                  </NavLink>
                </li>
            )}
            <li className="navigation__item">
              <NavLink to="/movies" className="navigation__logged-link" activeClassName={linkActivity}>
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to="/saved-movies" className="navigation__logged-link" activeClassName={linkActivity}>
                Сохранённые фильмы
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to="/profile" className="navigation__logged-link navigation__logged-link_type_account" activeClassName={linkActivity}>
                Аккаунт
              </NavLink>
            </li>
          </ul>
          <Burger isBurgerMenuOpened={isBurgerMenuOpened} onClickBurger={onClickBurgerBtn} />
        </nav>
      )}
    </>
  )
}

export default Navigation;