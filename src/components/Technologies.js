function Technologies() {
  return(
    <section className="technologies">
      <h2 className="technologies__heading">
        Технологии
      </h2>
      <div className="technologies__container">
        <h3 className="technologies__title">
          7 технологий
        </h3>
        <p className="technologies__subtitle">
          На курсе веб-разработки мы освоили технологии,
          которые применили в дипломном проекте.
        </p>
        <ul className="technologies__list">
          <li className="technologies__list-item">
            HTML
          </li>
          <li className="technologies__list-item">
            CSS
          </li>
          <li className="technologies__list-item">
            JS
          </li>
          <li className="technologies__list-item">
            React
          </li>
          <li className="technologies__list-item">
            Git
          </li>
          <li className="technologies__list-item">
            Express.js
          </li>
          <li className="technologies__list-item">
            mongoDB
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Technologies;