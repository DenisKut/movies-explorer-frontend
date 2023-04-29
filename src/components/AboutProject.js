function AboutProject() {
  return(
    <section className="about-project">
      <h2 className="about-project__title">
        О проекте
      </h2>
      <ul className="about-project__description-list">
        <li className="about-project__description">
          <h3 className="about-project__description-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__description-subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>

        <li className="about-project__description">
          <h3 className="about-project__description-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__description-subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>

      <div className="about-project__progress-bar">
        <div className="about-project__backend-progress">
          <span className="about-project__backend-duration">
            1 неделя
          </span>
          <span className="about-project__progress-subtitle">
            Back-end
          </span>
        </div>

        <div className="about-project__frontend-progress">
          <span className="about-project__frontend-duration">
            4 недели
          </span>
          <span className="about-project__progress-subtitle">
            Front-end
          </span>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;