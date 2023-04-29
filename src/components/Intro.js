import earthLogo from '../images/web_earth_logo.svg';

function Intro() {
  return(
    <section className='intro'>
      <div className='intro__about'>
        <h1 className='intro__title'>
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className='intro__subtitle'>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <a className='intro__link' href='https://practicum.yandex.ru/web/' target="_blank" rel="noreferrer">
          Узнать больше
        </a>
      </div>
      <img className='intro__logo' src={earthLogo} alt='Логотип WEB-шара' />
    </section>
  )
}

export default Intro;