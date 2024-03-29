import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';

function Burger({onClickBurger, isBurgerMenuOpened}) {
  const isSmallDisplay = useMediaQuery({query: `(max-width: 1024px)`});

  const handleClickBurgerBtn = () => {
    onClickBurger(isBurgerMenuOpened);
  }

  useEffect(() => {
    if(!isSmallDisplay) {
      onClickBurger(true);
    }
  }, [isSmallDisplay, onClickBurger]);

  return(
    <button
      className={`burger-btn burger-btn_${isBurgerMenuOpened ? 'active' : 'unactive'}`}
      onClick={handleClickBurgerBtn}
      type='button'
    >
      <span/>
    </button>
  )
}

export default Burger;